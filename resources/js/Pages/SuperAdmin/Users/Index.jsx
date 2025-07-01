import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    FiUser,
    FiUsers,
    FiEdit,
    FiTrash2,
    FiPlus,
    FiEye,
    FiShield,
    FiList,
    FiMail,
    FiCalendar,
    FiX,
    FiKey,
    FiSearch,
} from "react-icons/fi";
import React, { useState, useEffect, useCallback } from "react";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";

export default function SuperAdminUsersIndex({ auth }) {
    const { users, roles, categories, filters } = usePage().props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    const [isSearching, setIsSearching] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role_id: "",
        password: "",
        password_confirmation: "",
        category_ids: [],
    });
    const [errors, setErrors] = useState({});

    // Tambahkan di bagian atas file
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    }

    const debouncedSearch = useCallback(
        debounce((query) => {
            router.get(
                "/super-admin/users",
                { search: query },
                {
                    preserveState: true,
                    replace: true,
                    onFinish: () => setIsSearching(false),
                }
            );
        }, 500), // 500ms delay
        []
    );

    // Handle perubahan input search
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setIsSearching(true);
        debouncedSearch(query);
    };

    // Reset search
    const resetSearch = () => {
        setSearchQuery("");
        setIsSearching(true);
        router.get(
            "/super-admin/users",
            {},
            {
                preserveState: true,
                replace: true,
                onFinish: () => setIsSearching(false),
            }
        );
    };

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!showUserModal) {
            setFormData({
                name: "",
                email: "",
                role_id: "",
                password: "",
                password_confirmation: "",
                category_ids: [],
            });
            setErrors({});
            setIsEditing(false);
            setCurrentUser(null);
        }
    }, [showUserModal]);

    // Initialize form for editing
    useEffect(() => {
        if (isEditing && currentUser) {
            setFormData({
                name: currentUser.name,
                email: currentUser.email,
                role_id: currentUser.role_id,
                password: "",
                password_confirmation: "",
                category_ids:
                    currentUser.managedCategories?.map((c) => c.id) || [],
            });
        }
    }, [isEditing, currentUser]);

    const handleDelete = (id) => {
        setUserToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        router.delete(`/super-admin/users/${userToDelete}`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteModal(false);
                // Optional: Show success notification
            },
        });
    };

    const toggleExpand = (id) => {
        setExpandedUserId(expandedUserId === id ? null : id);
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    const openAddModal = () => {
        setShowUserModal(true);
        setIsEditing(false);
    };

    const openEditModal = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
        setShowUserModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            let newCategoryIds = [...prev.category_ids];
            if (checked) {
                newCategoryIds.push(parseInt(value));
            } else {
                newCategoryIds = newCategoryIds.filter(
                    (id) => id !== parseInt(value)
                );
            }
            return {
                ...prev,
                category_ids: newCategoryIds,
            };
        });
    };

    const submitForm = () => {
        const url = isEditing
            ? `/super-admin/users/${currentUser.id}`
            : "/super-admin/users";

        const method = isEditing ? "put" : "post";

        router[method](url, formData, {
            preserveScroll: true,
            onSuccess: () => {
                setShowUserModal(false);
                // Optional: Show success notification
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    console.log(users);

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Pengguna" />

            <div className="">
                <div>
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Kelola Pengguna
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Manajemen semua pengguna sistem
                            </p>
                        </div>
                        <Button
                            onClick={openAddModal}
                            variant="primary"
                            icon={FiPlus}
                        >
                            Tambah Pengguna
                        </Button>
                    </div>
                    <div className="relative w-full sm:w-64 mb-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari nama/email..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                        {isSearching && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <svg
                                    className="animate-spin h-4 w-4 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            </div>
                        )}
                        {!isSearching && searchQuery && (
                            <button
                                type="button"
                                onClick={resetSearch}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                <FiX className="text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>

                    {/* Users Table */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {users.data.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                                    <FiUser className="w-full h-full" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Belum ada pengguna
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Tidak ada pengguna yang terdaftar sebagai
                                    peserta.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Pengguna
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Role & Kategori
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Informasi
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.data &&
                                            users?.data.map((user) => (
                                                <React.Fragment key={user.id}>
                                                    <tr className="hover:bg-gray-50 transition-colors">
                                                        {/* User Info */}
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                                    <FiUser
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="font-medium text-gray-900">
                                                                        {
                                                                            user.name
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm text-gray-500 flex items-center">
                                                                        <FiMail
                                                                            className="mr-1"
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Role & Managed Categories */}
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center">
                                                                <FiShield className="mr-2 text-purple-500" />
                                                                <span className="font-medium">
                                                                    {
                                                                        user
                                                                            .role
                                                                            .name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>

                                                        {/* Additional Info */}
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm text-gray-500 flex items-center">
                                                                <FiCalendar className="mr-2 text-gray-400" />
                                                                Bergabung:{" "}
                                                                {formatDate(
                                                                    user.created_at
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* Actions */}
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end space-x-2">
                                                                <button
                                                                    onClick={() =>
                                                                        toggleExpand(
                                                                            user.id
                                                                        )
                                                                    }
                                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                                                    title="Lihat Pendaftaran"
                                                                >
                                                                    <FiList
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        openEditModal(
                                                                            user
                                                                        )
                                                                    }
                                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                                                    title="Edit"
                                                                >
                                                                    <FiEdit
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            user.id
                                                                        )
                                                                    }
                                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                                    title="Hapus"
                                                                >
                                                                    <FiTrash2
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    {/* Expanded Row - User Registrations */}
                                                    {expandedUserId ===
                                                        user.id && (
                                                        <tr>
                                                            <td
                                                                colSpan="4"
                                                                className="px-6 py-4 bg-gray-50"
                                                            >
                                                                <div className="pl-14">
                                                                    <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                                        <FiList className="mr-2 text-green-500" />
                                                                        Pendaftaran
                                                                        Pengguna
                                                                    </h4>

                                                                    {user.registrations &&
                                                                    user
                                                                        .registrations
                                                                        .length >
                                                                        0 ? (
                                                                        <div className="space-y-3">
                                                                            {user.registrations.map(
                                                                                (
                                                                                    reg
                                                                                ) => (
                                                                                    <div
                                                                                        key={
                                                                                            reg.id
                                                                                        }
                                                                                        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                                                                                    >
                                                                                        <div className="flex justify-between items-start">
                                                                                            <div>
                                                                                                <h5 className="font-medium text-gray-900">
                                                                                                    {
                                                                                                        reg
                                                                                                            .competition
                                                                                                            .name
                                                                                                    }
                                                                                                </h5>
                                                                                                <p className="text-sm text-gray-500">
                                                                                                    {
                                                                                                        reg
                                                                                                            .category
                                                                                                            .name
                                                                                                    }
                                                                                                </p>
                                                                                            </div>
                                                                                            <Link
                                                                                                href={`/admin/registrations/${reg.id}`}
                                                                                                className="text-green-600 hover:text-green-800 flex items-center text-sm"
                                                                                            >
                                                                                                <FiEye className="mr-1" />
                                                                                                Lihat
                                                                                                Detail
                                                                                            </Link>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <p className="text-gray-500 text-sm">
                                                                            Pengguna
                                                                            belum
                                                                            memiliki
                                                                            pendaftaran
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </tbody>
                                </table>
                                {/* Setelah table */}
                                {users.data.length > 0 && (
                                    <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Menampilkan{" "}
                                            <span className="font-medium">
                                                {users.from}
                                            </span>{" "}
                                            ke{" "}
                                            <span className="font-medium">
                                                {users.to}
                                            </span>{" "}
                                            dari{" "}
                                            <span className="font-medium">
                                                {users.total}
                                            </span>{" "}
                                            hasil
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() =>
                                                    router.get(
                                                        users.prev_page_url
                                                    )
                                                }
                                                disabled={!users.prev_page_url}
                                                className={`px-3 py-1 rounded-md ${
                                                    users.prev_page_url
                                                        ? "bg-gray-100 hover:bg-gray-200"
                                                        : "bg-gray-50 cursor-not-allowed"
                                                }`}
                                            >
                                                Sebelumnya
                                            </button>
                                            <button
                                                onClick={() =>
                                                    router.get(
                                                        users.next_page_url
                                                    )
                                                }
                                                disabled={!users.next_page_url}
                                                className={`px-3 py-1 rounded-md ${
                                                    users.next_page_url
                                                        ? "bg-gray-100 hover:bg-gray-200"
                                                        : "bg-gray-50 cursor-not-allowed"
                                                }`}
                                            >
                                                Selanjutnya
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Konfirmasi Penghapusan"
                maxWidth="lg"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Apakah Anda yakin ingin menghapus pengguna ini? Semua
                        data terkait akan dihapus secara permanen. Tindakan ini
                        tidak dapat dibatalkan.
                    </p>

                    <div className="flex justify-end space-x-3 pt-2">
                        <Button
                            onClick={() => setShowDeleteModal(false)}
                            variant="secondary"
                            size="medium"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            variant="danger"
                            size="medium"
                            icon={FiTrash2}
                        >
                            Ya, Hapus Pengguna
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Add/Edit User Modal */}
            <Modal
                show={showUserModal}
                onClose={() => setShowUserModal(false)}
                title={isEditing ? "Edit Pengguna" : "Tambah Pengguna Baru"}
                maxWidth="2xl"
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full rounded-md border ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full rounded-md border ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Role */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                name="role_id"
                                value={formData.role_id}
                                onChange={handleInputChange}
                                className={`w-full rounded-md border ${
                                    errors.role_id
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                            >
                                <option value="">Pilih Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            {errors.role_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.role_id}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        {!isEditing && (
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-md border ${
                                        errors.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Password Confirmation */}
                        {!isEditing && (
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Konfirmasi Password
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-md border ${
                                        errors.password_confirmation
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* For editing - Password Update (optional) */}
                        {isEditing && (
                            <>
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password Baru (opsional)
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full rounded-md border ${
                                            errors.password
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Konfirmasi Password Baru
                                    </label>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                        className={`w-full rounded-md border ${
                                            errors.password_confirmation
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Managed Categories (only for admin role) */}
                    {formData.role_id == 2 && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategori yang Dikelola (hanya untuk Admin)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`category-${category.id}`}
                                            value={category.id}
                                            checked={formData.category_ids.includes(
                                                category.id
                                            )}
                                            onChange={handleCheckboxChange}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor={`category-${category.id}`}
                                            className="ml-2 text-sm text-gray-700"
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.category_ids && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.category_ids}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
                        <Button
                            onClick={() => setShowUserModal(false)}
                            variant="secondary"
                            size="medium"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={submitForm}
                            variant="primary"
                            size="medium"
                            icon={isEditing ? FiEdit : FiPlus}
                        >
                            {isEditing ? "Update Pengguna" : "Tambah Pengguna"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

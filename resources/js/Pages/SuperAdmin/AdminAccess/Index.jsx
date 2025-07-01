import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import {
    FiUser,
    FiUsers,
    FiEdit,
    FiTrash2,
    FiPlus,
    FiCheck,
    FiX,
    FiKey,
    FiShield,
    FiMail,
    FiChevronRight,
    FiSearch,
} from "react-icons/fi";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";

export default function AdminAccessManagement({ admins, categories, auth }) {
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAdmin, setNewAdmin] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        category_ids: [],
    });
    const [searchQuery, setSearchQuery] = useState("");

    // Filter admins based on search query
    const filteredAdmins = admins.filter(
        (admin) =>
            admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCategoryToggle = (categoryId, isForNewAdmin = false) => {
        if (isForNewAdmin) {
            setNewAdmin((prev) => ({
                ...prev,
                category_ids: prev.category_ids.includes(categoryId)
                    ? prev.category_ids.filter((id) => id !== categoryId)
                    : [...prev.category_ids, categoryId],
            }));
        } else {
            setSelectedCategories((prev) =>
                prev.includes(categoryId)
                    ? prev.filter((id) => id !== categoryId)
                    : [...prev, categoryId]
            );
        }
    };

    const handleCreateAdmin = (e) => {
        e.preventDefault();
        router.post("/super-admin/admin-access/create", newAdmin, {
            preserveScroll: true,
            onSuccess: () => {
                setShowCreateModal(false);
                setNewAdmin({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    category_ids: [],
                });
                router.reload({ only: ["admins"] });
            },
        });
    };

    const handleAdminSelect = (admin) => {
        setSelectedAdmin(admin);
        setSelectedCategories(admin.managed_categories.map((c) => c.id));
    };

    const submitAccess = () => {
        if (!selectedAdmin) return;

        router.post(
            "/super-admin/admin-access",
            {
                admin_id: selectedAdmin.id,
                category_ids: selectedCategories,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ["admins"] });
                },
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Hak Akses Admin" />

            <div className="">
                <div className="">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                                <FiShield className="mr-2 text-green-500" />
                                Manajemen Hak Akses Admin
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Atur kategori apa saja yang bisa diakses oleh
                                masing-masing admin
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari admin..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                variant="primary"
                                size="medium"
                                icon={FiPlus}
                            >
                                Tambah Admin
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
                            {/* Admin List */}
                            <div className="lg:col-span-1 border-r border-gray-200">
                                <div className="p-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                        <FiUsers className="mr-2 text-green-500" />
                                        Daftar Admin
                                    </h2>
                                    {filteredAdmins.length === 0 ? (
                                        <div className="text-center py-8">
                                            <FiUser className="mx-auto h-12 w-12 text-gray-400" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                {searchQuery
                                                    ? "Admin tidak ditemukan"
                                                    : "Belum ada admin"}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {searchQuery
                                                    ? "Coba dengan kata kunci lain"
                                                    : "Buat admin baru untuk memulai"}
                                            </p>
                                        </div>
                                    ) : (
                                        <ul className="space-y-2">
                                            {filteredAdmins.map((admin) => (
                                                <li key={admin.id}>
                                                    <button
                                                        onClick={() =>
                                                            handleAdminSelect(
                                                                admin
                                                            )
                                                        }
                                                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex justify-between items-center ${
                                                            selectedAdmin?.id ===
                                                            admin.id
                                                                ? "bg-green-50 border border-green-200"
                                                                : "hover:bg-gray-50 border border-transparent"
                                                        }`}
                                                    >
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">
                                                                {admin.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-500 flex items-center mt-1">
                                                                <FiMail
                                                                    className="mr-1"
                                                                    size={14}
                                                                />
                                                                {admin.email}
                                                            </p>
                                                            <div className="flex items-center mt-3">
                                                                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                                                    {
                                                                        admin
                                                                            .managed_categories
                                                                            .length
                                                                    }{" "}
                                                                    Kategori
                                                                </span>
                                                                <FiChevronRight className="ml-2 text-gray-400" />
                                                            </div>
                                                        </div>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* Access Management */}
                            <div className="lg:col-span-2">
                                <div className="p-6">
                                    {selectedAdmin ? (
                                        <>
                                            <div className="flex justify-between items-center mb-6">
                                                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                                                    <FiUser className="mr-2 text-green-500" />
                                                    Hak Akses untuk{" "}
                                                    {selectedAdmin.name}
                                                </h2>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {selectedCategories.length}{" "}
                                                    kategori dipilih
                                                </span>
                                            </div>

                                            <div className="space-y-4">
                                                {categories.length === 0 ? (
                                                    <div className="text-center py-8">
                                                        <FiX className="mx-auto h-12 w-12 text-gray-400" />
                                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                            Belum ada kategori
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            Buat kategori
                                                            terlebih dahulu
                                                            untuk mengatur hak
                                                            akses
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {categories.map(
                                                            (category) => (
                                                                <div
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                                                                        selectedCategories.includes(
                                                                            category.id
                                                                        )
                                                                            ? "border-green-300 bg-green-50"
                                                                            : "border-gray-200 hover:bg-gray-50"
                                                                    }`}
                                                                    onClick={() =>
                                                                        handleCategoryToggle(
                                                                            category.id
                                                                        )
                                                                    }
                                                                >
                                                                    <div className="flex items-center">
                                                                        <div
                                                                            className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                                                                                selectedCategories.includes(
                                                                                    category.id
                                                                                )
                                                                                    ? "bg-green-600 text-white"
                                                                                    : "bg-gray-200 text-transparent"
                                                                            }`}
                                                                        >
                                                                            <FiCheck
                                                                                size={
                                                                                    12
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <span className="ml-3 block text-sm text-center font-medium text-gray-900">
                                                                            {
                                                                                category.name
                                                                            }

                                                                            {
                                                                                " -  "
                                                                            }
                                                                            {
                                                                                category
                                                                                    .competition
                                                                                    .name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-8 flex justify-end">
                                                <Button
                                                    onClick={submitAccess}
                                                    disabled={
                                                        !selectedCategories.length
                                                    }
                                                    variant="primary"
                                                    size="large"
                                                    icon={FiCheck}
                                                    className="min-w-[180px]"
                                                >
                                                    Simpan Perubahan
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-12">
                                            <FiUser className="mx-auto h-12 w-12 text-gray-400" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                Pilih admin terlebih dahulu
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Klik pada nama admin di daftar
                                                sebelah kiri untuk mengatur hak
                                                akses
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Admin Modal */}
            <Modal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Tambah Admin Baru"
                maxWidth="2xl"
            >
                <form onSubmit={handleCreateAdmin} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap*
                                </label>
                                <input
                                    type="text"
                                    value={newAdmin.name}
                                    onChange={(e) =>
                                        setNewAdmin({
                                            ...newAdmin,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email*
                                </label>
                                <input
                                    type="email"
                                    value={newAdmin.email}
                                    onChange={(e) =>
                                        setNewAdmin({
                                            ...newAdmin,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password*
                                </label>
                                <input
                                    type="password"
                                    value={newAdmin.password}
                                    onChange={(e) =>
                                        setNewAdmin({
                                            ...newAdmin,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Konfirmasi Password*
                                </label>
                                <input
                                    type="password"
                                    value={newAdmin.password_confirmation}
                                    onChange={(e) =>
                                        setNewAdmin({
                                            ...newAdmin,
                                            password_confirmation:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-md font-medium text-gray-900">
                                <FiShield className="inline mr-2 text-green-500" />
                                Hak Akses Kategori
                            </h3>
                            <p className="text-sm text-gray-500">
                                Pilih kategori yang bisa diakses oleh admin ini
                            </p>

                            <div className="space-y-2 max-h-60 overflow-y-auto p-3 border border-gray-200 rounded-lg">
                                {categories.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center py-4">
                                        Belum ada kategori tersedia
                                    </p>
                                ) : (
                                    categories.map((category) => (
                                        <div
                                            key={category.id}
                                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                                                newAdmin.category_ids.includes(
                                                    category.id
                                                )
                                                    ? "bg-green-50 border border-green-200"
                                                    : "hover:bg-gray-50 border border-transparent"
                                            }`}
                                            onClick={() =>
                                                handleCategoryToggle(
                                                    category.id,
                                                    true
                                                )
                                            }
                                        >
                                            <div className="flex items-center">
                                                <div
                                                    className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                                                        newAdmin.category_ids.includes(
                                                            category.id
                                                        )
                                                            ? "bg-green-600 text-white"
                                                            : "bg-gray-200 text-transparent"
                                                    }`}
                                                >
                                                    <FiCheck size={12} />
                                                </div>
                                                <span className="ml-3 block text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
                        <Button
                            onClick={() => setShowCreateModal(false)}
                            variant="secondary"
                            size="medium"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="medium"
                            icon={FiUser}
                        >
                            Buat Admin
                        </Button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}

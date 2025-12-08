// resources/js/Pages/SuperAdmin/Announcements/GlobalIndex.jsx
import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import {
    FiFileText,
    FiFolder,
    FiEdit,
    FiTrash2,
    FiPlus,
    FiCheck,
    FiX,
    FiUpload,
    FiDownload,
    FiSearch,
    FiChevronRight,
    FiFile,
    FiAward,
    FiGrid,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";

export default function GlobalAnnouncements({
    competitions,
    categories,
    editing = null,
    auth,
}) {
    // State management
    const [tab, setTab] = useState(editing ? "form" : "list");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCompetitions, setExpandedCompetitions] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});

    // Form management
    const form = useForm({
        id: editing ? editing.id : null,
        category_id: editing ? editing.category_id : "",
        top_type: editing ? editing.top_type : "100",
        file_path: editing ? editing.file_path : "",
        file: null,
    });

    // Get selected category details
    const getSelectedCategory = () => {
        if (!form.data.category_id) return null;
        return categories.find(
            (cat) => cat.id === parseInt(form.data.category_id)
        );
    };

    // Get selected competition for the category
    const getSelectedCompetition = () => {
        const category = getSelectedCategory();
        return category ? category.competition : null;
    };

    // Prefill form when editing prop changes
    useEffect(() => {
        if (editing) {
            setTab("form");
            form.setData({
                id: editing.id,
                category_id: editing.category_id,
                top_type: editing.top_type,
                file_path: editing.file_path ?? "",
                file: null,
            });
        }
    }, [editing]);

    // Handle form submission
    function submit(e) {
        e.preventDefault();
        if (form.data.id) {
            router.put(
                route("global.announcements.update", form.data.id),
                form.data,
                {
                    _method: "PUT",
                    onSuccess: () => {
                        alert("Pengumuman berhasil diperbarui!");
                        // Redirect ke halaman index untuk refresh data
                        router.visit(route("global.announcements.index"), {
                            preserveScroll: true,
                            preserveState: false, // Force refresh
                        });
                    },
                }
            );
        } else {
            router.post(route("global.announcements.store"), form.data, {
                onSuccess: () => {
                    // Redirect ke halaman index untuk refresh data
                    router.visit(route("global.announcements.index"), {
                        preserveScroll: true,
                        preserveState: false, // Force refresh
                    });
                },
            });
        }
    }

    // Handle file input
    function onFileChange(e) {
        form.setData("file", e.target.files[0]);
    }

    // Handle delete confirmation
    function handleDelete(id) {
        setAnnouncementToDelete(id);
        setShowDeleteModal(true);
    }

    // Confirm delete
    function confirmDelete() {
        if (!announcementToDelete) return;

        router.delete(
            route("global.announcements.destroy", announcementToDelete),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setAnnouncementToDelete(null);
                },
            }
        );
    }

    // Toggle competition expansion
    function toggleCompetition(competitionId) {
        setExpandedCompetitions((prev) => ({
            ...prev,
            [competitionId]: !prev[competitionId],
        }));
    }

    // Toggle category expansion
    function toggleCategory(categoryId) {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    }

    // Filter competitions based on search query
    const filteredCompetitions = competitions.filter((competition) => {
        const searchLower = searchQuery.toLowerCase();

        // Cek nama kompetisi
        if (competition.name.toLowerCase().includes(searchLower)) return true;

        // Cek kategori
        const matchingCategories = competition.categories.filter(
            (category) =>
                category.name.toLowerCase().includes(searchLower) ||
                category.announcements.some(
                    (ann) =>
                        ann.file_path?.toLowerCase().includes(searchLower) ||
                        `Top ${ann.top_type}`
                            .toLowerCase()
                            .includes(searchLower)
                )
        );

        return matchingCategories.length > 0;
    });

    return (
        <AuthenticatedLayout>
            <Head title="Pengumuman Global" />

            <div className="">
                <div className="">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                                <FiGrid className="mr-2 text-green-500" />
                                Pengumuman Semua Kompetisi
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Kelola pengumuman hasil untuk semua kompetisi
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari kompetisi, kategori, atau pengumuman..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                            <Button
                                onClick={() => {
                                    form.setData({
                                        id: null,
                                        category_id: "",
                                        top_type: "100",
                                        file_path: "",
                                        file: null,
                                    });
                                    setTab("form");
                                }}
                                variant="primary"
                                size="medium"
                                icon={FiPlus}
                            >
                                Tambah Pengumuman
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {tab === "list" ? (
                            <div className="p-6">
                                {competitions.length === 0 ? (
                                    <div className="text-center py-8">
                                        <FiAward className="mx-auto h-12 w-12 text-gray-400" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                            Belum ada kompetisi
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Buat kompetisi terlebih dahulu untuk
                                            menambahkan pengumuman
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {filteredCompetitions.map(
                                            (competition) => (
                                                <div
                                                    key={competition.id}
                                                    className="border border-gray-200 rounded-lg overflow-hidden"
                                                >
                                                    {/* Competition Header */}
                                                    <div
                                                        className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                                                        onClick={() =>
                                                            toggleCompetition(
                                                                competition.id
                                                            )
                                                        }
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center">
                                                                <FiAward className="mr-3 text-green-500" />
                                                                <div>
                                                                    <h2 className="font-semibold text-gray-900">
                                                                        {
                                                                            competition.name
                                                                        }
                                                                    </h2>
                                                                    <div className="flex items-center gap-3 mt-1">
                                                                        <span className="text-sm text-gray-500">
                                                                            {
                                                                                competition
                                                                                    .categories
                                                                                    .length
                                                                            }{" "}
                                                                            kategori
                                                                        </span>
                                                                        <span className="text-sm text-gray-500">
                                                                            •
                                                                        </span>
                                                                        <span className="text-sm text-gray-500">
                                                                            {
                                                                                competition.total_announcements
                                                                            }{" "}
                                                                            pengumuman
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center">
                                                                {expandedCompetitions[
                                                                    competition
                                                                        .id
                                                                ] ? (
                                                                    <FiChevronUp className="text-gray-400" />
                                                                ) : (
                                                                    <FiChevronDown className="text-gray-400" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Categories List (Expanded) */}
                                                    {expandedCompetitions[
                                                        competition.id
                                                    ] &&
                                                        competition.categories
                                                            .length > 0 && (
                                                            <div className="border-t border-gray-200">
                                                                {competition.categories.map(
                                                                    (
                                                                        category
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                category.id
                                                                            }
                                                                            className="border-b border-gray-100 last:border-b-0"
                                                                        >
                                                                            {/* Category Header */}
                                                                            <div
                                                                                className="p-4 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                                                                                onClick={() =>
                                                                                    toggleCategory(
                                                                                        category.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <div className="flex justify-between items-center">
                                                                                    <div className="flex items-center">
                                                                                        <FiFolder className="mr-3 text-green-500" />
                                                                                        <div>
                                                                                            <h3 className="font-medium text-gray-900">
                                                                                                {
                                                                                                    category.name
                                                                                                }
                                                                                            </h3>
                                                                                            <p className="text-sm text-gray-500 mt-1">
                                                                                                {
                                                                                                    category
                                                                                                        .announcements
                                                                                                        .length
                                                                                                }{" "}
                                                                                                pengumuman
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-center">
                                                                                        {expandedCategories[
                                                                                            category
                                                                                                .id
                                                                                        ] ? (
                                                                                            <FiChevronUp className="text-gray-400" />
                                                                                        ) : (
                                                                                            <FiChevronDown className="text-gray-400" />
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            {/* Announcements List (Expanded) */}
                                                                            {expandedCategories[
                                                                                category
                                                                                    .id
                                                                            ] &&
                                                                                category
                                                                                    .announcements
                                                                                    .length >
                                                                                    0 && (
                                                                                    <div className="p-4 bg-gray-50">
                                                                                        <div className="space-y-3">
                                                                                            {category.announcements.map(
                                                                                                (
                                                                                                    a
                                                                                                ) => (
                                                                                                    <div
                                                                                                        key={
                                                                                                            a.id
                                                                                                        }
                                                                                                        className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                                                                                    >
                                                                                                        <div className="flex items-center">
                                                                                                            <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                                                                                <FiFileText className="text-green-600" />
                                                                                                            </div>
                                                                                                            <div className="ml-3">
                                                                                                                <h3 className="font-medium text-gray-900">
                                                                                                                    Top{" "}
                                                                                                                    {
                                                                                                                        a.top_type
                                                                                                                    }{" "}
                                                                                                                    Besar
                                                                                                                </h3>
                                                                                                                <p className="text-xs text-gray-500 truncate max-w-md">
                                                                                                                    {
                                                                                                                        a.file_path
                                                                                                                    }
                                                                                                                </p>
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <div className="flex items-center gap-2">
                                                                                                            <a
                                                                                                                href={
                                                                                                                    a.public_url
                                                                                                                }
                                                                                                                target="_blank"
                                                                                                                rel="noopener noreferrer"
                                                                                                                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                                                                            >
                                                                                                                <FiDownload
                                                                                                                    className="mr-1"
                                                                                                                    size={
                                                                                                                        14
                                                                                                                    }
                                                                                                                />
                                                                                                                Buka{" "}
                                                                                                            </a>

                                                                                                            <Link
                                                                                                                href={route(
                                                                                                                    "global.announcements.edit",
                                                                                                                    a.id
                                                                                                                )}
                                                                                                                className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                                                                            >
                                                                                                                <FiEdit
                                                                                                                    className="mr-1"
                                                                                                                    size={
                                                                                                                        14
                                                                                                                    }
                                                                                                                />
                                                                                                                Edit
                                                                                                            </Link>

                                                                                                            <button
                                                                                                                onClick={() =>
                                                                                                                    handleDelete(
                                                                                                                        a.id
                                                                                                                    )
                                                                                                                }
                                                                                                                className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                                                                                                            >
                                                                                                                <FiTrash2
                                                                                                                    className="mr-1"
                                                                                                                    size={
                                                                                                                        14
                                                                                                                    }
                                                                                                                />
                                                                                                                Hapus
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                )}

                                                                            {/* Empty State for Category */}
                                                                            {expandedCategories[
                                                                                category
                                                                                    .id
                                                                            ] &&
                                                                                category
                                                                                    .announcements
                                                                                    .length ===
                                                                                    0 && (
                                                                                    <div className="p-4 bg-gray-50 text-center">
                                                                                        <FiFile className="mx-auto h-8 w-8 text-gray-400" />
                                                                                        <p className="mt-2 text-sm text-gray-500">
                                                                                            Belum
                                                                                            ada
                                                                                            pengumuman
                                                                                            untuk
                                                                                            kategori
                                                                                            ini
                                                                                        </p>
                                                                                    </div>
                                                                                )}
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        )}

                                                    {/* Empty State for Competition */}
                                                    {expandedCompetitions[
                                                        competition.id
                                                    ] &&
                                                        competition.categories
                                                            .length === 0 && (
                                                            <div className="p-6 bg-gray-50 text-center">
                                                                <FiFolder className="mx-auto h-8 w-8 text-gray-400" />
                                                                <p className="mt-2 text-sm text-gray-500">
                                                                    Belum ada
                                                                    kategori
                                                                    untuk
                                                                    kompetisi
                                                                    ini
                                                                </p>
                                                            </div>
                                                        )}
                                                </div>
                                            )
                                        )}

                                        {/* Search Empty State */}
                                        {filteredCompetitions.length === 0 &&
                                            searchQuery && (
                                                <div className="text-center py-8">
                                                    <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
                                                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                                                        Tidak ditemukan
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Coba dengan kata kunci
                                                        lain
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Form Section */
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-medium text-gray-900 flex items-center">
                                        <FiFileText className="mr-2 text-green-500" />
                                        {form.data.id
                                            ? "Edit Pengumuman"
                                            : "Tambah Pengumuman Baru"}
                                    </h2>
                                    {form.data.id && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Mode Edit
                                        </span>
                                    )}
                                </div>

                                <form onSubmit={submit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Kompetisi & Kategori*
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        value={
                                                            form.data
                                                                .category_id
                                                        }
                                                        onChange={(e) =>
                                                            form.setData(
                                                                "category_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                        required
                                                    >
                                                        <option value="">
                                                            -- Pilih Kategori --
                                                        </option>
                                                        {categories.map(
                                                            (category) => (
                                                                <option
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    value={
                                                                        category.id
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }{" "}
                                                                    -{" "}
                                                                    {category
                                                                        .competition
                                                                        ?.name ||
                                                                        "Tidak ada kompetisi"}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Top Type*
                                                </label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {["100", "50", "10"].map(
                                                        (type) => (
                                                            <button
                                                                key={type}
                                                                type="button"
                                                                onClick={() =>
                                                                    form.setData(
                                                                        "top_type",
                                                                        type
                                                                    )
                                                                }
                                                                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                                                                    form.data
                                                                        .top_type ===
                                                                    type
                                                                        ? "bg-green-600 text-white"
                                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                                }`}
                                                            >
                                                                Top {type}
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    File Path / URL
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.file_path}
                                                    onChange={(e) =>
                                                        form.setData(
                                                            "file_path",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                    placeholder="contoh: announcements/top100_businessplan.xlsx"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Kosongkan jika ingin
                                                    mengupload file
                                                </p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    <FiUpload className="inline mr-1" />
                                                    Upload File
                                                </label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <FiFile className="mx-auto h-12 w-12 text-gray-400" />
                                                        <div className="flex text-sm text-gray-600">
                                                            <label className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500">
                                                                <span>
                                                                    Upload file
                                                                </span>
                                                                <input
                                                                    type="file"
                                                                    onChange={
                                                                        onFileChange
                                                                    }
                                                                    className="sr-only"
                                                                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                                                                />
                                                            </label>
                                                            <p className="pl-1">
                                                                atau drag and
                                                                drop
                                                            </p>
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            XLS, XLSX up to 10MB
                                                        </p>
                                                        {form.data.file && (
                                                            <p className="text-sm text-green-600">
                                                                File dipilih:{" "}
                                                                {
                                                                    form.data
                                                                        .file
                                                                        .name
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preview Section */}
                                    {getSelectedCategory() && (
                                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                            <h3 className="text-sm font-medium text-green-900 mb-2">
                                                Preview Pengumuman
                                            </h3>
                                            <div className="flex flex-col space-y-2">
                                                <div className="flex items-center">
                                                    <FiAward className="text-green-500 mr-2" />
                                                    <p className="text-sm text-green-800">
                                                        <span className="font-medium">
                                                            Kompetisi:
                                                        </span>{" "}
                                                        {getSelectedCompetition()
                                                            ?.name ||
                                                            "Tidak diketahui"}
                                                    </p>
                                                </div>
                                                <div className="flex items-center">
                                                    <FiFolder className="text-green-500 mr-2" />
                                                    <p className="text-sm text-green-800">
                                                        <span className="font-medium">
                                                            Kategori:
                                                        </span>{" "}
                                                        {
                                                            getSelectedCategory()
                                                                ?.name
                                                        }
                                                    </p>
                                                </div>
                                                <div className="flex items-center">
                                                    <FiFileText className="text-green-500 mr-2" />
                                                    <p className="text-sm text-green-800">
                                                        <span className="font-medium">
                                                            Top:
                                                        </span>{" "}
                                                        {form.data.top_type}{" "}
                                                        Besar
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                        <Button
                                            onClick={() => {
                                                if (form.data.id) {
                                                    router.visit(
                                                        route(
                                                            "global.announcements.index"
                                                        )
                                                    );
                                                } else {
                                                    form.setData({
                                                        id: null,
                                                        category_id: "",
                                                        top_type: "100",
                                                        file_path: "",
                                                        file: null,
                                                    });
                                                    setTab("list");
                                                }
                                            }}
                                            variant="secondary"
                                            size="medium"
                                            icon={FiX}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="medium"
                                            icon={
                                                form.data.id ? FiEdit : FiPlus
                                            }
                                            disabled={form.processing}
                                        >
                                            {form.data.id
                                                ? "Update Pengumuman"
                                                : "Buat Pengumuman"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                show={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setAnnouncementToDelete(null);
                }}
                title="Konfirmasi Penghapusan"
                maxWidth="sm"
            >
                <div className="space-y-4">
                    <div className="text-center">
                        <FiTrash2 className="mx-auto h-12 w-12 text-red-500" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                            Hapus Pengumuman?
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Pengumuman yang dihapus tidak dapat dikembalikan.
                            Apakah Anda yakin?
                        </p>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button
                            onClick={() => {
                                setShowDeleteModal(false);
                                setAnnouncementToDelete(null);
                            }}
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
                            Hapus
                        </Button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

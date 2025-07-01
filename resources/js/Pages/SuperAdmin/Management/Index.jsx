import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    FiAward,
    FiList,
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiToggleLeft,
    FiToggleRight,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";

export default function ManagementIndex({ auth, competitions }) {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showCompetitionModal, setShowCompetitionModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingCompetition, setEditingCompetition] = useState(null);
    const [expandedCompetitions, setExpandedCompetitions] = useState([]);

    const categoryForm = useForm({
        name: "",
        description: "",
        competition_id: "",
    });

    const competitionForm = useForm({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
    });

    const toggleCompetitionExpand = (competitionId) => {
        setExpandedCompetitions((prev) =>
            prev.includes(competitionId)
                ? prev.filter((id) => id !== competitionId)
                : [...prev, competitionId]
        );
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            categoryForm.put(
                route("superadmin.categories.update", editingCategory.id),
                {
                    onSuccess: () => {
                        setShowCategoryModal(false);
                        setEditingCategory(null);
                    },
                }
            );
        } else {
            categoryForm.post(route("superadmin.categories.store"), {
                onSuccess: () => {
                    setShowCategoryModal(false);
                },
            });
        }
    };

    const handleCompetitionSubmit = (e) => {
        e.preventDefault();
        if (editingCompetition) {
            competitionForm.put(
                route("superadmin.competitions.update", editingCompetition.id),
                {
                    onSuccess: () => {
                        setShowCompetitionModal(false);
                        setEditingCompetition(null);
                    },
                }
            );
        } else {
            competitionForm.post(route("superadmin.competitions.store"), {
                onSuccess: () => {
                    setShowCompetitionModal(false);
                },
            });
        }
    };

    const editCategory = (category) => {
        setEditingCategory(category);
        categoryForm.setData({
            name: category.name,
            description: category.description,
            competition_id: category.competition_id,
        });
        setShowCategoryModal(true);
    };

    const editCompetition = (competition) => {
        setEditingCompetition(competition);
        competitionForm.setData({
            name: competition.name,
            description: competition.description,
            start_date: competition.start_date,
            end_date: competition.end_date,
        });
        setShowCompetitionModal(true);
    };

    const toggleCategoryStatus = (category) => {
        categoryForm.patch(
            route("superadmin.categories.toggle-status", category.id)
        );
    };

    const toggleCompetitionStatus = (competition) => {
        competitionForm.patch(
            route("superadmin.competitions.toggle-status", competition.id)
        );
    };

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Management Kompetisi & Kategori" />

            <div className="min-h-screen">
                <div className="">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                                Manajemen Kompetisi & Kategori
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Kelola semua kompetisi dan kategori yang
                                tersedia
                            </p>
                        </div>
                        <Button
                            onClick={() => {
                                setEditingCompetition(null);
                                competitionForm.reset();
                                setShowCompetitionModal(true);
                            }}
                            variant="primary"
                            size="medium"
                            icon={FiPlus}
                        >
                            Tambah Kompetisi
                        </Button>
                    </div>

                    {/* Competitions List */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {competitions.length === 0 ? (
                            <div className="p-8 text-center">
                                <FiAward className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    Belum ada kompetisi
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Buat kompetisi baru untuk memulai
                                </p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {competitions.map((competition) => (
                                    <li
                                        key={competition.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="px-6 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() =>
                                                            toggleCompetitionExpand(
                                                                competition.id
                                                            )
                                                        }
                                                        className="mr-3 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {expandedCompetitions.includes(
                                                            competition.id
                                                        ) ? (
                                                            <FiChevronUp
                                                                size={20}
                                                            />
                                                        ) : (
                                                            <FiChevronDown
                                                                size={20}
                                                            />
                                                        )}
                                                    </button>
                                                    <div>
                                                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                                            {competition.name}
                                                            <span
                                                                className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                                                                    competition.is_active
                                                                        ? "bg-green-100 text-green-800"
                                                                        : "bg-red-100 text-red-800"
                                                                }`}
                                                            >
                                                                {competition.is_active
                                                                    ? "Aktif"
                                                                    : "Nonaktif"}
                                                            </span>
                                                        </h3>
                                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                                            <FiCalendar
                                                                className="mr-1"
                                                                size={14}
                                                            />
                                                            {formatDate(
                                                                competition.start_date
                                                            )}{" "}
                                                            -{" "}
                                                            {formatDate(
                                                                competition.end_date
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        onClick={() =>
                                                            editCompetition(
                                                                competition
                                                            )
                                                        }
                                                        variant="secondary"
                                                        size="small"
                                                        icon={FiEdit2}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            toggleCompetitionStatus(
                                                                competition
                                                            )
                                                        }
                                                        variant={
                                                            competition.is_active
                                                                ? "danger"
                                                                : "success"
                                                        }
                                                        size="small"
                                                        icon={
                                                            competition.is_active
                                                                ? FiToggleLeft
                                                                : FiToggleRight
                                                        }
                                                    >
                                                        {competition.is_active
                                                            ? "Nonaktifkan"
                                                            : "Aktifkan"}
                                                    </Button>
                                                </div>
                                            </div>

                                            {expandedCompetitions.includes(
                                                competition.id
                                            ) && (
                                                <div className="mt-4 pl-9">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h4 className="text-md font-medium flex items-center">
                                                            <FiList className="mr-2 text-blue-500" />
                                                            Daftar Kategori
                                                        </h4>
                                                        <Button
                                                            onClick={() => {
                                                                setEditingCategory(
                                                                    null
                                                                );
                                                                categoryForm.reset();
                                                                categoryForm.setData(
                                                                    "competition_id",
                                                                    competition.id
                                                                );
                                                                setShowCategoryModal(
                                                                    true
                                                                );
                                                            }}
                                                            variant="primary"
                                                            size="small"
                                                            icon={FiPlus}
                                                        >
                                                            Tambah Kategori
                                                        </Button>
                                                    </div>

                                                    {competition.categories
                                                        .length === 0 ? (
                                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                            <p className="text-sm text-gray-500">
                                                                Belum ada
                                                                kategori untuk
                                                                kompetisi ini
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {competition.categories.map(
                                                                (category) => (
                                                                    <div
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                                                                    >
                                                                        <div>
                                                                            <h5 className="font-medium text-gray-900">
                                                                                {
                                                                                    category.name
                                                                                }
                                                                            </h5>
                                                                            {category.description && (
                                                                                <p className="text-sm text-gray-600 mt-1">
                                                                                    {
                                                                                        category.description
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                            <span
                                                                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                                                                                    category.is_active
                                                                                        ? "bg-green-100 text-green-800"
                                                                                        : "bg-red-100 text-red-800"
                                                                                }`}
                                                                            >
                                                                                {category.is_active
                                                                                    ? "Aktif"
                                                                                    : "Nonaktif"}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex space-x-2">
                                                                            <Button
                                                                                onClick={() =>
                                                                                    editCategory(
                                                                                        category
                                                                                    )
                                                                                }
                                                                                variant="secondary"
                                                                                size="small"
                                                                                icon={
                                                                                    FiEdit2
                                                                                }
                                                                            />
                                                                            <Button
                                                                                onClick={() =>
                                                                                    toggleCategoryStatus(
                                                                                        category
                                                                                    )
                                                                                }
                                                                                variant={
                                                                                    category.is_active
                                                                                        ? "danger"
                                                                                        : "success"
                                                                                }
                                                                                size="small"
                                                                                icon={
                                                                                    category.is_active
                                                                                        ? FiToggleLeft
                                                                                        : FiToggleRight
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Category Modal */}
            <Modal
                show={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                title={
                    editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"
                }
                maxWidth="lg"
            >
                <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Kategori*
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={categoryForm.data.name}
                            onChange={(e) =>
                                categoryForm.setData("name", e.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={categoryForm.data.description}
                            onChange={(e) =>
                                categoryForm.setData(
                                    "description",
                                    e.target.value
                                )
                            }
                            rows={3}
                        />
                    </div>

                    {!editingCategory && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kompetisi*
                            </label>
                            <select
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={categoryForm.data.competition_id}
                                onChange={(e) =>
                                    categoryForm.setData(
                                        "competition_id",
                                        e.target.value
                                    )
                                }
                                required
                            >
                                <option value="">Pilih Kompetisi</option>
                                {competitions.map((comp) => (
                                    <option key={comp.id} value={comp.id}>
                                        {comp.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
                        <Button
                            onClick={() => setShowCategoryModal(false)}
                            variant="secondary"
                            size="medium"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="medium"
                            disabled={categoryForm.processing}
                        >
                            {editingCategory
                                ? "Simpan Perubahan"
                                : "Buat Kategori"}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Competition Modal */}
            <Modal
                show={showCompetitionModal}
                onClose={() => setShowCompetitionModal(false)}
                title={
                    editingCompetition
                        ? "Edit Kompetisi"
                        : "Tambah Kompetisi Baru"
                }
                maxWidth="2xl"
            >
                <form onSubmit={handleCompetitionSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Kompetisi*
                            </label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={competitionForm.data.name}
                                onChange={(e) =>
                                    competitionForm.setData(
                                        "name",
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi*
                            </label>
                            <textarea
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={competitionForm.data.description}
                                onChange={(e) =>
                                    competitionForm.setData(
                                        "description",
                                        e.target.value
                                    )
                                }
                                rows={3}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tanggal Mulai*
                                </label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={competitionForm.data.start_date}
                                    onChange={(e) =>
                                        competitionForm.setData(
                                            "start_date",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tanggal Berakhir*
                                </label>
                                <input
                                    type="datetime-local"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={competitionForm.data.end_date}
                                    onChange={(e) =>
                                        competitionForm.setData(
                                            "end_date",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
                        <Button
                            onClick={() => setShowCompetitionModal(false)}
                            variant="secondary"
                            size="medium"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="medium"
                            disabled={competitionForm.processing}
                        >
                            {editingCompetition
                                ? "Simpan Perubahan"
                                : "Buat Kompetisi"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}

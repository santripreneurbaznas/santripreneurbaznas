import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function AdminAccessManagement({ admins, categories, auth }) {
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleAdminSelect = (admin) => {
        setSelectedAdmin(admin);
        setSelectedCategories(admin.managed_categories.map((c) => c.id));
    };

    const handleCategoryToggle = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
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
                    // Refresh data
                    router.reload({ only: ["admins"] });
                },
            }
        );
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Manajemen Hak Akses Admin" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h1 className="text-2xl font-bold">
                                Manajemen Hak Akses Admin
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Atur kategori apa saja yang bisa diakses oleh
                                masing-masing admin
                            </p>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Daftar Admin */}
                            <div>
                                <h2 className="text-lg font-medium mb-4">
                                    Daftar Admin
                                </h2>
                                <div className="space-y-2">
                                    {admins.length === 0 ? (
                                        <p className="text-gray-500">
                                            Belum ada admin
                                        </p>
                                    ) : (
                                        admins.map((admin) => (
                                            <div
                                                key={admin.id}
                                                onClick={() =>
                                                    handleAdminSelect(admin)
                                                }
                                                className={`p-4 rounded-lg cursor-pointer ${
                                                    selectedAdmin?.id ===
                                                    admin.id
                                                        ? "bg-blue-50 border border-blue-200"
                                                        : "hover:bg-gray-50 border border-transparent"
                                                }`}
                                            >
                                                <h3 className="font-medium">
                                                    {admin.name}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {admin.email}
                                                </p>
                                                <div className="mt-2">
                                                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                                        {
                                                            admin
                                                                .managed_categories
                                                                .length
                                                        }{" "}
                                                        Kategori
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Hak Akses Kategori */}
                            <div>
                                {selectedAdmin ? (
                                    <>
                                        <h2 className="text-lg font-medium mb-4">
                                            Hak Akses untuk {selectedAdmin.name}
                                        </h2>

                                        <div className="space-y-3">
                                            {categories.map((category) => (
                                                <div
                                                    key={category.id}
                                                    className="flex items-center"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={`category-${category.id}`}
                                                        checked={selectedCategories.includes(
                                                            category.id
                                                        )}
                                                        onChange={() =>
                                                            handleCategoryToggle(
                                                                category.id
                                                            )
                                                        }
                                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                    />
                                                    <label
                                                        htmlFor={`category-${category.id}`}
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        {category.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                onClick={submitAccess}
                                                disabled={
                                                    !selectedCategories.length
                                                }
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Simpan Perubahan
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-gray-50 p-8 text-center rounded-lg">
                                        <p className="text-gray-500">
                                            Pilih admin terlebih dahulu untuk
                                            mengatur hak akses
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

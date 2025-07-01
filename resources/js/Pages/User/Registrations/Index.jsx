import { Head, Link, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import useFlashMessages from "@/Hooks/useFlashMessages";

export default function UserRegistrationsIndex({ auth }) {
    const { registrations } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Apakah Anda yakin ingin menghapus pendaftaran ini?")) {
            router.delete(`/user/my-registrations/${id}`);
        }
    };

    useFlashMessages();

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pendaftaran Saya" />

            <div className="">
                <div className="max-w-5xl mx-auto">
                    {registrations.length === 0 ? (
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-8 text-center">
                                <svg
                                    className="mx-auto h-16 w-16 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="mt-4 text-xl font-medium text-gray-900">
                                    Belum ada pendaftaran
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Anda belum mendaftar ke kompetisi apapun.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href={route("competitions.index")}
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 border border-transparent rounded-lg font-semibold text-sm text-white uppercase tracking-widest hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md hover:shadow-lg"
                                    >
                                        Daftar Kompetisi
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Pendaftaran Saya
                                </h1>
                                <p className="mb-4 text-sm text-gray-600">
                                    Di sini Anda dapat melihat seluruh riwayat
                                    pendaftaran Anda. Pantau status, lihat
                                    detail lomba, dan pastikan Anda tidak
                                    melewatkan informasi penting!
                                </p>
                                <div className="h-[0.5px] w-full bg-gray-200"></div>
                            </div>
                            {registrations.map((reg) => (
                                <div
                                    key={reg.id}
                                    className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl border border-gray-100"
                                >
                                    <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                                        <div className="">
                                            <div className="flex items-center justify-between ">
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {reg.competition_name}
                                                </h3>
                                                {/* <span
                                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                        reg.status
                                                    )} shadow-sm`}
                                                >
                                                    {reg.status === "approved"
                                                        ? "Disetujui"
                                                        : reg.status ===
                                                          "rejected"
                                                        ? "Ditolak"
                                                        : "Menunggu"}
                                                </span> */}
                                            </div>
                                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 ">
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-gray-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                        />
                                                    </svg>
                                                    Kategori:{" "}
                                                    {reg.category_name}
                                                </p>
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-gray-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    Tanggal Pendaftaran:{" "}
                                                    {new Date(
                                                        reg.created_at
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                                            <Link
                                                href={`/user/my-registrations/${reg.id}`}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150"
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                                Detail
                                            </Link>
                                            <Link
                                                href={`/user/my-registrations/${reg.id}/edit`}
                                                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ${
                                                    !reg.can_edit
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                disabled={!reg.can_edit}
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                Edit
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-2 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            Dokumen Pendaftaran:
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <a
                                                href={`/berkas/storage/${reg.business_proposal_file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-colors duration-150 border border-gray-200"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-green-600 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">
                                                    Proposal Bisnis
                                                </span>
                                            </a>
                                            <a
                                                href={`/berkas/storage/${reg.mustahik_certificate_file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-colors duration-150 border border-gray-200"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-green-600 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">
                                                    Sertifikat Mustahik
                                                </span>
                                            </a>
                                            <a
                                                href={`/berkas/storage/${reg.pesantren_certificate_file}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-100 transition-colors duration-150 border border-gray-200"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-green-600 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">
                                                    Sertifikat Pesantren
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

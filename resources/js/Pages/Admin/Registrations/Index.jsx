import { Head, Link, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    FiEye,
    FiDownload,
    FiUser,
    FiPhone,
    FiAward,
    FiTag,
    FiClock,
    FiEdit,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminRegistrationsIndex({ auth }) {
    const { registrations, meta } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");

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

    const handleStatusChange = (id, status) => {
        router.put(
            `/admin/registrations/${id}`,
            { status },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Show toast notification
                },
            }
        );
    };

    const handlePrevPage = () => {
        if (meta.current_page > 1) {
            router.get(
                `/admin/registrations?page=${meta.current_page - 1}`,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }
    };

    const handleNextPage = () => {
        if (meta.current_page < meta.last_page) {
            router.get(
                `/admin/registrations?page=${meta.current_page + 1}`,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }
    };

    const filteredRegistrations = registrations?.filter((registration) =>
        registration.user_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Kelola Pendaftaran" />

            <div className="">
                <div className="">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Kelola Pendaftaran
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Review dan kelola semua pendaftaran peserta
                                kompetisi
                            </p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center md:justify-between">
                            {/* Search Input - Now takes full width on mobile, then moves to right on desktop */}
                            <div className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari Pendaftar"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>

                            {/* Export Button - Full width on mobile, auto width on desktop */}
                            <div className="w-full md:w-auto">
                                <a
                                    href={route("admin.registrations.export")}
                                    className="inline-flex items-center justify-center w-full md:w-auto px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    <FiDownload className="mr-2" />
                                    Export Excel
                                </a>
                            </div>
                        </div>
                    </div>

                    {registrations.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                                <FiAward className="w-full h-full" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Belum ada pendaftaran
                            </h3>
                            <p className="mt-2 text-gray-500">
                                Tidak ada pendaftaran untuk kategori yang Anda
                                kelola saat ini.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Peserta
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Kompetisi & Kategori
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Dokumen
                                                </th>
                                                {/* <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Status
                                                </th> */}
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredRegistrations.map(
                                                (reg) => (
                                                    <tr
                                                        key={reg.id}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
                                                        {/* Peserta */}
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
                                                                            reg.user_name
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm text-gray-500 flex items-center">
                                                                        <FiPhone
                                                                            className="mr-1"
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                        {
                                                                            reg.number_wa
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Kompetisi & Kategori */}
                                                        <td className="px-6 py-4">
                                                            <div className="font-medium text-gray-900 flex items-center">
                                                                <FiAward className="mr-2 text-green-500" />
                                                                {
                                                                    reg.competition_name
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500 flex items-center mt-1">
                                                                <FiTag className="mr-2 text-purple-500" />
                                                                {
                                                                    reg.category_name
                                                                }
                                                            </div>
                                                        </td>

                                                        {/* Dokumen */}
                                                        <td className="px-6 py-4">
                                                            <div className="flex flex-col space-y-2">
                                                                <a
                                                                    href={`${reg.business_proposal_file}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm text-green-600 hover:text-green-800 flex items-center"
                                                                >
                                                                    <FiDownload
                                                                        className="mr-1"
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    Proposal
                                                                    Bisnis
                                                                </a>
                                                                <a
                                                                    href={`${reg.mustahik_certificate_file}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm text-green-600 hover:text-green-800 flex items-center"
                                                                >
                                                                    <FiDownload
                                                                        className="mr-1"
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    Sertifikat
                                                                    Mustahik
                                                                </a>
                                                                <a
                                                                    href={`${reg.pesantren_certificate_file}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm text-green-600 hover:text-green-800 flex items-center"
                                                                >
                                                                    <FiDownload
                                                                        className="mr-1"
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    Sertifikat
                                                                    Pesantren
                                                                </a>
                                                            </div>
                                                        </td>

                                                        {/* Status */}
                                                        {/* <td className="px-6 py-4">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                                    reg.status
                                                                )}`}
                                                            >
                                                                {reg.status ===
                                                                "approved"
                                                                    ? "Disetujui"
                                                                    : reg.status ===
                                                                      "rejected"
                                                                    ? "Ditolak"
                                                                    : "Menunggu"}
                                                            </span>
                                                        </td> */}

                                                        {/* Aksi */}
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end space-x-2">
                                                                <Link
                                                                    href={`/admin/registrations/${reg.id}`}
                                                                    className="p-2 text-green-600  rounded-lg transition-colors flex items-center gap-2 bg-green-100 text-[12px] hover:bg-green-200"
                                                                    title="Lihat Detail"
                                                                >
                                                                    <FiEye
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                    Detail
                                                                </Link>

                                                                {/* <select
                                                                    value={
                                                                        reg.status
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleStatusChange(
                                                                            reg.id,
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm py-1 pl-2 pr-8"
                                                                >
                                                                    <option value="pending">
                                                                        Pending
                                                                    </option>
                                                                    <option value="approved">
                                                                        Approved
                                                                    </option>
                                                                    <option value="rejected">
                                                                        Rejected
                                                                    </option>
                                                                </select> */}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center justify-between bg-white px-4 py-3 rounded-b-lg border-t border-gray-200">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={meta.current_page === 1}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                                            meta.current_page === 1
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={
                                            meta.current_page === meta.last_page
                                        }
                                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                                            meta.current_page === meta.last_page
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing{" "}
                                            <span className="font-medium">
                                                {(meta.current_page - 1) *
                                                    meta.per_page +
                                                    1}
                                            </span>{" "}
                                            to{" "}
                                            <span className="font-medium">
                                                {Math.min(
                                                    meta.current_page *
                                                        meta.per_page,
                                                    meta.total
                                                )}
                                            </span>{" "}
                                            of{" "}
                                            <span className="font-medium">
                                                {meta.total}
                                            </span>{" "}
                                            results
                                        </p>
                                    </div>
                                    <div>
                                        <nav
                                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                            aria-label="Pagination"
                                        >
                                            <button
                                                onClick={handlePrevPage}
                                                disabled={
                                                    meta.current_page === 1
                                                }
                                                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                                                    meta.current_page === 1
                                                        ? "text-gray-300 cursor-not-allowed"
                                                        : "text-gray-500 hover:bg-gray-50"
                                                }`}
                                            >
                                                <span className="sr-only">
                                                    Previous
                                                </span>
                                                <FiChevronLeft
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                                Page {meta.current_page} of{" "}
                                                {meta.last_page}
                                            </span>
                                            <button
                                                onClick={handleNextPage}
                                                disabled={
                                                    meta.current_page ===
                                                    meta.last_page
                                                }
                                                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                                                    meta.current_page ===
                                                    meta.last_page
                                                        ? "text-gray-300 cursor-not-allowed"
                                                        : "text-gray-500 hover:bg-gray-50"
                                                }`}
                                            >
                                                <span className="sr-only">
                                                    Next
                                                </span>
                                                <FiChevronRight
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

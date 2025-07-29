import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    FiUser,
    FiAward,
    FiFileText,
    FiArrowRight,
    FiXCircle,
    FiCheckCircle,
    FiClock,
} from "react-icons/fi";
import useFlashMessages from "@/Hooks/useFlashMessages";

export default function Dashboard({
    auth,
    registrationsCount,
    recentActivities,
}) {
    // const getStatusIcon = (status) => {
    //     switch (status) {
    //         case "approved":
    //             return <FiCheckCircle className="text-green-600 text-sm" />;
    //         case "pending":
    //             return <FiClock className="text-yellow-500 text-sm" />;
    //         case "rejected":
    //             return <FiXCircle className="text-red-500 text-sm" />;
    //         default:
    //             return <FiFileText className="text-green-600 text-sm" />;
    //     }
    // };

    // // Fungsi untuk menentukan warna background berdasarkan status
    // const getStatusBgColor = (status) => {
    //     switch (status) {
    //         case "approved":
    //             return "bg-green-100";
    //         case "pending":
    //             return "bg-yellow-100";
    //         case "rejected":
    //             return "bg-red-100";
    //         default:
    //             return "bg-green-100";
    //     }
    // };

    // Fungsi untuk menentukan pesan berdasarkan status
    // const getStatusMessage = (status, competitionName) => {
    //     switch (status) {
    //         case "approved":
    //             return `Pendaftaran Anda untuk ${competitionName} telah diterima`;
    //         case "pending":
    //             return `Pendaftaran Anda untuk ${competitionName} sedang diproses`;
    //         case "rejected":
    //             return `Pendaftaran Anda untuk ${competitionName} tidak disetujui`;
    //         default:
    //             return `Anda telah mendaftar di ${competitionName}`;
    //     }
    // };

    useFlashMessages();

    console.log(registrationsCount);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="">
                <div className="">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-br from-[#259148] to-[#4CAF50] rounded-xl shadow-md p-6 mb-2 text-white">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">
                            Selamat Datang, {auth.user.name}
                        </h1>
                        <p className="opacity-90">
                            Kelola partisipasi Anda dalam berbagai kompetisi
                            dengan mudah
                        </p>
                    </div>
                    {registrationsCount > 0 ? (
                        <></>
                    ) : (
                        <>
                            <div className="bg-gradient-to-br from-[#ff3d3d] to-[#c62828] rounded-xl shadow-md p-6 mb-8 text-white relative ">
                                {/* Warning Badge */}
                                <div className="absolute -top-3 -left-3 bg-yellow-400 text-red-800 w-16 h-16 rounded-full flex items-center justify-center transform rotate-12">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>

                                <div className="ml-8">
                                    {" "}
                                    {/* Memberi space untuk badge */}
                                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                                        Anda Belum Menyelesaikan Pendaftaran
                                        Lomba
                                    </h1>
                                    <p className="opacity-90 mb-6">
                                        Segera Selesaikan Pendaftaran Lomba Anda
                                    </p>
                                    {/* Enhanced Button */}
                                    <button
                                        onClick={() =>
                                            (window.location.href =
                                                "/user/competitions/1/register")
                                        }
                                        className="relative overflow-hidden group bg-white text-red-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 animate-pulse"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                                />
                                            </svg>
                                            Selesaikan Sekarang
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-x-full"></span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* User Profile Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                            <div className="p-6 flex items-center">
                                <div className="bg-green-100 p-4 rounded-full mr-4">
                                    <FiUser className="text-green-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Profil Anda
                                    </h3>
                                    <p className="text-gray-500">
                                        Status: Aktif
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Registrations Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                            <div className="p-6 flex items-center">
                                <div className="bg-green-100 p-4 rounded-full mr-4">
                                    <FiFileText className="text-green-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Total Pendaftaran
                                    </h3>
                                    <p className="text-gray-500">
                                        {registrationsCount} kompetisi
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Achievements Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                            <div className="p-6 flex items-center">
                                <div className="bg-green-100 p-4 rounded-full mr-4">
                                    <FiAward className="text-green-600 text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Pencapaian
                                    </h3>
                                    <p className="text-gray-500">
                                        Lihat progress Anda
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Browse Competitions */}
                        <Link
                            href="/user/competitions"
                            className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            Jelajahi Kompetisi
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            Temukan kompetisi yang sesuai dengan
                                            minat dan bakat Anda
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors duration-300">
                                        <FiArrowRight className="text-green-600 text-xl" />
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        +10 kompetisi tersedia untuk Anda ikuti
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* My Registrations */}
                        <Link
                            href="/user/my-registrations"
                            className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            Pendaftaran Saya
                                        </h3>
                                        <p className="text-gray-500 mb-4">
                                            Kelola semua pendaftaran kompetisi
                                            Anda
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors duration-300">
                                        <FiArrowRight className="text-green-600 text-xl" />
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        {registrationsCount} pendaftaran aktif
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Recent Activity (optional) */}
                    <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Aktivitas Terkini
                            </h3>
                            <div className="space-y-4">
                                {recentActivities.length > 0 ? (
                                    recentActivities.map((activity, index) => (
                                        <div
                                            key={activity.id}
                                            className={`flex items-start pb-4 ${
                                                index !==
                                                recentActivities.length - 1
                                                    ? "border-b border-gray-100"
                                                    : ""
                                            }`}
                                        >
                                            {/* <div
                                                className={`${getStatusBgColor(
                                                    activity.status
                                                )} p-2 rounded-full mr-3 mt-1`}
                                            >
                                                {getStatusIcon(activity.status)} */}
                                            <div
                                                className={`bg-green-100 p-2 rounded-full mr-3 mt-1`}
                                            >
                                                {/* {getStatusIcon(activity.status)} */}
                                                <FiCheckCircle className="text-green-600 text-sm" />
                                            </div>
                                            <div>
                                                <p className="text-gray-800">
                                                    {/* {getStatusMessage(
                                                        activity.status,
                                                        activity.competition_name
                                                    )} */}
                                                    Pendaftaran Anda untuk
                                                    <span className="text-primary font-semibold">
                                                        {" "}
                                                        {
                                                            activity.competition_name
                                                        }
                                                    </span>{" "}
                                                    telah berhasil
                                                    {activity.category_name && (
                                                        <span className="text-gray-500 text-sm block mt-1">
                                                            Kategori:{" "}
                                                            {
                                                                activity.category_name
                                                            }
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {activity.formatted_date}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-gray-500">
                                        Belum ada aktivitas terbaru
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

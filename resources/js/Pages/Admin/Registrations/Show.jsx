import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    FiArrowLeft,
    FiEdit,
    FiDownload,
    FiCalendar,
    FiMapPin,
    FiUser,
    FiDollarSign,
    FiPhone,
    FiBook,
    FiAward,
    FiFileText,
} from "react-icons/fi";

export default function UserRegistrationShow({ auth }) {
    const { registration } = usePage().props;

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

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    console.log(registration);

    return (
        <AuthenticatedLayout>
            <Head
                title={`Detail Pendaftaran - ${registration.competition.name}`}
            />

            <div className="">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Detail Pendaftaran
                            </h1>
                            <h2 className="text-xl font-semibold text-gray-700 mt-1">
                                {registration.competition.name}
                            </h2>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800`}
                            >
                                {/* <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                    registration.status
                                )}`}
                            > */}
                                {/* {registration.status === "approved"
                                    ? "Disetujui"
                                    : registration.status === "rejected"
                                    ? "Ditolak"
                                    : "Menunggu"} */}
                                Terdaftar
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    {/* Personal Information Section */}
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FiUser className="mr-2 text-blue-500" />
                            Informasi Peserta
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Nama Peserta
                                    </p>
                                    <p className="text-gray-800">
                                        {registration.user.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Tempat Lahir
                                    </p>
                                    <p className="text-gray-800">
                                        {registration.place_of_birth}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Tanggal Lahir
                                    </p>
                                    <p className="text-gray-800 flex items-center">
                                        <FiCalendar className="mr-2 text-gray-500" />
                                        {formatDate(registration.date_of_birth)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Jenis Kelamin
                                    </p>
                                    <p className="text-gray-800">
                                        {registration.gender === "male"
                                            ? "Laki-laki"
                                            : "Perempuan"}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Alamat
                                    </p>
                                    <p className="text-gray-800">
                                        {registration.address}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Nomor WhatsApp
                                    </p>
                                    <p className="text-gray-800 flex items-center">
                                        <FiPhone className="mr-2 text-gray-500" />
                                        {registration.number_wa}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pesantren Information Section */}
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FiBook className="mr-2 text-green-500" />
                            Informasi Tambahan
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Nama Pesantren
                                </p>
                                <p className="text-gray-800">
                                    {registration.boarding_school_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Estimasi Penghasilan Bulanan
                                </p>
                                <p className="text-gray-800 flex items-center">
                                    <FiDollarSign className="mr-2 text-gray-500" />
                                    {registration.estimated_monthly_income}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Motivation Section */}
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FiAward className="mr-2 text-purple-500" />
                            Motivasi Mengikuti Kompetisi
                        </h3>
                        <p className="text-gray-700 whitespace-pre-line">
                            {registration.motivation}
                        </p>
                    </div>

                    {/* Documents Section */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FiFileText className="mr-2 text-orange-500" />
                            Dokumen Pendaftaran
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DocumentCard
                                title="Proposal Bisnis"
                                fileUrl={registration.business_proposal_file}
                            />
                            <DocumentCard
                                title="Sertifikat Mustahik"
                                fileUrl={registration.mustahik_certificate_file}
                            />
                            <DocumentCard
                                title="Sertifikat Pesantren"
                                fileUrl={
                                    registration.pesantren_certificate_file
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
            </div>
        </AuthenticatedLayout>
    );
}

// Reusable Document Card Component
function DocumentCard({ title, fileUrl }) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
            <a
                href={`/storage/${fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
                <FiDownload className="mr-1" />
                Download Dokumen
            </a>
        </div>
    );
}

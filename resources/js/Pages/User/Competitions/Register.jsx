import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast } from "sonner";

export default function RegistrationForm({ competition, categories, errors }) {
    const { data, setData, post, processing } = useForm({
        competition_id: competition.id,
        category_id: "",
        place_of_birth: "",
        date_of_birth: "",
        gender: "",
        address: "",
        boarding_school_name: "",
        motivation: "",
        estimated_monthly_income: "",
        number_wa: "",
        business_proposal_file: null,
        mustahik_certificate_file: null,
        pesantren_certificate_file: null,
    });

    const handleSubmit = (e) => {
        if (
            data.business_proposal_file == null ||
            data.mustahik_certificate_file == null ||
            data.pesantren_certificate_file == null
        ) {
            toast.error("File harus diisi");
        }
        e.preventDefault();
        post(route("user.registrations.store"), {
            forceFormData: true,
        });
    };

    const handleFileChange = (fieldName) => (e) => {
        setData(fieldName, e.target.files[0]);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Pendaftaran ${competition.name}`} />

            <div className=" bg-gray-50 min-h-screen">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                            <div className="mb-8 text-center">
                                <h1 className="text-2xl font-bold  mb-2 text-[#4CAF50]">
                                    {competition.name}
                                </h1>

                                <p className="text-gray-600">
                                    Silakan lengkapi data berikut untuk
                                    mendaftar kompetisi
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Competition Info (Hidden) */}
                                <input
                                    type="hidden"
                                    name="competition_id"
                                    value={competition.id}
                                />

                                {/* Category Selection */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Kategori Kompetisi{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.category_id
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                        required
                                    >
                                        <option value="">
                                            -- Pilih Kategori --
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                {/* Personal Information Section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Informasi Pribadi
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Place of Birth */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Tempat Lahir{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="place_of_birth"
                                                value={data.place_of_birth}
                                                onChange={(e) =>
                                                    setData(
                                                        "place_of_birth",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-1 block w-full rounded-md border ${
                                                    errors.place_of_birth
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                                required
                                            />
                                            {errors.place_of_birth && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.place_of_birth}
                                                </p>
                                            )}
                                        </div>

                                        {/* Date of Birth */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Tanggal Lahir{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                name="date_of_birth"
                                                value={data.date_of_birth}
                                                onChange={(e) =>
                                                    setData(
                                                        "date_of_birth",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-1 block w-full rounded-md border ${
                                                    errors.date_of_birth
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                                required
                                            />
                                            {errors.date_of_birth && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.date_of_birth}
                                                </p>
                                            )}
                                        </div>

                                        {/* Gender */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Jenis Kelamin{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                name="gender"
                                                value={data.gender}
                                                onChange={(e) =>
                                                    setData(
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-1 block w-full rounded-md border ${
                                                    errors.gender
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                                required
                                            >
                                                <option value="">
                                                    -- Pilih Jenis Kelamin --
                                                </option>
                                                <option value="Laki-laki">
                                                    Laki-laki
                                                </option>
                                                <option value="Perempuan">
                                                    Perempuan
                                                </option>
                                            </select>
                                            {errors.gender && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.gender}
                                                </p>
                                            )}
                                        </div>

                                        {/* WhatsApp Number */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nomor WhatsApp{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="number_wa"
                                                value={data.number_wa}
                                                onChange={(e) =>
                                                    setData(
                                                        "number_wa",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-1 block w-full rounded-md border ${
                                                    errors.number_wa
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                                placeholder="Contoh: 081234567890"
                                                required
                                            />
                                            {errors.number_wa && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.number_wa}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Alamat Lengkap{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="address"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        rows={3}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.address
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                        required
                                    ></textarea>
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* Pesantren Information Section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Informasi Pesantren
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Boarding School Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nama Pesantren{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                name="boarding_school_name"
                                                value={
                                                    data.boarding_school_name
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "boarding_school_name",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-1 block w-full rounded-md border ${
                                                    errors.boarding_school_name
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                                required
                                            />
                                            {errors.boarding_school_name && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {
                                                        errors.boarding_school_name
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* Estimated Monthly Income */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Perkiraan Penghasilan Bulanan{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                name="estimated_monthly_income"
                                                value={
                                                    data.estimated_monthly_income
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "estimated_monthly_income",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-1 block w-full rounded-md border ${
                                                    errors.estimated_monthly_income
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                                required
                                            >
                                                <option value="">
                                                    -- Pilih Range Penghasilan
                                                    --
                                                </option>
                                                <option value="< Rp 1.000.000">
                                                    Kurang dari Rp 1.000.000
                                                </option>
                                                <option value="Rp 1.000.000 - Rp 3.000.000">
                                                    Rp 1.000.000 - Rp 3.000.000
                                                </option>
                                                <option value="Rp 3.000.000 - Rp 5.000.000">
                                                    Rp 3.000.000 - Rp 5.000.000
                                                </option>
                                                <option value="> Rp 5.000.000">
                                                    Lebih dari Rp 5.000.000
                                                </option>
                                            </select>
                                            {errors.estimated_monthly_income && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {
                                                        errors.estimated_monthly_income
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Motivation */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Motivasi Mengikuti Kompetisi{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="motivation"
                                        value={data.motivation}
                                        onChange={(e) =>
                                            setData(
                                                "motivation",
                                                e.target.value
                                            )
                                        }
                                        rows={4}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.motivation
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                        placeholder="Jelaskan motivasi Anda mengikuti kompetisi ini (maksimal 500 karakter)"
                                        required
                                    ></textarea>
                                    {errors.motivation && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.motivation}
                                        </p>
                                    )}
                                </div>

                                {/* File Uploads Section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Upload Dokumen
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Silakan upload dokumen-dokumen berikut
                                        dalam format PDF (maksimal 2MB per file)
                                    </p>

                                    <div className="space-y-6">
                                        {/* Business Proposal File */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Proposal Bisnis{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors duration-150">
                                                    <svg
                                                        className="w-8 h-8 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        ></path>
                                                    </svg>
                                                    <span className="mt-2 text-sm text-gray-600">
                                                        {data.business_proposal_file
                                                            ? data
                                                                  .business_proposal_file
                                                                  .name
                                                            : "Pilih File"}
                                                    </span>
                                                    <input
                                                        type="file"
                                                        name="business_proposal_file"
                                                        onChange={handleFileChange(
                                                            "business_proposal_file"
                                                        )}
                                                        className="hidden"
                                                        accept=".pdf"
                                                    />
                                                </label>
                                            </div>
                                            {errors.business_proposal_file && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {
                                                        errors.business_proposal_file
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* Mustahik Certificate File */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Sertifikat Mustahik{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors duration-150">
                                                    <svg
                                                        className="w-8 h-8 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        ></path>
                                                    </svg>
                                                    <span className="mt-2 text-sm text-gray-600">
                                                        {data.mustahik_certificate_file
                                                            ? data
                                                                  .mustahik_certificate_file
                                                                  .name
                                                            : "Pilih File"}
                                                    </span>
                                                    <input
                                                        type="file"
                                                        name="mustahik_certificate_file"
                                                        onChange={handleFileChange(
                                                            "mustahik_certificate_file"
                                                        )}
                                                        className="hidden"
                                                        accept=".pdf"
                                                    />
                                                </label>
                                            </div>
                                            {errors.mustahik_certificate_file && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {
                                                        errors.mustahik_certificate_file
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* Pesantren Certificate File */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Sertifikat Pesantren{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors duration-150">
                                                    <svg
                                                        className="w-8 h-8 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        ></path>
                                                    </svg>
                                                    <span className="mt-2 text-sm text-gray-600">
                                                        {data.pesantren_certificate_file
                                                            ? data
                                                                  .pesantren_certificate_file
                                                                  .name
                                                            : "Pilih File"}
                                                    </span>
                                                    <input
                                                        type="file"
                                                        name="pesantren_certificate_file"
                                                        onChange={handleFileChange(
                                                            "pesantren_certificate_file"
                                                        )}
                                                        className="hidden"
                                                        accept=".pdf"
                                                    />
                                                </label>
                                            </div>
                                            {errors.pesantren_certificate_file && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {
                                                        errors.pesantren_certificate_file
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end pt-6 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#4CAF50] hover:bg-[#259148] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] transition-colors duration-200 ${
                                            processing
                                                ? "opacity-75 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        {processing ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                                Memproses...
                                            </>
                                        ) : (
                                            "Daftar Sekarang"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

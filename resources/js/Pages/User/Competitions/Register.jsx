import React, { useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast } from "sonner";
import axios from "axios";
import { debounce } from "@/Utils/debounce";
import { Upload, Loader2, CheckCircle, FileCheck } from "lucide-react";

export default function RegistrationForm({
    competition,
    categories,
    user,
    errors,
}) {
    console.log(user);
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [loading, setLoading] = useState({
        provinces: false,
        regencies: false,
        districts: false,
        villages: false,
    });
    const [uploadingFiles, setUploadingFiles] = useState({});

    const { data, setData, post, processing } = useForm({
        competition_id: competition.id,
        category_id: "",
        place_of_birth: "",
        date_of_birth: "",
        gender: "",
        address: "",
        province: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: "",
        boarding_school_name: "",
        motivation: "",
        estimated_monthly_income: "",
        number_wa: "",
        number_kk: "",
        business_proposal: "",
        mustahik_certificate: "",
        pesantren_certificate: "",
        sktm_certificate: "",
    });

    // Fetch provinces saat komponen mount
    useEffect(() => {
        const fetchProvinces = async () => {
            setLoading((prev) => ({ ...prev, provinces: true }));
            try {
                const response = await axios.get("/api/wilayah/provinces");
                setProvinces(response.data);
            } catch (err) {
                console.error("Error fetching provinces:", err);
                toast.error("Gagal memuat data provinsi");
            } finally {
                setLoading((prev) => ({ ...prev, provinces: false }));
            }
        };
        fetchProvinces();
    }, []);

    console.log(errors);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0) {
            toast.error("Terdapat kesalahan dalam input", {
                description: "Silakan periksa kembali form yang Anda isi",
            });

            const firstErrorElement = document.querySelector(
                '[class*="border-red-300"]'
            );
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }, [errors]);

    console.log(errors);

    // Debounced province change handler
    const handleProvinceChange = debounce(async (e) => {
        const provinceId = e.target.value;
        const provinceName = e.target.options[e.target.selectedIndex].text;

        setData("province", provinceName);
        setData("kabupaten", "");
        setData("kecamatan", "");
        setData("kelurahan", "");

        if (provinceId) {
            setLoading((prev) => ({ ...prev, regencies: true }));
            try {
                const response = await axios.get(
                    `/api/wilayah/regencies/${provinceId}`
                );
                setRegencies(response.data);
            } catch (err) {
                console.error("Error fetching regencies:", err);
                toast.error("Gagal memuat data kabupaten");
            } finally {
                setLoading((prev) => ({ ...prev, regencies: false }));
            }
        }
        setDistricts([]);
        setVillages([]);
    }, 300);

    // Handle perubahan kabupaten
    const handleRegencyChange = debounce(async (e) => {
        const regencyId = e.target.value;
        const regencyName = e.target.options[e.target.selectedIndex].text;

        setData("kabupaten", regencyName);
        setData("kecamatan", "");
        setData("kelurahan", "");

        if (regencyId) {
            setLoading((prev) => ({ ...prev, districts: true }));
            try {
                const response = await axios.get(
                    `/api/wilayah/districts/${regencyId}`
                );
                setDistricts(response.data);
            } catch (err) {
                console.error("Error fetching districts:", err);
                toast.error("Gagal memuat data kecamatan");
            } finally {
                setLoading((prev) => ({ ...prev, districts: false }));
            }
        }
        setVillages([]);
    }, 300);

    // Handle perubahan kecamatan
    const handleDistrictChange = debounce(async (e) => {
        const districtId = e.target.value;
        const districtName = e.target.options[e.target.selectedIndex].text;

        setData("kecamatan", districtName);
        setData("kelurahan", "");

        if (districtId) {
            setLoading((prev) => ({ ...prev, villages: true }));
            try {
                const response = await axios.get(
                    `/api/wilayah/villages/${districtId}`
                );
                setVillages(response.data);
            } catch (err) {
                console.error("Error fetching villages:", err);
                toast.error("Gagal memuat data kelurahan");
            } finally {
                setLoading((prev) => ({ ...prev, villages: false }));
            }
        }
    }, 300);

    // Handle perubahan kelurahan
    const handleVillageChange = (e) => {
        const villageName = e.target.options[e.target.selectedIndex].text;
        setData("kelurahan", villageName);
    };

    // Fungsi untuk upload file otomatis
    const handleFileUpload = async (fieldName, file) => {
        if (!file) return;

        // Validasi file
        if (file.type !== "application/pdf") {
            toast.error(`File ${fieldName} harus dalam format PDF`);
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            // 2MB
            toast.error(`File ${fieldName} terlalu besar. Maksimal 2MB`);
            return;
        }

        setUploadingFiles((prev) => ({ ...prev, [fieldName]: true }));

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("field_name", fieldName);
            formData.append("user_login", user.name);

            const response = await axios.post(
                "/api/upload-registration-file",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Simpan path file ke form data
            setData(fieldName, response.data.file_path);
            toast.success(`File ${fieldName} berhasil diupload`);
        } catch (error) {
            console.error(`Error uploading ${fieldName}:`, error);
            toast.error(`Gagal upload file ${fieldName}`);
        } finally {
            setUploadingFiles((prev) => ({ ...prev, [fieldName]: false }));
        }
    };

    // Handler untuk perubahan file input
    const handleFileChange = (fieldName) => async (e) => {
        const file = e.target.files[0];

        e.target.value = null;
        if (file) {
            await handleFileUpload(fieldName, file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi file sudah diupload
        const requiredFiles = [
            "business_proposal",
            "mustahik_certificate",
            "pesantren_certificate",
            "sktm_certificate",
        ];

        const missingFiles = requiredFiles.filter(
            (fileField) => !data[fileField]
        );

        if (missingFiles.length > 0) {
            toast.error("Semua file wajib diupload", {
                description: "Harap upload semua file yang diperlukan",
            });
            return;
        }

        post(route("user.registrations.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Pendaftaran ${competition.name}`} />

            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-8 text-center">
                                <h1 className="text-2xl font-bold mb-2 text-[#4CAF50]">
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
                                        Kategori Klaster{" "}
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
                                                ? "border-red-500 border-2"
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
                                                        ? "border-red-500 border-2"
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
                                                        ? "border-red-500 border-2"
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

                                        {/* KK Number */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Nomor Kartu Keluarga{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                name="number_kk"
                                                value={data.number_kk}
                                                onChange={(e) =>
                                                    setData(
                                                        "number_kk",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-1 block w-full rounded-md border ${
                                                    errors.number_kk
                                                        ? "border-red-500 border-2"
                                                        : "border-gray-300"
                                                } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                                placeholder="Contoh: 1234567890123456"
                                                required
                                            />
                                            {errors.number_kk && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.number_kk}
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
                                                        ? "border-red-500 border-2"
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
                                                type="number"
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
                                                        ? "border-red-500 border-2"
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
                                        placeholder="Contoh : Jl.Rusa 1"
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        rows={3}
                                        className={`mt-1 block w-full rounded-md border ${
                                            errors.address
                                                ? "border-red-500 border-2"
                                                : "border-gray-300"
                                        } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                        required
                                    ></textarea>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Isi alamat{" "}
                                        <span className="font-bold">tanpa</span>{" "}
                                        menyertakan RT/RW dan kode pos
                                    </p>
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* Wilayah */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Provinsi */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Provinsi{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            onChange={(e) => {
                                                e.persist();
                                                handleProvinceChange(e);
                                            }}
                                            disabled={loading.provinces}
                                            className={`mt-1 block w-full rounded-md border ${
                                                errors.province
                                                    ? "border-red-500 border-2"
                                                    : "border-gray-300"
                                            } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50 ${
                                                loading.provinces
                                                    ? "opacity-75 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            required
                                        >
                                            <option value="">
                                                -- Pilih Provinsi --
                                            </option>
                                            {loading.provinces ? (
                                                <option value="" disabled>
                                                    Memuat provinsi...
                                                </option>
                                            ) : (
                                                provinces.map((province) => (
                                                    <option
                                                        key={province.id}
                                                        value={province.id}
                                                    >
                                                        {province.name}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                        {errors.province && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.province}
                                            </p>
                                        )}
                                    </div>

                                    {/* Kabupaten/Kota */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Kabupaten/Kota{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            onChange={(e) => {
                                                e.persist();
                                                handleRegencyChange(e);
                                            }}
                                            disabled={
                                                !data.province ||
                                                loading.regencies
                                            }
                                            className={`mt-1 block w-full rounded-md border ${
                                                errors.kabupaten
                                                    ? "border-red-500 border-2"
                                                    : "border-gray-300"
                                            } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50 ${
                                                !data.province ||
                                                loading.regencies
                                                    ? "bg-gray-100 opacity-75 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            required
                                        >
                                            <option value="">
                                                -- Pilih Kabupaten/Kota --
                                            </option>
                                            {loading.regencies ? (
                                                <option value="" disabled>
                                                    Memuat kabupaten...
                                                </option>
                                            ) : (
                                                regencies.map((regency) => (
                                                    <option
                                                        key={regency.id}
                                                        value={regency.id}
                                                    >
                                                        {regency.name}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                        {errors.kabupaten && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.kabupaten}
                                            </p>
                                        )}
                                    </div>

                                    {/* Kecamatan */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Kecamatan{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            onChange={(e) => {
                                                e.persist();
                                                handleDistrictChange(e);
                                            }}
                                            disabled={
                                                !data.kabupaten ||
                                                loading.districts
                                            }
                                            className={`mt-1 block w-full rounded-md border ${
                                                errors.kecamatan
                                                    ? "border-red-500 border-2"
                                                    : "border-gray-300"
                                            } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50 ${
                                                !data.kabupaten ||
                                                loading.districts
                                                    ? "bg-gray-100 opacity-75 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            required
                                        >
                                            <option value="">
                                                -- Pilih Kecamatan --
                                            </option>
                                            {loading.districts ? (
                                                <option value="" disabled>
                                                    Memuat kecamatan...
                                                </option>
                                            ) : (
                                                districts.map((district) => (
                                                    <option
                                                        key={district.id}
                                                        value={district.id}
                                                    >
                                                        {district.name}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                        {errors.kecamatan && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.kecamatan}
                                            </p>
                                        )}
                                    </div>

                                    {/* Kelurahan/Desa */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Kelurahan/Desa{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            onChange={(e) => {
                                                e.persist();
                                                handleVillageChange(e);
                                            }}
                                            disabled={
                                                !data.kecamatan ||
                                                loading.villages
                                            }
                                            className={`mt-1 block w-full rounded-md border ${
                                                errors.kelurahan
                                                    ? "border-red-500 border-2"
                                                    : "border-gray-300"
                                            } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50 ${
                                                !data.kecamatan ||
                                                loading.villages
                                                    ? "bg-gray-100 opacity-75 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            required
                                        >
                                            <option value="">
                                                -- Pilih Kelurahan/Desa --
                                            </option>
                                            {loading.villages ? (
                                                <option value="" disabled>
                                                    Memuat kelurahan...
                                                </option>
                                            ) : (
                                                villages.map((village) => (
                                                    <option
                                                        key={village.id}
                                                        value={village.id}
                                                    >
                                                        {village.name}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                        {errors.kelurahan && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.kelurahan}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Pesantren Information */}
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
                                                        ? "border-red-500 border-2"
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
                                                        ? "border-red-500 border-2"
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
                                                ? "border-red-500 border-2"
                                                : "border-gray-300"
                                        } shadow-sm focus:border-[#4CAF50] focus:ring focus:ring-[#4CAF50] focus:ring-opacity-50`}
                                        placeholder="Tulis motivasi Anda (maks. 250 karakter). Contoh: Saya tertarik ikut karena ingin belajar hal baru. (59 karakter)"
                                        required
                                    ></textarea>
                                    {errors.motivation && (
                                        <p className="mt-1 text-sm text-red-600">
                                            Karakter Terlalu Panjang Harap
                                            Persingkat Menjadi 250 Karakter
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
                                        dalam format PDF{" "}
                                        <span className="text-green-600 font-semibold">
                                            (maksimal 2MB per file)
                                        </span>
                                    </p>

                                    <div className="mb-6">
                                        <p className="text-sm text-gray-500 mb-2">
                                            Download template dokumen:{" "}
                                            <a
                                                href="/files/Berkas-Santripreuner-BAZNAS-2025.zip"
                                                download
                                                className="text-green-600 hover:text-green-800 ml-1 underline"
                                            >
                                                Klik di sini
                                            </a>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Jika perlu perkecil ukuran PDF:{" "}
                                            <a
                                                href="https://www.ilovepdf.com/compress_pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-800 ml-1 underline"
                                            >
                                                Klik di sini
                                            </a>
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Business Proposal File */}
                                        <FileUploadField
                                            label="Proposal Bisnis *"
                                            fieldName="business_proposal"
                                            value={data.business_proposal}
                                            onChange={handleFileChange}
                                            uploading={
                                                uploadingFiles.business_proposal
                                            }
                                            error={errors.business_proposal}
                                        />

                                        {/* Mustahik Certificate File */}
                                        <FileUploadField
                                            label="Dokumen Self Assesment Mustahik *"
                                            fieldName="mustahik_certificate"
                                            value={data.mustahik_certificate}
                                            onChange={handleFileChange}
                                            uploading={
                                                uploadingFiles.mustahik_certificate
                                            }
                                            error={errors.mustahik_certificate}
                                        />

                                        {/* SKTM File */}
                                        <FileUploadField
                                            label="Surat Keterangan Tidak Mampu (SKTM) dari Kelurahan/Desa/DKM Masjid *"
                                            fieldName="sktm_certificate"
                                            value={data.sktm_certificate}
                                            onChange={handleFileChange}
                                            uploading={
                                                uploadingFiles.sktm_certificate
                                            }
                                            error={errors.sktm_certificate}
                                        />

                                        {/* Pesantren Certificate File */}
                                        <FileUploadField
                                            label="Ijazah Pondok Pesantren / Surat Keterangan Kesantrian dari Pondok Pesantren *"
                                            fieldName="pesantren_certificate"
                                            value={data.pesantren_certificate}
                                            onChange={handleFileChange}
                                            uploading={
                                                uploadingFiles.pesantren_certificate
                                            }
                                            error={errors.pesantren_certificate}
                                        />
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="pt-6 border-t border-gray-200">
                                    <div className="space-y-3 mb-6">
                                        <p className="text-sm text-red-700 font-semibold">
                                            * Peserta hanya dapat mendaftar 1
                                            Klaster
                                        </p>
                                        <p className="text-sm text-red-700 font-semibold">
                                            * 1 Kartu Keluarga untuk 1 Peserta
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
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
                                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                "Daftar Sekarang"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Komponen terpisah untuk file upload
const FileUploadField = ({
    label,
    fieldName,
    value,
    onChange,
    uploading,
    error,
}) => {
    console.log(error);
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1 flex items-center">
                <label
                    className={`flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                        error
                            ? "border-red-300 border-2"
                            : value
                            ? "border-green-300 bg-green-50"
                            : "border-gray-300"
                    } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {uploading ? (
                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                    ) : value ? (
                        // Icon check ketika file berhasil terupload
                        <FileCheck className="w-8 h-8 text-green-500" />
                    ) : (
                        <Upload className="w-8 h-8 text-gray-400" />
                    )}
                    <span className="mt-2 text-sm text-gray-600 text-center">
                        {uploading
                            ? "Mengupload..."
                            : value
                            ? `File Terupload \n ${value.split("/").pop()}`
                            : "Pilih File"}
                    </span>
                    <input
                        type="file"
                        name={fieldName}
                        onChange={onChange(fieldName)}
                        className="hidden"
                        accept=".pdf"
                        disabled={uploading}
                    />
                </label>
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error.includes("Terlalu Besar")
                        ? "File terlalu besar, harap perkecil ukuran file (maks. 2MB)"
                        : error}
                </p>
            )}
        </div>
    );
};

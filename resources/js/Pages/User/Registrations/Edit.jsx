import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { debounce } from "@/Utils/debounce";
import { toast } from "sonner";

export default function UserRegistrationEdit({
    registration,
    auth,
    categories,
    errors,
}) {
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
    const [error, setError] = useState({
        provinces: null,
        regencies: null,
        districts: null,
        villages: null,
    });
    const { data, setData, post, processing, reset, progress } = useForm({
        category_id: registration.category_id || "",
        place_of_birth: registration.place_of_birth || "",
        date_of_birth: registration.date_of_birth || "",
        gender: registration.gender || "",
        address: registration.address || "",
        province: registration.province || "",
        kabupaten: registration.kabupaten || "",
        kecamatan: registration.kecamatan || "",
        kelurahan: registration.kelurahan || "",
        boarding_school_name: registration.boarding_school_name || "",
        motivation: registration.motivation || "",
        estimated_monthly_income: registration.estimated_monthly_income || "",
        number_wa: registration.number_wa || "",
        business_proposal_file: null,
        mustahik_certificate_file: null,
        pesantren_certificate_file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const formData = new FormData();

        // Append all text data
        formData.append("category_id", data.category_id);
        formData.append("place_of_birth", data.place_of_birth);
        formData.append("date_of_birth", data.date_of_birth);
        formData.append("gender", data.gender);
        formData.append("address", data.address);
        formData.append("boarding_school_name", data.boarding_school_name);
        formData.append("motivation", data.motivation);
        formData.append("province", data.province);
        formData.append("kabupaten", data.kabupaten);
        formData.append("kecamatan", data.kecamatan);
        formData.append("kelurahan", data.kelurahan);
        formData.append(
            "estimated_monthly_income",
            data.estimated_monthly_income
        );
        formData.append("number_wa", data.number_wa);

        // Only append files if they exist
        if (data.business_proposal_file) {
            formData.append(
                "business_proposal_file",
                data.business_proposal_file
            );
        }
        if (data.mustahik_certificate_file) {
            formData.append(
                "mustahik_certificate_file",
                data.mustahik_certificate_file
            );
        }
        if (data.pesantren_certificate_file) {
            formData.append(
                "pesantren_certificate_file",
                data.pesantren_certificate_file
            );
        }

        // Use POST with _method=PATCH for FormData
        router.post(
            `/user/my-registrations/${registration.id}`,
            {
                _method: "PATCH",
                ...Object.fromEntries(formData),
            },
            {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    reset(
                        "business_proposal_file",
                        "mustahik_certificate_file",
                        "pesantren_certificate_file"
                    );
                },
            }
        );
    };

    const handleFileChange = (fieldName) => (e) => {
        setData(fieldName, e.target.files[0]);
    };

    // Load initial data
    useEffect(() => {
        const fetchProvinces = async () => {
            setLoading((prev) => ({ ...prev, provinces: true }));
            setError((prev) => ({ ...prev, provinces: null }));
            try {
                const response = await axios.get("/api/wilayah/provinces");
                setProvinces(response.data);

                // Jika ada data provinsi yang sudah dipilih, load regencies
                if (registration.province) {
                    const selectedProvince = response.data.find(
                        (p) => p.name === registration.province
                    );
                    if (selectedProvince) {
                        fetchRegencies(selectedProvince.id);
                    }
                }
            } catch (err) {
                console.error("Error fetching provinces:", err);
                setError((prev) => ({
                    ...prev,
                    provinces: "Gagal memuat data provinsi",
                }));
                toast.error("Gagal memuat data provinsi");
            } finally {
                setLoading((prev) => ({ ...prev, provinces: false }));
            }
        };
        fetchProvinces();
    }, []);

    const fetchRegencies = async (provinceId) => {
        setLoading((prev) => ({ ...prev, regencies: true }));
        setError((prev) => ({ ...prev, regencies: null }));
        try {
            const response = await axios.get(
                `/api/wilayah/regencies/${provinceId}`
            );
            setRegencies(response.data);

            // Jika ada data kabupaten yang sudah dipilih, load districts
            if (registration.kabupaten) {
                const selectedRegency = response.data.find(
                    (r) => r.name === registration.kabupaten
                );
                if (selectedRegency) {
                    fetchDistricts(selectedRegency.id);
                }
            }
        } catch (err) {
            console.error("Error fetching regencies:", err);
            setError((prev) => ({
                ...prev,
                regencies: "Gagal memuat data kabupaten",
            }));
            toast.error("Gagal memuat data kabupaten");
        } finally {
            setLoading((prev) => ({ ...prev, regencies: false }));
        }
    };

    // Fungsi untuk fetch districts
    const fetchDistricts = async (regencyId) => {
        setLoading((prev) => ({ ...prev, districts: true }));
        setError((prev) => ({ ...prev, districts: null }));
        try {
            const response = await axios.get(
                `/api/wilayah/districts/${regencyId}`
            );
            setDistricts(response.data);

            // Jika ada data kecamatan yang sudah dipilih, load villages
            if (registration.kecamatan) {
                const selectedDistrict = response.data.find(
                    (d) => d.name === registration.kecamatan
                );
                if (selectedDistrict) {
                    fetchVillages(selectedDistrict.id);
                }
            }
        } catch (err) {
            console.error("Error fetching districts:", err);
            setError((prev) => ({
                ...prev,
                districts: "Gagal memuat data kecamatan",
            }));
            toast.error("Gagal memuat data kecamatan");
        } finally {
            setLoading((prev) => ({ ...prev, districts: false }));
        }
    };

    // Fungsi untuk fetch villages
    const fetchVillages = async (districtId) => {
        setLoading((prev) => ({ ...prev, villages: true }));
        setError((prev) => ({ ...prev, villages: null }));
        try {
            const response = await axios.get(
                `/api/wilayah/villages/${districtId}`
            );
            setVillages(response.data);
        } catch (err) {
            console.error("Error fetching villages:", err);
            setError((prev) => ({
                ...prev,
                villages: "Gagal memuat data kelurahan",
            }));
            toast.error("Gagal memuat data kelurahan");
        } finally {
            setLoading((prev) => ({ ...prev, villages: false }));
        }
    };
    // Debounced province change handler
    const handleProvinceChange = debounce(async (e) => {
        const provinceId = e.target.value;
        const provinceName = e.target.options[e.target.selectedIndex].text;

        setData("province", provinceName);
        setData("kabupaten", "");
        setData("kecamatan", "");
        setData("kelurahan", "");

        if (provinceId) {
            await fetchRegencies(provinceId);
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
            await fetchDistricts(regencyId);
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
            await fetchVillages(districtId);
        }
    }, 300);

    // Handle perubahan kelurahan
    const handleVillageChange = (e) => {
        const villageName = e.target.options[e.target.selectedIndex].text;
        setData("kelurahan", villageName);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Pendaftaran ${registration.competition.name}`} />

            <div className=" bg-gray-50 min-h-screen">
                <div className="">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8">
                            <div className="mb-8 text-center">
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                    Edit Formulir Pendaftaran
                                </h1>
                                <p className="text-gray-600">
                                    Silakan perbarui data berikut sesuai
                                    kebutuhan
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                        placeholder="Contoh : Jl.Rusa 1"
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
                                                    ? "border-red-300"
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
                                            ) : error.provinces ? (
                                                <option
                                                    value=""
                                                    disabled
                                                    className="text-red-500"
                                                >
                                                    {error.provinces}
                                                </option>
                                            ) : (
                                                provinces.map((province) => (
                                                    <option
                                                        key={province.id}
                                                        value={province.id}
                                                        selected={
                                                            province.name ===
                                                            data.province
                                                        }
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
                                                    ? "border-red-300"
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
                                            ) : error.regencies ? (
                                                <option
                                                    value=""
                                                    disabled
                                                    className="text-red-500"
                                                >
                                                    {error.regencies}
                                                </option>
                                            ) : (
                                                regencies.map((regency) => (
                                                    <option
                                                        key={regency.id}
                                                        value={regency.id}
                                                        selected={
                                                            regency.name ===
                                                            data.kabupaten
                                                        }
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
                                                    ? "border-red-300"
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
                                            ) : error.districts ? (
                                                <option
                                                    value=""
                                                    disabled
                                                    className="text-red-500"
                                                >
                                                    {error.districts}
                                                </option>
                                            ) : (
                                                districts.map((district) => (
                                                    <option
                                                        key={district.id}
                                                        value={district.id}
                                                        selected={
                                                            district.name ===
                                                            data.kecamatan
                                                        }
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
                                                    ? "border-red-300"
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
                                            ) : error.villages ? (
                                                <option
                                                    value=""
                                                    disabled
                                                    className="text-red-500"
                                                >
                                                    {error.villages}
                                                </option>
                                            ) : (
                                                villages.map((village) => (
                                                    <option
                                                        key={village.id}
                                                        value={village.id}
                                                        selected={
                                                            village.name ===
                                                            data.kelurahan
                                                        }
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
                                        Silakan upload dokumen baru jika ingin
                                        mengubah (format PDF, maksimal 2MB per
                                        file)
                                    </p>

                                    <div className="space-y-6">
                                        {/* Business Proposal File */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Proposal Bisnis
                                            </label>
                                            <p className="text-sm text-[#4CAF50] mb-2">
                                                File saat ini:{" "}
                                                <a
                                                    href={
                                                        registration.business_proposal_file_url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    Lihat Dokumen
                                                </a>
                                            </p>
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
                                                            : "Pilih File Baru (Opsional)"}
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
                                            {progress && (
                                                <progress
                                                    value={progress.percentage}
                                                    max="100"
                                                    className="w-full mt-2 h-1 rounded bg-gray-200 [&::-webkit-progress-bar]:rounded [&::-webkit-progress-value]:rounded [&::-webkit-progress-value]:bg-[#4CAF50]"
                                                >
                                                    {progress.percentage}%
                                                </progress>
                                            )}
                                        </div>

                                        {/* Mustahik Certificate File */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Sertifikat Mustahik
                                            </label>
                                            <p className="text-sm text-[#4CAF50] mb-2">
                                                File saat ini:{" "}
                                                <a
                                                    href={
                                                        registration.mustahik_certificate_file_url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    Lihat Dokumen
                                                </a>
                                            </p>
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
                                                            : "Pilih File Baru (Opsional)"}
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
                                                Sertifikat Pesantren
                                            </label>
                                            <p className="text-sm text-[#4CAF50] mb-2">
                                                File saat ini:{" "}
                                                <a
                                                    href={
                                                        registration.pesantren_certificate_file_url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    Lihat Dokumen
                                                </a>
                                            </p>
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
                                                            : "Pilih File Baru (Opsional)"}
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
                                <div className="flex justify-end pt-6 border-t border-gray-200 space-x-4">
                                    <Link
                                        href={route("user.registrations.index")}
                                        className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] transition-colors duration-200"
                                    >
                                        Batal
                                    </Link>
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
                                            "Simpan Perubahan"
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

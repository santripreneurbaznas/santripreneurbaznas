import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Head, Link, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import {
    User,
    Mail,
    Phone,
    IdCard,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    X,
    Loader2,
    Shield,
    MessageCircle,
} from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        nik: "",
        no_wa: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
        useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nikError, setNikError] = useState("");

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    // Fungsi untuk memformat nomor WhatsApp
    const formatPhoneNumber = (value) => {
        let cleaned = value.replace(/\D/g, "");

        if (cleaned.startsWith("0")) {
            cleaned = cleaned.substring(1);
        }

        if (cleaned.startsWith("62")) {
            cleaned = "62" + cleaned.substring(2).replace(/^62+/, "");
        }

        if (cleaned.length > 15) {
            cleaned = cleaned.substring(0, 15);
        }

        return cleaned;
    };

    // Validasi NIK
    const validateNik = (nik) => {
        if (!nik) return "";

        const nikString = nik.toString();
        if (nikString.length !== 16) {
            return "NIK harus tepat 16 digit";
        }

        if (!/^\d+$/.test(nikString)) {
            return "NIK harus berupa angka";
        }

        return "";
    };

    const onHandleChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (name === "no_wa") {
            const formattedValue = formatPhoneNumber(value);
            setData(name, formattedValue);
        } else if (name === "nik") {
            // Hanya menerima input angka
            const numericValue = value.replace(/\D/g, "");
            setData(name, numericValue);

            // Validasi real-time untuk NIK
            const error = validateNik(numericValue);
            setNikError(error);
        } else {
            setData(name, type === "checkbox" ? checked : value);
        }
    };

    const handleWhatsAppBlur = (event) => {
        const value = event.target.value;
        if (value) {
            const formattedValue = formatPhoneNumber(value);
            setData("no_wa", formattedValue);
        }
    };

    // Validasi sebelum submit
    const validateForm = () => {
        // Validasi NIK
        const nikValidationError = validateNik(data.nik);
        if (nikValidationError) {
            setNikError(nikValidationError);
            toast.error("Validasi NIK gagal", {
                description: nikValidationError,
            });
            return false;
        }

        // Validasi field wajib
        if (
            !data.nik ||
            !data.no_wa ||
            !data.name ||
            !data.email ||
            !data.password
        ) {
            toast.error("Data belum lengkap", {
                description: "Harap isi semua field yang wajib diisi",
            });
            return false;
        }

        // Validasi konfirmasi password
        if (data.password !== data.password_confirmation) {
            toast.error("Password tidak cocok", {
                description: "Password dan konfirmasi password harus sama",
            });
            return false;
        }

        return true;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validasi form sebelum membuka modal
        if (!validateForm()) {
            return;
        }

        // Buka modal konfirmasi
        setIsConfirmationModalOpen(true);
    };

    const submitRegistration = () => {
        // Validasi sekali lagi sebelum submit
        if (!validateForm()) {
            setIsConfirmationModalOpen(false);
            return;
        }

        setIsConfirmationModalOpen(false);
        setIsSubmitting(true);

        const toastId = toast.loading("Membuat akun baru...");

        post(route("register"), {
            onFinish: () => {
                toast.dismiss(toastId);
                setIsSubmitting(false);
            },
            onSuccess: () => {
                toast.success("Pendaftaran berhasil!", {
                    id: toastId,
                    description: "Akun Anda telah berhasil dibuat",
                });
                closeConfirmationModal();
                reset();
            },
            onError: (errors) => {
                if (errors.email) {
                    toast.error("Email sudah digunakan", {
                        description: "Silakan gunakan email lain",
                        id: toastId,
                    });
                } else if (errors.password) {
                    toast.error("Password tidak valid", {
                        description: errors.password,
                        id: toastId,
                    });
                } else if (errors.no_wa) {
                    toast.error("Nomor WhatsApp tidak valid", {
                        description: errors.no_wa,
                        id: toastId,
                    });
                } else if (errors.nik) {
                    toast.error("Nomor KTP tidak valid", {
                        description: errors.nik,
                        id: toastId,
                    });
                } else {
                    toast.error("Pendaftaran gagal", {
                        description: "Terjadi kesalahan saat membuat akun",
                        id: toastId,
                    });
                }
            },
        });
    };

    const openConfirmationModal = () => {
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        if (!isSubmitting) {
            setIsConfirmationModalOpen(false);
        }
    };

    // Prevent modal close when clicking inside modal content
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] flex flex-col">
                {/* Floating decorative elements */}
                <div className="fixed top-20 left-10 w-40 h-40 bg-[#259148]/10 rounded-full filter blur-xl animate-float1 -z-10"></div>
                <div className="fixed bottom-20 right-10 w-40 h-40 bg-[#FFC107]/10 rounded-full filter blur-xl animate-float2 -z-10"></div>

                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md"
                    >
                        {/* Register Card */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Card Header */}
                            <div className="bg-[#259148] px-8 py-6 text-center">
                                <motion.div
                                    whileHover={{ rotate: 5 }}
                                    className="inline-block bg-white/20 p-3 rounded-full mb-4"
                                >
                                    <User className="w-8 h-8 text-white" />
                                </motion.div>
                                <h1 className="text-2xl font-bold text-white">
                                    Buat Akun Baru
                                </h1>
                                <p className="text-white/90 mt-2">
                                    Daftarkan diri Anda untuk memulai
                                </p>
                            </div>

                            {/* Card Body - FORM REGISTRASI */}
                            <div className="p-8">
                                {errors.email && (
                                    <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                                        <p>{errors.email}</p>
                                    </div>
                                )}

                                <form
                                    onSubmit={handleFormSubmit}
                                    className="space-y-6"
                                >
                                    {/* NIK Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="nik"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Nomor Kartu Tanda Penduduk (KTP){" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <IdCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <input
                                                type="text"
                                                id="nik"
                                                name="nik"
                                                value={data.nik}
                                                onChange={onHandleChange}
                                                maxLength={16}
                                                className={`block w-full px-4 py-3 rounded-lg border ${
                                                    errors.nik || nikError
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent"
                                                } transition-all pl-10`}
                                                placeholder="Nomor KTP Anda (16 digit)"
                                                required
                                                autoFocus
                                            />
                                        </div>
                                        {(errors.nik || nikError) && (
                                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {errors.nik || nikError}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-500">
                                            {data.nik
                                                ? `${data.nik.length}/16 digit`
                                                : "NIK harus tepat 16 digit angka"}
                                        </p>
                                    </div>

                                    {/* WA Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="no_wa"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Nomor Whatsapp{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <input
                                                type="tel"
                                                id="no_wa"
                                                name="no_wa"
                                                value={data.no_wa}
                                                onChange={onHandleChange}
                                                onBlur={handleWhatsAppBlur}
                                                className={`block w-full px-4 py-3 rounded-lg border ${
                                                    errors.no_wa
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent"
                                                } transition-all pl-10`}
                                                placeholder="Contoh: 8123456789"
                                                required
                                            />
                                        </div>
                                        {errors.no_wa && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.no_wa}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-500">
                                            Format: 8123456789 (tanpa 0 atau
                                            +62)
                                        </p>
                                    </div>

                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Nama Lengkap{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={onHandleChange}
                                                className={`block w-full px-4 py-3 rounded-lg border ${
                                                    errors.name
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent"
                                                } transition-all pl-10`}
                                                placeholder="Nama Anda"
                                                required
                                            />
                                        </div>
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Alamat Email{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                onChange={onHandleChange}
                                                className={`block w-full px-4 py-3 rounded-lg border ${
                                                    errors.email
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent"
                                                } transition-all pl-10`}
                                                placeholder="email@contoh.com"
                                                required
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="password"
                                                name="password"
                                                value={data.password}
                                                onChange={onHandleChange}
                                                className={`block w-full px-4 py-3 rounded-lg border ${
                                                    errors.password
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent"
                                                } transition-all pl-10 pr-10`}
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="password_confirmation"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Konfirmasi Password{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={onHandleChange}
                                                className={`block w-full px-4 py-3 rounded-lg border ${
                                                    errors.password_confirmation
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                        : "border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent"
                                                } transition-all pl-10 pr-10`}
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={
                                                    toggleConfirmPasswordVisibility
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password_confirmation && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.password_confirmation}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={`w-full px-6 py-3 bg-[#259148] hover:bg-[#1e7e34] text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center ${
                                                processing
                                                    ? "opacity-80 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                <>
                                                    Daftar
                                                    <CheckCircle2 className="w-5 h-5 ml-2" />
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                </form>

                                <div className="mt-6 text-center text-sm text-gray-600">
                                    <p>
                                        Sudah punya akun?{" "}
                                        <Link
                                            href={route("login")}
                                            className="text-[#259148] hover:underline font-medium"
                                        >
                                            Masuk disini
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 text-center text-sm text-gray-600">
                            <p className="mt-2">
                                © {new Date().getFullYear()} Santripreneur. All
                                rights reserved.
                            </p>
                        </div>
                    </motion.div>
                </main>

                {/* Modal Konfirmasi */}
                {isConfirmationModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col"
                            onClick={handleModalContentClick}
                        >
                            {/* Modal Header (Tetap tidak scroll) */}
                            <div className="bg-[#259148] px-6 py-4 text-white rounded-t-2xl flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Shield className="w-6 h-6 text-white" />
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                Konfirmasi Pendaftaran
                                            </h2>
                                            <p className="text-white/90 text-sm">
                                                Periksa kembali data Anda
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeConfirmationModal}
                                        disabled={isSubmitting}
                                        className="text-white/80 hover:text-white disabled:opacity-50 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body (Hanya bagian ini yang scroll) */}
                            <div className="p-6 overflow-y-auto flex-1">
                                {/* Data Konfirmasi */}
                                <div className="space-y-4 mb-6">
                                    <h3 className="font-semibold text-gray-800 mb-3">
                                        Data yang akan didaftarkan:
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-600 flex items-center">
                                                <IdCard className="w-4 h-4 mr-2" />
                                                Nomor KTP :
                                            </span>
                                            <span className="text-sm font-medium">
                                                {data.nik}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-600 flex items-center">
                                                <User className="w-4 h-4 mr-2" />
                                                Nama:
                                            </span>
                                            <span className="text-sm font-medium">
                                                {data.name}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-600 flex items-center">
                                                <Mail className="w-4 h-4 mr-2" />
                                                Email:
                                            </span>
                                            <span className="text-sm font-medium">
                                                {data.email}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-600 flex items-center">
                                                <Phone className="w-4 h-4 mr-2" />
                                                WhatsApp:
                                            </span>
                                            <span className="text-sm font-medium">
                                                0{data.no_wa}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pemberitahuan Penting */}
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                        <div className="text-sm text-amber-800">
                                            <p className="font-semibold">
                                                Penting: Pastikan Data Sudah
                                                Sesuai
                                            </p>
                                            <ul className="mt-2 space-y-1 list-disc list-inside">
                                                <li>
                                                    Cek kembali kesesuaian data
                                                    dengan KTP
                                                </li>
                                                <li>
                                                    Periksa Kembali Nomor
                                                    WhatsApp untuk mendapatkan
                                                    informasi update dari kami
                                                </li>
                                                <li>
                                                    Email akan digunakan untuk
                                                    login
                                                </li>
                                                <li>
                                                    Setelah proses pendaftaran
                                                    akun selesai, pastikan Anda
                                                    untuk mendaftarkan lomba
                                                </li>
                                                <li>
                                                    Data yang sudah terdaftar
                                                    tidak dapat diubah
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Informasi Login */}
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <div className="flex items-start space-x-3">
                                        <MessageCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <div className="text-sm text-green-800">
                                            <p className="font-semibold">
                                                Informasi Login:
                                            </p>
                                            <p className="mt-1">
                                                Anda dapat login menggunakan
                                                email{" "}
                                                <strong>{data.email}</strong>{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex space-x-3">
                                    <motion.button
                                        type="button"
                                        onClick={closeConfirmationModal}
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Periksa Kembali
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        onClick={submitRegistration}
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 px-4 py-3 bg-[#259148] hover:bg-[#1e7e34] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                                Mendaftarkan...
                                            </>
                                        ) : (
                                            <>Ya, Data Sudah Benar</>
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </>
    );
}

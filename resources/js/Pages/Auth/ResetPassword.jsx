import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const submit = (e) => {
        e.preventDefault();

        const toastId = toast.loading("Sedang mereset password...");

        post(route("password.store"), {
            onFinish: () => toast.dismiss(toastId),
            onSuccess: () => {
                toast.success("Password berhasil direset!", {
                    id: toastId,
                    description:
                        "Anda sekarang bisa login dengan password baru",
                });
            },
            onError: (errors) => {
                if (errors.password) {
                    toast.error("Password tidak valid", {
                        description: errors.password,
                        id: toastId,
                    });
                } else {
                    toast.error("Gagal mereset password", {
                        description: "Terjadi kesalahan saat mereset password",
                        id: toastId,
                    });
                }
            },
        });
    };

    return (
        <>
            <Head title="Reset Password" />
            <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] flex flex-col">
                {/* Floating decorative elements */}
                <div className="fixed top-20 left-10 w-40 h-40 bg-[#259148]/10 rounded-full filter blur-xl animate-float1"></div>
                <div className="fixed bottom-20 right-10 w-40 h-40 bg-[#FFC107]/10 rounded-full filter blur-xl animate-float2"></div>

                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md"
                    >
                        {/* Reset Password Card */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Card Header */}
                            <div className="bg-[#259148] px-8 py-6 text-center">
                                <motion.div
                                    whileHover={{ rotate: 5 }}
                                    className="inline-block bg-white/20 p-3 rounded-full mb-4"
                                >
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        ></path>
                                    </svg>
                                </motion.div>
                                <h1 className="text-2xl font-bold text-white">
                                    Reset Password
                                </h1>
                                <p className="text-white/90 mt-2">
                                    Buat password baru untuk akun Anda
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-8">
                                <form onSubmit={submit} className="space-y-6">
                                    {/* Email Input (hidden if email is pre-filled) */}
                                    {!email && (
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Alamat Email
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={data.email}
                                                    onChange={onHandleChange}
                                                    className={`block w-full px-4 py-3 rounded-lg border ${
                                                        errors.email
                                                            ? "border-red-500"
                                                            : "border-gray-300"
                                                    } focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all pl-10`}
                                                    placeholder="email@contoh.com"
                                                    required
                                                />
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password Baru
                                        </label>
                                        <div className="relative">
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
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all pl-10 pr-10`}
                                                placeholder="••••••••"
                                                required
                                                autoFocus={!email}
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            >
                                                {showPassword ? (
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                        ></path>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        ></path>
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        ></path>
                                                    </svg>
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
                                            Konfirmasi Password Baru
                                        </label>
                                        <div className="relative">
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
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all pl-10 pr-10`}
                                                placeholder="••••••••"
                                                required
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    ></path>
                                                </svg>
                                            </div>
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={
                                                    toggleConfirmPasswordVisibility
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                        ></path>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        ></path>
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        ></path>
                                                    </svg>
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
                                                <>
                                                    Reset Password
                                                    <svg
                                                        className="w-5 h-5 ml-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                        ></path>
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                </form>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 text-center text-sm text-gray-600">
                            <p>
                                © {new Date().getFullYear()} Santripreneur. All
                                rights reserved.
                            </p>
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Head, useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        const toastId = toast.loading("Mengirim link reset password...");

        post(route("password.email"), {
            onFinish: () => toast.dismiss(toastId),
            onSuccess: () => {
                toast.success("Link reset password telah dikirim!", {
                    id: toastId,
                    description: "Silakan periksa email Anda",
                });
            },
            onError: () => {
                toast.error("Gagal mengirim link reset password", {
                    id: toastId,
                    description:
                        errors.email || "Terjadi kesalahan saat mengirim email",
                });
            },
        });
    };

    return (
        <>
            <Head title="Lupa Password" />
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
                        {/* Forgot Password Card */}
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
                                    Lupa Password
                                </h1>
                                <p className="text-white/90 mt-2">
                                    Masukkan email untuk reset password
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-8">
                                <div className="mb-4 text-sm text-gray-600">
                                    Lupa password Anda? Tidak masalah. Beri tahu
                                    kami email Anda dan kami akan mengirimkan
                                    link reset password untuk memilih password
                                    baru.
                                </div>

                                {status && (
                                    <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-6">
                                    {/* Email Input */}
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
                                                autoFocus
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
                                                    Kirim Link Reset Password
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
                                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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

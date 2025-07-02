import React, { useState } from "react";
import { motion } from "framer-motion";
import { Head, usePage, router, Link } from "@inertiajs/react";
import { toast } from "sonner";

const LoginPage = () => {
    const { errors } = usePage().props;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.loading("Loading...");
        setIsLoading(true);

        router.post(
            route("login"),
            {
                email: formData.email,
                password: formData.password,
                remember: formData.remember,
            },
            {
                onFinish: () => {
                    toast.success("Login successful!");
                    toast.dismiss();
                    setIsLoading(false);
                }, // ResetIsLoading(false),
            },
            {
                onError: () => {
                    toast.error("Login failed!");
                    toast.dismiss();
                    setIsLoading(false);
                }, // ResetIsLoading(false),
            }
        );
    };

    return (
        <>
            <Head title="Log in" />
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
                        {/* Login Card */}
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
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        ></path>
                                    </svg>
                                </motion.div>
                                <h1 className="text-2xl font-bold text-white">
                                    Masuk ke Akun Anda
                                </h1>
                                <p className="text-white/90 mt-2">
                                    Silakan masuk untuk mengakses dashboard
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-8">
                                {errors.email && (
                                    <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                                        <p>{errors.email}</p>
                                    </div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
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
                                                value={formData.email}
                                                onChange={handleChange}
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
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`block w-full px-4 py-3 rounded-lg border ${
                                                    errors.password
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                } focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all pl-10`}
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
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>

                                    {/* Remember & Forgot */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember"
                                                name="remember"
                                                type="checkbox"
                                                checked={formData.remember}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-[#259148] focus:ring-[#259148] border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="remember"
                                                className="ml-2 block text-sm text-gray-700"
                                            >
                                                Ingat saya
                                            </label>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full px-6 py-3 bg-[#259148] hover:bg-[#1e7e34] text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center ${
                                                isLoading
                                                    ? "opacity-80 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            {isLoading ? (
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
                                                    Masuk
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
                                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                        ></path>
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    </motion.div>
                                </form>

                                <div>
                                    <div className="mt-6 text-center text-sm text-gray-600">
                                        <p>
                                            Belum punya akun?{" "}
                                            <Link
                                                href={route("register")}
                                                className="text-[#259148] hover:underline font-medium"
                                            >
                                                Daftar sekarang
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="mt-2 text-center text-sm text-gray-600">
                                        <p>
                                            Lupa Kata Sandi ?{" "}
                                            <Link
                                                href={route("password.request")}
                                                className="text-[#259148] hover:underline font-medium"
                                            >
                                                Reset Kata Sandi
                                            </Link>
                                        </p>
                                    </div>
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
            </div>
        </>
    );
};

export default LoginPage;

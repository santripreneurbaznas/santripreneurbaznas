import React, { useState } from "react";
import { motion } from "framer-motion";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        pesantren: "",
        program: "",
        motivation: "",
    });

    const programs = [
        "Pelatihan Kewirausahaan Dasar",
        "Santripreneur Digital",
        "Pendampingan Bisnis",
        "Santripreneur Expo",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#f7fdf8] to-[#e8f5e9] overflow-hidden">
            {/* Floating decorative elements */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-[#259148]/10 rounded-full filter blur-xl animate-float1"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#FFC107]/10 rounded-full filter blur-xl animate-float2"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-[#259148] bg-[#e8f5e9] rounded-full">
                        Bergabung Dengan Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Formulir{" "}
                        <span className="text-[#259148]">Pendaftaran</span>{" "}
                        Santripreneur
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Isi data diri Anda dengan benar untuk menjadi bagian
                        dari komunitas wirausaha santri terbaik
                    </p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Form Header */}
                    <div className="bg-[#259148] px-8 py-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                <svg
                                    className="w-6 h-6 text-white"
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
                            </div>
                            <h3 className="text-xl font-bold text-white">
                                Data Diri Peserta
                            </h3>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="p-8">
                        <form className="space-y-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Lengkap{" "}
                                    <span className="text-[#259148]">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all"
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email{" "}
                                        <span className="text-[#259148]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all"
                                        placeholder="email@contoh.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nomor HP{" "}
                                        <span className="text-[#259148]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all"
                                        placeholder="0812-3456-7890"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Pesantren & Program */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Asal Pesantren{" "}
                                        <span className="text-[#259148]">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="pesantren"
                                        value={formData.pesantren}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all"
                                        placeholder="Nama pesantren"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Program{" "}
                                        <span className="text-[#259148]">
                                            *
                                        </span>
                                    </label>
                                    <select
                                        name="program"
                                        value={formData.program}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all"
                                        required
                                    >
                                        <option value="">Pilih Program</option>
                                        {programs.map((program, index) => (
                                            <option key={index} value={program}>
                                                {program}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Motivation */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Motivasi Bergabung{" "}
                                    <span className="text-[#259148]">*</span>
                                </label>
                                <textarea
                                    name="motivation"
                                    value={formData.motivation}
                                    onChange={handleChange}
                                    rows="4"
                                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#259148] focus:border-transparent transition-all"
                                    placeholder="Ceritakan mengapa Anda ingin bergabung..."
                                    required
                                ></textarea>
                            </div>

                            {/* Terms & Submit */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className="focus:ring-[#259148] h-4 w-4 text-[#259148] border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-medium text-gray-700"
                                    >
                                        Saya menyetujui{" "}
                                        <a
                                            href="#"
                                            className="text-[#259148] hover:underline"
                                        >
                                            syarat dan ketentuan
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="pt-4"
                            >
                                <button
                                    type="submit"
                                    className="w-full px-6 py-4 bg-[#259148] hover:bg-[#1e7e34] text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center"
                                >
                                    Daftar Sekarang
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
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        ></path>
                                    </svg>
                                </button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-3xl mx-auto mt-8 text-center text-gray-600 text-sm"
                >
                    <p>
                        Butuh bantuan? Hubungi kami di{" "}
                        <a
                            href="mailto:info@santripreneur.id"
                            className="text-[#259148] font-medium"
                        >
                            info@santripreneur.id
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default RegistrationForm;

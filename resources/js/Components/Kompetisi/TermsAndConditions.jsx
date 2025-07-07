import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TermsAndConditions = () => {
    const [activeTab, setActiveTab] = useState("umum");

    const tabs = [
        { id: "umum", label: "Syarat Umum" },
        { id: "dokumen", label: "Dokumen" },
        { id: "teknis", label: "Teknis" },
    ];

    const requirements = {
        umum: [
            "Peserta adalah santri aktif atau alumni pondok pesantren di Indonesia",
            "Usia minimal 17 tahun dan maksimal 35 tahun pada saat pendaftaran",
            "Katagori Mustahik (pendapatan maksimal 4,8 juta) dan belum pernah mendapatkan bantuan dari kompetisi yang sama sebelumnya",
            "Santri tingkat akhir/pernah mengenyam pendidikan (lulusan) di Lembaga pondok pesantren",
            "Memiliki tanda status kesantrian dengan menunjukkan bukti Ijazah/Surat Rekomendasi Pesantren",
            "Memiliki usaha yang sedang dijalankan atau telah memiliki pengalaman dan kemampuan berwirausaha pada bidang yang ditentukan, dipersilahkan mendaftar",
            "Usaha masuk dalam kategori bidang pertanian secara luas (mencakup perikanan, peternakan, kehutanan maupun teknologi pertanian)",
        ],
        dokumen: [
            "Menunjukkan surat keterangan Tidak Mampu dari Kelurahan/Desa/DKM Masjid",
            "Memiliki KTP atau Kartu Keluarga",
            "Proposal usaha yang telah berjalan atau baru rencana",
            "Ijazah Formal/Surat Keterangan Santri dari Pondok Pesantren",
            "Foto usaha yang sedang dijalankan atau mockup usaha (bagi yang belum berjalan usahanya)",
            "Curiculum Vitae (CV) / Riwayat hidup Peserta ",
        ],
        teknis: [
            "Pendaftaran dilakukan secara online melalui google form",
            "Setiap Peserta hanya boleh mendaftar untuk satu kategori (klaster) kompetisi",
            "Bersedia mengikuti seluruh rangkaian kompetisi",
            "Keputusan juri bersifat mutlak dan tidak dapat diganggu gugat",
            "Pemenang wajib mengikuti program pendampingan pasca kompetisi",
        ],
    };

    return (
        <section
            id="terms-and-conditions"
            className="relative py-20 bg-white overflow-hidden"
        >
            {/* Enhanced floating decorative elements with your animations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="animate-float1 absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-[#259148]/10 backdrop-blur-sm"></div>
                <div className="animate-float2 absolute top-1/3 right-1/4 w-28 h-28 rounded-full bg-[#259148]/15 backdrop-blur-sm"></div>
                <div className="animate-float3 absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-[#259148]/10 backdrop-blur-sm"></div>
                <div className="animate-float4 absolute bottom-1/3 right-1/3 w-20 h-20 rounded-full bg-[#259148]/15 backdrop-blur-sm"></div>

                {/* Additional floating elements */}
                <div className="animate-float1 absolute top-1/5 right-1/5 w-16 h-16 rounded-lg bg-[#259148]/5 rotate-45 backdrop-blur-sm"></div>
                <div className="animate-float3 absolute bottom-1/5 left-1/5 w-20 h-20 rounded-lg bg-[#259148]/5 -rotate-12 backdrop-blur-sm"></div>
            </div>

            {/* Islamic pattern corner with animation */}
            <div className="absolute top-0 right-0 w-48 h-48 opacity-5 animate-float2">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#259148"
                        d="M20,20 L180,20 L180,180 L20,180 Z M40,40 L160,40 L160,160 L40,160 Z"
                        fillRule="evenodd"
                    />
                </svg>
            </div>

            {/* Animated floating circle behind main content */}
            <div className="animate-float4 absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#259148]/5 backdrop-blur-sm"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fadeIn">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span className="text-[#259148]">Syarat</span> dan
                        Ketentuan
                    </h2>
                    <div className="w-20 h-1 bg-[#259148] mx-auto mb-6"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Persyaratan yang harus dipenuhi untuk mengikuti Baznas
                        Santripreneur Competition 2025
                    </p>
                </div>

                {/* Tab Navigation with enhanced hover effects */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-100 rounded-xl p-1 shadow-inner">
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 relative overflow-hidden ${
                                    activeTab === tab.id
                                        ? "bg-[#259148] text-white shadow-md"
                                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.span
                                        className="absolute inset-0 bg-white/10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Tab Content with enhanced animations */}
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden border border-gray-100 relative"
                        >
                            {/* Animated background elements */}
                            <div className="animate-float1 absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#259148]/5 backdrop-blur-sm"></div>
                            <div className="animate-float3 absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-[#259148]/5 backdrop-blur-sm"></div>

                            <div className="p-8 md:p-10 relative z-10">
                                <h3 className="text-2xl font-bold text-[#259148] mb-6">
                                    {
                                        tabs.find((tab) => tab.id === activeTab)
                                            ?.label
                                    }
                                </h3>

                                <ul className="space-y-4">
                                    {requirements[activeTab].map(
                                        (item, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.05,
                                                }}
                                                className="flex items-start group"
                                                whileHover={{ x: 5 }}
                                            >
                                                <div className="flex-shrink-0 mt-1 mr-4">
                                                    <motion.div
                                                        className="w-6 h-6 rounded-full bg-[#259148]/10 flex items-center justify-center"
                                                        whileHover={{
                                                            scale: 1.2,
                                                        }}
                                                    >
                                                        <div className="w-3 h-3 rounded-full bg-[#259148]"></div>
                                                    </motion.div>
                                                </div>
                                                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                                                    {item}
                                                </span>
                                            </motion.li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <div className="bg-gray-100 px-8 py-4 border-t border-gray-200 relative z-10">
                                <div className="flex flex-col sm:flex-row  items-center">
                                    <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                                        * Semua persyaratan wajib dipenuhi
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Additional Info with enhanced animations */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn delay-200">
                    <motion.div
                        className="bg-[#f8fafc] p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                        whileHover={{ y: -5 }}
                    >
                        <div className="animate-float2 absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#259148]/5 backdrop-blur-sm"></div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center relative z-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#259148] mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Penting Diperhatikan
                        </h3>
                        <ul className="space-y-3 text-gray-600 relative z-10">
                            {[
                                "Pastikan dokumen yang diupload jelas dan terbaca",
                                "Proposal usaha maksimal 15 halaman",
                                "Pendaftaran tidak dipungut biaya apapun",
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <span className="text-[#259148] mr-2">
                                        •
                                    </span>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="bg-[#f8fafc] p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
                        whileHover={{ y: -5 }}
                    >
                        <div className="animate-float4 absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#259148]/5 backdrop-blur-sm"></div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center relative z-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-[#259148] mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            Timeline Pengumpulan
                        </h3>
                        <ul className="space-y-3 text-gray-600 relative z-10">
                            {[
                                "Pendaftaran: 8 - 31 Juli 2025",
                                "Pengumpulan dokumen lengkap: To Be Announced on August 2025",
                                "Pengumuman finalis: To Be Announced on August 20255",
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    <span className="text-[#259148] mr-2">
                                        •
                                    </span>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TermsAndConditions;

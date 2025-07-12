import React from "react";
import { motion } from "framer-motion";

const PrizesAndAwards = () => {
    const prizes = [
        {
            title: "Juara 1",
            amount: "Rp 20.000.000",
            description: "Program Pendampingan 6 Bulan",
            color: "from-yellow-400 to-yellow-300",
            icon: "🥇",
        },
        {
            title: "Juara 2",
            amount: "Rp 17.500.000",
            description: "Program Pendampingan 6 Bulan",
            color: "from-gray-300 to-gray-200",
            icon: "🥈",
        },
        {
            title: "Juara 3",
            amount: "Rp 15.000.000",
            description: "Program Pendampingan 6 Bulan",
            color: "from-amber-600 to-amber-500",
            icon: "🥉",
        },
    ];

    const specialAwards = [
        {
            title: "10 Finalis Terbaik",
            description: "Program Pendampingan 6 Bulan",
            prize: "Rp 10.000.000",
        },
        {
            title: "50 Finalis Terbaik",
            description: "Program Pendampingan 6 Bulan",
            prize: "Rp 6.000.000",
        },
        {
            title: "100 Finalis Terbaik",
            description: "Program Pendampingan 6 Bulan",
            prize: "Rp 2.750.000",
        },
    ];

    return (
        <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Enhanced floating decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="animate-float1 absolute top-20 left-10 w-24 h-24 rounded-full bg-[#259148]/10 backdrop-blur-sm"></div>
                <div className="animate-float2 absolute top-1/3 right-20 w-28 h-28 rounded-full bg-[#259148]/15 backdrop-blur-sm"></div>
                <div className="animate-float3 absolute bottom-20 left-1/4 w-32 h-32 rounded-full bg-[#259148]/10 backdrop-blur-sm"></div>
                <div className="animate-float4 absolute bottom-1/3 right-1/3 w-20 h-20 rounded-full bg-[#259148]/15 backdrop-blur-sm"></div>

                {/* Gold medal floating elements */}
                <div className="animate-float1 absolute top-1/5 right-1/5 w-16 h-16 text-4xl opacity-20">
                    🥇
                </div>
                <div className="animate-float3 absolute bottom-1/5 left-1/5 w-16 h-16 text-4xl opacity-20">
                    🏆
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fadeIn">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span className="text-[#259148]">Hadiah</span> dan
                        Penghargaan
                    </h2>
                    <div className="w-20 h-1 bg-[#259148] mx-auto mb-6"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Total hadiah lebih dari{" "}
                        <span className="font-bold text-[#259148]">
                            Rp 500.000.000
                        </span>{" "}
                        untuk pemenang kompetisi
                    </p>
                </div>

                {/* Main Prizes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {prizes.map((prize, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300 opacity-90"></div>

                            <div
                                className={`relative h-full bg-gradient-to-br ${prize.color} rounded-xl shadow-md overflow-hidden border border-white/20 group-hover:shadow-xl transition-all duration-300`}
                            >
                                <div className="p-6 text-center">
                                    <div className="text-5xl mb-4">
                                        {prize.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {prize.title}
                                    </h3>
                                    <div className="text-2xl font-extrabold text-white mb-4">
                                        {prize.amount}
                                    </div>
                                    <p className="text-white/90 text-sm">
                                        {prize.description}
                                    </p>
                                </div>

                                {/* Ribbon effect for top 3 */}
                                {index < 3 && (
                                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                                        <div
                                            className={`absolute top-0 right-0 w-24 h-24 ${
                                                index === 0
                                                    ? "bg-yellow-500"
                                                    : index === 1
                                                    ? "bg-gray-400"
                                                    : "bg-amber-600"
                                            } transform rotate-45 translate-x-12 -translate-y-2`}
                                        ></div>
                                        <div className="absolute top-2 right-2 text-white text-xs font-bold rotate-45">
                                            WINNER
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`absolute -z-10 top-4 left-4 w-full h-full rounded-xl ${prize.color
                                    .split(" ")[0]
                                    .replace(
                                        "from-",
                                        "bg-"
                                    )} opacity-20 group-hover:opacity-30 transition-all duration-300`}
                            ></div>
                        </motion.div>
                    ))}
                </div>

                {/* Special Awards */}
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        <span className="text-[#259148]">Penghargaan</span>{" "}
                        Khusus
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Penghargaan tambahan untuk kategori spesifik dengan
                        total hadiah Rp 25.000.000
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {specialAwards.map((award, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-white rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300 opacity-90"></div>

                            <div className="relative h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                                <div className="p-6">
                                    <div className="w-12 h-12 bg-[#259148]/10 rounded-full flex items-center justify-center text-[#259148] text-xl mb-4">
                                        {index === 0
                                            ? "🏆"
                                            : index === 1
                                            ? "🎖️"
                                            : "✨"}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {award.title}
                                    </h3>

                                    <div className="text-lg font-bold text-[#259148]">
                                        {award.prize}
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                                    <p className="text-gray-600 text-sm mb-4">
                                        {award.description}
                                    </p>
                                </div>
                            </div>

                            <div className="absolute -z-10 top-3 left-3 w-full h-full rounded-xl bg-[#259148]/10 group-hover:bg-[#259148]/15 transition-all duration-300"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    className="bg-gradient-to-r from-[#259148] to-[#1e7e3d] rounded-2xl p-8 md:p-10 shadow-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <div className="relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Fasilitas Tambahan untuk Semua Finalis
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                                {[
                                    "Pelatihan Kewirausahaan",
                                    "Mentoring Eksklusif",
                                    "Akses Jaringan Bisnis",
                                    "Publikasi Media",
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white text-sm font-medium"
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                            {/* <p className="text-white/90 text-sm mb-6">
                                * Seluruh hadiah akan dikenakan potongan zakat
                                sesuai peraturan yang berlaku
                            </p>
                            <button className="px-8 py-3 bg-white text-[#259148] font-semibold rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300">
                                Lihat Syarat Lengkap
                            </button> */}
                        </div>
                    </div>

                    {/* Floating elements */}
                    <div className="animate-float1 absolute top-10 left-10 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm"></div>
                    <div className="animate-float3 absolute bottom-10 right-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default PrizesAndAwards;

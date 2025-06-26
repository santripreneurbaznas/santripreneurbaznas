import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

const CompetitionCategories = () => {
    const categories = [
        {
            title: "Klaster Travel Haji Umrah",
            description:
                "Kompetisi bisnis travel untuk jasa haji dan umrah dengan inovasi pelayanan berbasis syariah",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            color: "bg-green-600",
        },
        {
            title: "Klaster Industri Kreatif",
            description:
                "Pengembangan produk kreatif bernuansa islami seperti fashion, kerajinan, dan konten digital",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                </svg>
            ),
            color: "bg-green-600",
        },
        {
            title: "Klaster Peternakan",
            description:
                "Inovasi bisnis peternakan halal dengan pendekatan modern dan berkelanjutan",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </svg>
            ),
            color: "bg-green-600",
        },
    ];

    return (
        <section className="relative py-20 bg-gray-50 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                <div className="animate-float1 absolute top-20 left-10 w-24 h-24 rounded-full bg-[#259148]/20"></div>
                <div className="animate-float2 absolute top-1/3 right-20 w-32 h-32 rounded-full bg-[#259148]/15"></div>
                <div className="animate-float3 absolute bottom-20 left-1/4 w-28 h-28 rounded-full bg-[#259148]/20"></div>
            </div>

            {/* Islamic pattern overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzI1OTE0OCIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fadeIn">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span className="text-[#259148]">Kategori</span> Lomba
                    </h2>
                    <div className="w-20 h-1 bg-[#259148] mx-auto mb-6"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Pilih kategori yang sesuai dengan minat dan bakat
                        wirausaha Anda
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-white rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300"></div>

                            <div className="relative h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                                <div
                                    className={`${category.color} h-2 w-full`}
                                ></div>

                                <div className="p-8">
                                    <div
                                        className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 mx-auto`}
                                    >
                                        {category.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                                        {category.title}
                                    </h3>

                                    <p className="text-gray-600 text-center mb-6">
                                        {category.description}
                                    </p>

                                    <div className="flex justify-center">
                                        <Link
                                            href="/klaster"
                                            className="px-6 py-2 bg-transparent border border-[#259148] text-[#259148] font-medium rounded-lg hover:bg-[#259148] hover:text-white transition-all duration-300"
                                        >
                                            Daftar Sekarang
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`absolute -z-10 top-4 left-4 w-full h-full rounded-xl ${category.color} opacity-20 group-hover:opacity-30 transition-all duration-300`}
                            ></div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-20 bg-gradient-to-r from-[#259148] to-[#1a6e38] rounded-2xl p-8 md:p-12 shadow-xl animate-fadeIn delay-300">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Setiap Kategori Akan Dinilai Oleh Para Ahlinya
                        </h3>
                        <p className="text-white/90 ">
                            Kami menghadirkan juri-juri profesional dari
                            masing-masing bidang untuk memastikan penilaian yang
                            kompeten dan berkeadilan.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompetitionCategories;

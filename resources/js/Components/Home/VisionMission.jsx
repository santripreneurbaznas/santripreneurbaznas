import React from "react";

const VisionMission = () => {
    return (
        <section
            id="vision-mission"
            className="relative py-16 md:py-24 bg-gray-50 overflow-hidden"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#259148] rounded-full mix-blend-multiply filter blur-xl animate-float1"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#259148] rounded-full mix-blend-multiply filter blur-xl animate-float2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fadeIn">
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-[#259148] bg-green-50 rounded-full">
                        Arah & Tujuan
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Membangun{" "}
                        <span className="text-[#259148]">Ekosistem</span>{" "}
                        Wirausaha Santri
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Visi dan misi kami menjadi kompas dalam membangun
                        generasi santri yang mandiri secara ekonomi tanpa
                        meninggalkan nilai-nilai pesantren.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Vision Card */}
                    <div className="lg:w-1/2 animate-fadeIn delay-100">
                        <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 transform transition-all hover:scale-[1.02]">
                            <div className="bg-[#259148] px-6 py-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">
                                        Visi Kami
                                    </h3>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-2xl font-medium text-gray-800 mb-6 leading-relaxed">
                                    "Menjadi wadah utama pengembangan
                                    kewirausahaan santri yang mengintegrasikan
                                    nilai-nilai pesantren dengan inovasi bisnis
                                    modern."
                                </p>
                                <div className="w-20 h-1 bg-[#259148] mb-6"></div>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-5 h-5 rounded-full bg-[#259148] bg-opacity-20 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-[#259148]"></div>
                                            </div>
                                        </div>
                                        <p className="ml-3 text-gray-600">
                                            Menciptakan 10.000 santripreneur
                                            mandiri di seluruh Indonesia
                                        </p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-5 h-5 rounded-full bg-[#259148] bg-opacity-20 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-[#259148]"></div>
                                            </div>
                                        </div>
                                        <p className="ml-3 text-gray-600">
                                            Membangun ekosistem bisnis berbasis
                                            nilai-nilai Islam
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission Card */}
                    <div className="lg:w-1/2 animate-fadeIn delay-200">
                        <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 transform transition-all hover:scale-[1.02]">
                            <div className="bg-[#259148] px-6 py-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">
                                        Misi Kami
                                    </h3>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="space-y-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#259148] font-bold mr-4">
                                                1
                                            </div>
                                        </div>
                                        <p className="text-gray-700">
                                            Menyelenggarakan pelatihan
                                            kewirausahaan berbasis nilai-nilai
                                            pesantren secara berkala
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#259148] font-bold mr-4">
                                                2
                                            </div>
                                        </div>
                                        <p className="text-gray-700">
                                            Membangun jaringan pemasaran
                                            produk-produk usaha santri secara
                                            digital
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#259148] font-bold mr-4">
                                                3
                                            </div>
                                        </div>
                                        <p className="text-gray-700">
                                            Menyediakan akses pendanaan dan
                                            modal usaha halal bagi santripreneur
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-[#259148] font-bold mr-4">
                                                4
                                            </div>
                                        </div>
                                        <p className="text-gray-700">
                                            Menjalin kemitraan strategis dengan
                                            berbagai pihak untuk pengembangan
                                            usaha santri
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute bottom-20 left-10 w-12 h-12 bg-[#259148] rounded-full opacity-10 animate-float3"></div>
                <div className="absolute top-1/4 right-16 w-8 h-8 bg-[#259148] rounded-full opacity-20 animate-float4"></div>
            </div>
        </section>
    );
};

export default VisionMission;

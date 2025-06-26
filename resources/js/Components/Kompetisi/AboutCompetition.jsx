import { Link } from "@inertiajs/react";
import React from "react";

const AboutCompetition = () => {
    return (
        <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="animate-float1 absolute top-20 left-10 w-16 h-16 rounded-full bg-[#259148]/10 backdrop-blur-sm"></div>
                <div className="animate-float2 absolute top-1/3 right-20 w-24 h-24 rounded-full bg-[#259148]/15 backdrop-blur-sm"></div>
                <div className="animate-float3 absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-[#259148]/10 backdrop-blur-sm"></div>
                <div className="animate-float4 absolute bottom-1/3 right-10 w-16 h-16 rounded-full bg-[#259148]/15 backdrop-blur-sm"></div>
            </div>

            {/* Islamic pattern corner accents */}
            <div className="absolute top-0 left-0 w-40 h-40 opacity-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#259148"
                        d="M20,20 L180,20 L180,180 L20,180 Z M40,40 L160,40 L160,160 L40,160 Z"
                        fillRule="evenodd"
                    />
                </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10 rotate-180">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="#259148"
                        d="M20,20 L180,20 L180,180 L20,180 Z M40,40 L160,40 L160,160 L40,160 Z"
                        fillRule="evenodd"
                    />
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fadeIn">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span className="text-[#259148]">Tentang</span>{" "}
                        Kompetisi
                    </h2>
                    <div className="w-20 h-1 bg-[#259148] mx-auto mb-6"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Mengenal lebih dalam tentang BAZNAS Santripreneur
                        Competition 2025
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image with floating animation */}
                    <div className="relative animate-fadeIn delay-100">
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/images/Hero.JPG"
                                alt="Santri Berwirausaha"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400/20 rounded-xl animate-float2"></div>
                        <div className="absolute -top-6 -left-6 w-28 h-28 bg-[#259148]/20 rounded-xl animate-float3"></div>
                    </div>

                    {/* Content */}
                    <div className="animate-fadeIn delay-200">
                        <div className="mb-8">
                            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                                Membangun{" "}
                                <span className="text-[#259148]">
                                    Ekosistem Wirausaha
                                </span>{" "}
                                Santri
                            </h3>
                            <p className="text-gray-600 mb-6">
                                BAZNAS Santripreneur Competition 2025 merupakan
                                ajang kompetisi wirausaha yang dirancang khusus
                                untuk santri dan atau alumni santri seluruh
                                Indonesia. Kompetisi ini bertujuan untuk
                                mengembangkan potensi kewirausahaan di kalangan
                                santri dengan pendekatan islami.
                            </p>
                            <p className="text-gray-600">
                                Dengan mengusung tema{" "}
                                <span className="font-semibold text-[#259148]">
                                    "Digitalisasi Wirausaha Santri Berbasis
                                    Syariah"
                                </span>
                                , kompetisi ini menjadi wadah bagi santri untuk
                                mengasah kreativitas dan inovasi dalam
                                berbisnis.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="text-3xl font-bold text-[#259148] mb-2">
                                    100+
                                </div>
                                <div className="text-gray-600">
                                    Peserta Tahun Lalu
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="text-3xl font-bold text-[#259148] mb-2">
                                    Rp500jt+
                                </div>
                                <div className="text-gray-600">
                                    Total Hadiah
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <Link
                            href="/kompetisi#terms-and-conditions"
                            className="px-8 py-3 bg-[#259148] hover:bg-[#1e7e3d] text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center w-fit"
                        >
                            <span>Pelajari Persyaratan</span>
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
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCompetition;

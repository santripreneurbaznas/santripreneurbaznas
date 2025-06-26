import { Link } from "@inertiajs/react";
import React from "react";

const AboutUs = () => {
    return (
        <section
            id="#tentang-kami"
            className="relative py-16 md:py-24 bg-white overflow-hidden"
        >
            {/* Floating decorative elements */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-green-100 rounded-full opacity-60 animate-float1"></div>
            <div className="absolute top-1/3 right-20 w-20 h-20 bg-[#259148] rounded-full opacity-20 animate-float2"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-50 rounded-full opacity-70 animate-float3"></div>
            <div className="absolute bottom-1/3 right-16 w-16 h-16 bg-[#259148] rounded-full opacity-30 animate-float4"></div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Text Content */}
                    <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12 relative z-10">
                        <div className="animate-fadeIn">
                            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-[#259148] bg-green-50 rounded-full">
                                Tentang Kami
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                                Santripreneur:{" "}
                                <span className="text-[#259148]">
                                    Menggabungkan
                                </span>{" "}
                                Keilmuan Santri dengan Jiwa Wirausaha
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Santripreneur BAZNAS lahir dari semangat untuk
                                membangun generasi santri yang tidak hanya
                                menguasai ilmu agama, tetapi juga memiliki
                                keterampilan wirausaha yang tangguh
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center animate-fadeIn delay-100">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#259148] flex items-center justify-center mr-4">
                                        <svg
                                            className="w-4 h-4 text-white"
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
                                    <p className="text-gray-700">
                                        Membangun jaringan wirausaha santri di
                                        seluruh Indonesia
                                    </p>
                                </div>

                                <div className="flex items-center animate-fadeIn delay-200">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#259148] flex items-center justify-center mr-4">
                                        <svg
                                            className="w-4 h-4 text-white"
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
                                    <p className="text-gray-700">
                                        Pelatihan wirausaha berbasis nilai-nilai
                                        pesantren
                                    </p>
                                </div>

                                <div className="flex items-center animate-fadeIn delay-300">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#259148] flex items-center justify-center mr-4">
                                        <svg
                                            className="w-4 h-4 text-white"
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
                                    <p className="text-gray-700">
                                        Pendampingan bisnis untuk produk-produk
                                        pesantren
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() =>
                                    (window.location.href = "#program")
                                }
                                className="px-6 py-3 bg-[#259148] hover:bg-green-700 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105"
                            >
                                Ekosistem Kami
                            </button>
                        </div>
                    </div>

                    {/* Image/Illustration */}
                    <div className="lg:w-1/2 relative animate-fadeIn">
                        <div className="relative bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100">
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                <img
                                    src="/images/about.JPG"
                                    alt="Santripreneur"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-white px-6 py-3 rounded-lg shadow-md border border-green-100">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-[#259148] flex items-center justify-center mr-3">
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
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">
                                            500+
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Anggota Aktif
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;

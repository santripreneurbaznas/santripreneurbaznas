import { Head } from "@inertiajs/react";
import React from "react";

const KlasterPage = () => {
    const klasterList = [
        {
            id: 1,
            title: "Klaster Travel Haji Umrah",
            description:
                "Kompetisi untuk usaha di bidang travel haji dan umrah dengan inovasi pelayanan terbaik",
            link: "https://forms.google.com/travel-haji-umrah",
            icon: "✈️",
        },
        {
            id: 2,
            title: "Klaster Industri Kreatif",
            description:
                "Wadah untuk ide-ide kreatif di bidang fashion, desain, kerajinan tangan dan produk kreatif lainnya",
            link: "https://forms.google.com/industri-kreatif",
            icon: "🎨",
        },
        {
            id: 3,
            title: "Klaster Peternakan",
            description:
                "Kompetisi bisnis peternakan modern dengan konsep berkelanjutan dan ramah lingkungan",
            link: "https://forms.google.com/peternakan",
            icon: "🐄",
        },
    ];

    return (
        <>
            <Head title="Klaster" />
            <div className="min-h-screen bg-gradient-to-b from-[#259148] to-green-800 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20 animate-float1"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20 animate-float2"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-8 h-8 bg-white rounded-full opacity-20 animate-float3"></div>
                <div className="absolute bottom-20 right-20 w-12 h-12 bg-white rounded-full opacity-30 animate-float4"></div>
                <div className="absolute top-1/3 right-16 w-6 h-6 bg-yellow-300 rounded-full opacity-70 animate-float2"></div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={`particle-${i}`}
                            className="absolute rounded-full bg-white"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 6 + 2}px`,
                                height: `${Math.random() * 6 + 2}px`,
                                opacity: Math.random() * 0.3 + 0.1,
                                animation: `float-up ${
                                    Math.random() * 8 + 4
                                }s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        ></div>
                    ))}
                </div>

                <div className="container mx-auto px-4 py-16 relative z-10">
                    {/* Header */}
                    <header className="text-center mb-12 animate-fadeIn">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            <span className="text-yellow-300">BAZNAS</span>{" "}
                            Santripreuner Kompetisi
                        </h1>
                        <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
                            Pilih klaster kompetisi yang sesuai dengan bidang
                            usaha Anda
                        </p>
                    </header>

                    {/* Klaster List */}
                    <div className="max-w-2xl mx-auto space-y-6">
                        {klasterList.map((klaster, index) => (
                            <a
                                key={klaster.id}
                                href={klaster.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 transition-all duration-300 transform hover:scale-105 hover:bg-opacity-20 glow-effect animate-fadeIn`}
                                style={{
                                    animationDelay: `${index * 100 + 200}ms`,
                                }}
                            >
                                <div className="flex items-start">
                                    <div className="text-3xl mr-4">
                                        {klaster.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-2">
                                            {klaster.title}
                                        </h2>
                                        <p className="text-white text-opacity-80">
                                            {klaster.description}
                                        </p>
                                        <div className="mt-4 inline-flex items-center text-yellow-300 font-medium">
                                            Daftar Sekarang
                                            <svg
                                                className="w-4 h-4 ml-2"
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
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 text-center text-white text-opacity-70 animate-fadeIn delay-500">
                        <p>Pendaftaran ditutup pada 30 Juni 2025</p>
                        <p className="mt-2 text-sm">
                            © 2025 BAZNAS Santri Preuner. All rights reserved.
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default KlasterPage;

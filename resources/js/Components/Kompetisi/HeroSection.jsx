import { Link } from "@inertiajs/react";
import React from "react";

const HeroSection = () => {
    const handleDownload = () => {
        // Ganti URL dengan path file ZIP Anda
        const fileUrl = "/files/Berkas-Santripreuner-BAZNAS-2025.zip";

        // Membuat elemen anchor sementara
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "Berkas-Santripreuner-BAZNAS-2025.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-[#259148] to-[#1a6e38] min-h-screen flex items-center justify-center">
            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="animate-float1 absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"></div>
                <div className="animate-float2 absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm"></div>
                <div className="animate-float3 absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm"></div>
                <div className="animate-float4 absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"></div>

                {/* Islamic pattern inspired elements */}
                <div className="absolute -left-20 -top-20 w-64 h-64 border-4 border-white/5 rounded-full animate-float2"></div>
                <div className="absolute -right-20 -bottom-20 w-72 h-72 border-4 border-white/5 rounded-full animate-float3"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeIn">
                    <span className="block">BAZNAS</span>
                    <span className="block text-yellow-300 mt-2">
                        Santripreneur
                    </span>
                    <span className="block mt-2">Competition 2025</span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 animate-fadeIn delay-100">
                    Wujudkan mimpi bisnis syariah bersama kompetisi wirausaha
                    santri terbesar di Indonesia
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn delay-200">
                    <Link
                        href="/login"
                        className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        Daftar Sekarang
                    </Link>
                    <button
                        onClick={handleDownload}
                        className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                        Download Berkas
                    </button>
                </div>
            </div>

            {/* Decorative elements at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/5 backdrop-blur-sm flex justify-center items-center">
                <div className="flex space-x-4">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="w-3 h-3 rounded-full bg-white/30 animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Islamic geometric pattern overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
        </div>
    );
};

export default HeroSection;

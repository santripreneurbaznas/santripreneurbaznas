import React from "react";
import { Head, Link, router } from "@inertiajs/react";

const ExpiredPage = () => {
    // Generate floating nature elements
    const floatingElements = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: Math.random() * 35 + 15,
        animation: `floatAnim${Math.floor(Math.random() * 4) + 1}`,
        opacity: Math.random() * 0.25 + 0.15,
        top: Math.random() * 100,
        left: Math.random() * 100,
        rotate: Math.random() * 360,
        color: `rgba(${Math.floor(Math.random() * 60 + 80)}, ${Math.floor(
            Math.random() * 130 + 120
        )}, ${Math.floor(Math.random() * 80 + 80)}, ${
            Math.random() * 0.25 + 0.1
        })`,
    }));

    return (
        <>
            <Head title="419 Page Expired" />
            <div className="relative min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 overflow-hidden flex items-center justify-center p-4">
                {/* Floating Background Particles */}
                {floatingElements.map((el) => (
                    <div
                        key={el.id}
                        className="absolute rounded-full backdrop-blur-sm"
                        style={{
                            width: `${el.size}px`,
                            height: `${el.size}px`,
                            backgroundColor: el.color,
                            top: `${el.top}%`,
                            left: `${el.left}%`,
                            animation: `${el.animation} ${
                                12 + Math.random() * 10
                            }s ease-in-out infinite`,
                            opacity: el.opacity,
                            rotate: `${el.rotate}deg`,
                        }}
                    />
                ))}

                {/* Main Content */}
                <div className="relative z-10 text-center max-w-2xl animate-fadeIn">
                    <div className="text-8xl font-extrabold text-white mb-6 relative">
                        <span className="text-green-300">4</span>
                        <span className="text-white animate-pulse mx-3">1</span>
                        <span className="text-green-300">9</span>

                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-green-400 rounded-full glow-effect" />
                    </div>

                    <h1 className="text-4xl font-bold text-green-200 mb-4">
                        Halaman Kedaluwarsa
                    </h1>

                    <div className="bg-green-800 bg-opacity-70 backdrop-blur-md rounded-xl p-6 mb-8 border-2 border-green-600 border-dashed shadow-lg relative">
                        <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-green-500 opacity-10 animate-ping-slow" />
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-green-600 opacity-10 animate-ping-slow delay-500" />

                        <p className="text-lg text-green-100 relative z-10 leading-relaxed">
                            Waktu sesi Anda telah berakhir. Hal ini biasanya
                            terjadi jika Anda terlalu lama tidak melakukan
                            aktivitas atau halaman dibuka terlalu lama.
                            <br />
                            <span className="text-green-300 font-semibold">
                                Silakan login kembali.
                            </span>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/login"
                            className="px-8 py-3 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-700 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-lg border border-green-600 glow-effect"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                            Login Kembali
                        </Link>
                    </div>
                </div>

                {/* Decorative Pulsing Elements */}
                <div className="absolute top-1/4 right-10 w-20 h-20 rounded-full bg-green-500 opacity-10 animate-pulse-slow" />
                <div className="absolute bottom-1/4 left-14 w-24 h-24 rounded-full bg-green-400 opacity-10 animate-pulse-slow delay-700" />
            </div>
        </>
    );
};

export default ExpiredPage;

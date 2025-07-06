import React from "react";
import { Head, Link } from "@inertiajs/react";

const ForbiddenGarden = () => {
    // Generate natural elements with some forbidden indicators
    const gardenElements = Array.from({ length: 20 }).map((_, i) => {
        const isBarrier = Math.random() > 0.7;
        return {
            id: i,
            size: Math.random() * 40 + (isBarrier ? 20 : 10),
            animation: `gardenFloat${Math.floor(Math.random() * 4) + 1}`,
            color: isBarrier
                ? `rgba(${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(
                      Math.random() * 30 + 50
                  )}, ${Math.floor(Math.random() * 30 + 50)}, ${
                      Math.random() * 0.3 + 0.3
                  })`
                : `rgba(${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(
                      Math.random() * 100 + 150
                  )}, ${Math.floor(Math.random() * 50 + 50)}, ${
                      Math.random() * 0.2 + 0.1
                  })`,
            top: Math.random() * 100,
            left: Math.random() * 100,
            type: isBarrier ? "barrier" : "leaf",
            rotation: Math.random() * 360,
        };
    });

    return (
        <>
            <Head title="403 Forbidden" />
            <div className="relative min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 overflow-hidden flex items-center justify-center p-4">
                {/* Garden elements background */}
                {gardenElements.map((element) => (
                    <div
                        key={element.id}
                        className={`absolute ${
                            element.type === "barrier"
                                ? "barrier-shape"
                                : "leaf-shape"
                        } transform`}
                        style={{
                            width: `${element.size}px`,
                            height: `${element.size}px`,
                            backgroundColor: element.color,
                            top: `${element.top}%`,
                            left: `${element.left}%`,
                            animation: `${element.animation} ${
                                15 + Math.random() * 10
                            }s ease-in-out infinite`,
                            rotate: `${element.rotation}deg`,
                            filter:
                                element.type === "barrier"
                                    ? "drop-shadow(0 0 2px rgba(255,255,255,0.3))"
                                    : "none",
                        }}
                    />
                ))}

                {/* Main content */}
                <div className="relative z-10 text-center max-w-2xl mx-auto animate-fadeIn">
                    <div className="text-9xl font-bold text-white mb-6 relative">
                        <span className="text-green-300">4</span>
                        <span className="text-white animate-pulse inline-block mx-2">
                            0
                        </span>
                        <span className="text-green-300">3</span>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-green-400 rounded-full glow-effect" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        <span className="text-green-200">Akses Dibatasi!</span>{" "}
                    </h1>

                    <div className="bg-green-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 mb-8 border-2 border-green-600 border-dashed shadow-lg relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-green-500 opacity-10 animate-ping-slow" />
                        <p className="text-lg text-green-100 relative z-10">
                            Anda mencoba memasuki area terbatas. Bagian ini
                            hanya dapat diakses oleh pengguna tertentu atau
                            mungkin Anda perlu izin khusus untuk melanjutkan.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/"
                            className="px-8 py-3 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-lg border border-green-500"
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
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Kembali ke Beranda
                        </Link>
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
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>

                {/* Decorative fences */}
                <div className="absolute top-0 left-0 w-full h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCI+PHBhdGggZD0iTTAgNDBMNSAwSDEwVjQwSDE1VjBIMjBWNDBIMjVWMEgzMFY0MEgzNVYwSDQwVjQwSDQ1VjBINDBWNDBINVYwSDBWNDBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIC8+PC9zdmc+')] opacity-30" />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCI+PHBhdGggZD0iTTAgNjBMNSAwSDEwVjYwSDE1VjBIMjBWNjBIMjVWMEgzMFY2MEgzNVYwSDQwVjYwSDQ1VjBINDBWNjBINVYwSDBWNjBaIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIC8+PC9zdmc+')] opacity-30" />

                {/* Animated decorative elements */}
                <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-green-600 opacity-10 animate-pulse-slow" />
                <div className="absolute bottom-1/3 right-20 w-24 h-24 rounded-full bg-green-500 opacity-10 animate-pulse-slow delay-1000" />
            </div>
        </>
    );
};

export default ForbiddenGarden;

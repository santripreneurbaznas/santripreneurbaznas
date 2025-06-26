import React from "react";

const RegistrationCTA = () => {
    return (
        <section className="relative py-16 md:py-28 bg-gradient-to-br from-[#259148] to-green-700 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20 animate-float1"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20 animate-float2"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-8 h-8 bg-white rounded-full opacity-20 animate-float3"></div>
            <div className="absolute bottom-20 right-20 w-12 h-12 bg-white rounded-full opacity-30 animate-float4"></div>
            <div className="absolute top-1/3 right-16 w-6 h-6 bg-yellow-300 rounded-full opacity-70 animate-float2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Animated checkmarks */}
                    <div className="flex justify-center space-x-4 mb-8">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-fadeIn"
                                style={{ animationDelay: `${item * 100}ms` }}
                            >
                                <svg
                                    className="w-6 h-6 text-white animate-check"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    style={{
                                        animationDelay: `${item * 200 + 300}ms`,
                                    }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                        ))}
                    </div>

                    {/* Main content */}
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
                        Jadilah Bagian dari{" "}
                        <span className="text-yellow-300">
                            Generasi Santripreneur
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto animate-fadeIn delay-100">
                        Bergabunglah dengan komunitas santripreneur dan dapatkan
                        akses ke pelatihan, jaringan bisnis, dan pendampingan
                        eksklusif.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        <div className="bg-white bg-opacity-10 px-6 py-3 rounded-full backdrop-filter backdrop-blur-sm animate-fadeIn delay-200">
                            <div className="text-2xl font-bold text-white">
                                3000+
                            </div>
                            <div className="text-sm text-white opacity-80">
                                Jaringan santri
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-10 px-6 py-3 rounded-full backdrop-filter backdrop-blur-sm animate-fadeIn delay-300">
                            <div className="text-2xl font-bold text-white">
                                200+
                            </div>
                            <div className="text-sm text-white opacity-80">
                                Mitra
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-10 px-6 py-3 rounded-full backdrop-filter backdrop-blur-sm animate-fadeIn delay-400">
                            <div className="text-2xl font-bold text-white">
                                100+
                            </div>
                            <div className="text-sm text-white opacity-80">
                                Mentor Expert
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-500">
                        <button
                            onClick={() => (window.location.href = "/klaster")}
                            className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                        >
                            Daftar Sekarang
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
                                    strokeWidth="2"
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* Garansi */}
                    <div className="mt-8 flex items-center justify-center text-white opacity-80 text-sm animate-fadeIn delay-600">
                        <svg
                            className="w-5 h-5 mr-2 text-yellow-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            ></path>
                        </svg>
                        Pendaftaran hanya dibuka untuk kuota terbatas. Pastikan
                        Anda mendaftar lebih awal agar tidak melewatkan
                        kesempatan ini.
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bottom-0 rounded-full bg-white opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 10 + 2}px`,
                            height: `${Math.random() * 10 + 2}px`,
                            animation: `float-up ${
                                Math.random() * 1 + 1
                            }s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default RegistrationCTA;

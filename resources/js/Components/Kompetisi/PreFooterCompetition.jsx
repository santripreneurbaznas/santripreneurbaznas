import { Link } from "@inertiajs/react";
import React from "react";

const PreFooter = () => {
    return (
        <section className="relative py-20 bg-white overflow-hidden">
            {/* Animated decorative elements */}
            <div className="absolute top-20 left-10 w-24 h-24 bg-[#259148]/10 rounded-full animate-float1"></div>
            <div className="absolute bottom-1/4 right-20 w-28 h-28 bg-[#259148]/15 rounded-full animate-float2"></div>
            <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-[#259148]/10 rounded-full animate-float3"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-[#259148]/20 rounded-full animate-float4"></div>

            {/* Geometric pattern */}
            {/* <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 border-8 border-[#259148] rounded-tr-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 border-8 border-[#259148] rounded-bl-full"></div>
            </div> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#259148] mb-6 animate-fadeIn">
                        Siap Menjadi Santripreneur Unggulan?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fadeIn delay-100">
                        Bergabunglah dengan kompetisi ini untuk mengasah
                        keterampilan wirausaha Anda dan menangkan hadiah
                        menarik!
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {/* Statistic 1 */}
                    <div className="bg-white p-8 rounded-xl border-2 border-[#259148]/20 hover:border-[#259148] transition-all duration-300 animate-fadeIn delay-200 group shadow-lg hover:shadow-xl">
                        <div className="text-5xl font-bold text-[#259148] mb-4 flex items-center justify-center relative">
                            <span className="group-hover:scale-110 transition-transform duration-300">
                                10
                            </span>
                            <span className="text-3xl ml-1">+</span>
                            <div className="absolute -bottom-2 w-16 h-1 bg-[#259148] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-[#259148] mb-3">
                            Mentor Profesional
                        </h3>
                        <p className="text-gray-600">
                            Dari berbagai bidang bisnis dan keuangan syariah
                        </p>
                    </div>

                    {/* Statistic 2 */}
                    <div className="bg-white p-8 rounded-xl border-2 border-[#259148]/20 hover:border-[#259148] transition-all duration-300 animate-fadeIn delay-300 group shadow-lg hover:shadow-xl">
                        <div className="text-5xl font-bold text-[#259148] mb-4 flex items-center justify-center relative">
                            <span className="group-hover:scale-110 transition-transform duration-300">
                                500
                            </span>
                            <span className="text-3xl ml-1">JT+</span>
                            <div className="absolute -bottom-2 w-16 h-1 bg-[#259148] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-[#259148] mb-3">
                            Total Hadiah
                        </h3>
                        <p className="text-gray-600">
                            Untuk pemenang terbaik kompetisi
                        </p>
                    </div>

                    {/* Statistic 3 */}
                    <div className="bg-white p-8 rounded-xl border-2 border-[#259148]/20 hover:border-[#259148] transition-all duration-300 animate-fadeIn delay-400 group shadow-lg hover:shadow-xl">
                        <div className="text-5xl font-bold text-[#259148] mb-4 flex items-center justify-center relative">
                            <span className="group-hover:scale-110 transition-transform duration-300">
                                100
                            </span>
                            <span className="text-3xl ml-1">+</span>
                            <div className="absolute -bottom-2 w-16 h-1 bg-[#259148] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-[#259148] mb-3">
                            Peserta Tahun Lalu
                        </h3>
                        <p className="text-gray-600">
                            Telah mengikuti program ini
                        </p>
                    </div>
                </div>

                <div className="text-center animate-fadeIn delay-500">
                    <Link
                        href="/login"
                        className="relative w-fit px-8 py-4 bg-[#259148] text-white font-bold rounded-full text-lg hover:bg-[#1e7a3d] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center">
                            Daftar Sekarang
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <span className="absolute inset-0 bg-[#1e7a3d] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>

                    <p className="mt-6 text-gray-500 text-sm">
                        Pendaftaran ditutup pada 15 Agustus 2025
                    </p>
                </div>
            </div>

            {/* Decorative wave at bottom */}
            {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg
                    className="relative block w-full h-20"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25"
                        fill="#259148"
                    ></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"
                        fill="#259148"
                    ></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        fill="#259148"
                    ></path>
                </svg>
            </div> */}
        </section>
    );
};

export default PreFooter;

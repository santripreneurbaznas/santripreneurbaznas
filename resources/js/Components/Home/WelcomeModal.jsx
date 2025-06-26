import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

export default function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        // Cek jika modal sudah pernah ditampilkan
        const hasSeenModal = localStorage.getItem("hasSeenBaznasModal");
        if (!hasSeenModal) {
            setIsOpen(true);
            localStorage.setItem("hasSeenBaznasModal", "true");
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>

                {/* Floating decorative elements */}
                <div className="hidden md:block">
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#259148]/20 rounded-full animate-float1"></div>
                    <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-[#259148]/15 rounded-full animate-float2"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-[#259148]/10 rounded-full animate-float3"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-[#259148]/20 rounded-full animate-float4"></div>
                </div>

                {/* Modal content */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full animate-fadeIn relative">
                    <div className="bg-white px-6 py-8 sm:p-10">
                        <div className="text-center">
                            {/* Logo/Header */}

                            <div>
                                <img
                                    src="/images/logo.png"
                                    alt="logo"
                                    className="mx-auto mb-4 w-1/2"
                                />
                            </div>

                            <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
                                Kompetisi{" "}
                                <span className="text-[#259148]">BAZNAS</span>{" "}
                                Santripreuner 2025
                            </h3>

                            <div className="mt-6 space-y-4">
                                <p className="text-lg text-[#259148] font-semibold capitalize">
                                    Wujudkan mimpi bisnis Anda!
                                </p>
                                <p>
                                    BAZNAS Santripreuner Kompetisi perencanaan
                                    bisnis 2025 membuka peluang bagi santri dan
                                    atau alumni santri untuk mengasah jiwa
                                    wirausaha dengan pendampingan profesional.
                                </p>

                                <div className="bg-[#259148]/10 p-4 rounded-lg mb-6 text-left">
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-start">
                                            <svg
                                                className="h-5 w-5 text-[#259148] mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span>
                                                Kompetisi untuk mengembangkan
                                                jiwa wirausaha santri
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                className="h-5 w-5 text-[#259148] mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span>
                                                Total hadiah ratusan juta rupiah
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                className="h-5 w-5 text-[#259148] mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span>
                                                Pendampingan dari mentor
                                                berpengalaman
                                            </span>
                                        </li>
                                        <li className="flex items-start">
                                            <svg
                                                className="h-5 w-5 text-[#259148] mr-2 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span>
                                                Jaringan bisnis dengan berbagai
                                                stakeholder
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-8">
                                    <Link
                                        href="/kompetisi"
                                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#259148] hover:bg-[#1e7a3a] shadow-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        Lihat Detail Kompetisi
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-2 -mr-1 h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <p className="text-xs text-gray-500 text-center">
                            © 2025 BAZNAS Santri Preuner. All rights reserved.
                        </p>
                    </div> */}

                    {/* close modal */}
                    <div
                        className="absolute top-4 right-4 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

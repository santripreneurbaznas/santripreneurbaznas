import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { FiCheck, FiBookOpen } from "react-icons/fi";
import { ArrowBigRightIcon } from "lucide-react";

export default function ArticleModal({ showModal = false }) {
    const [isOpen, setIsOpen] = useState(showModal);

    useEffect(() => {
        // Cek jika modal artikel sudah pernah ditampilkan
        const hasSeenArticleModal = localStorage.getItem("hasSeenArticleModal");
        if (!hasSeenArticleModal && showModal) {
            setIsOpen(true);
        }
    }, [showModal]);

    const closeModal = () => {
        setIsOpen(false);
        localStorage.setItem("hasSeenArticleModal", "true");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                    onClick={closeModal}
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

                            <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-2">
                                Artikel{" "}
                                <span className="text-[#259148]">
                                    Inspiratif
                                </span>{" "}
                                Santripreneur
                            </h3>

                            <div className="mt-6 space-y-4">
                                <p className="text-lg text-[#259148] font-semibold capitalize">
                                    Tingkatkan Wawasan Wirausaha Anda!
                                </p>
                                <p className="text-justify">
                                    Temukan kumpulan artikel inspiratif seputar
                                    kewirausahaan, tips bisnis, kisah sukses
                                    santripreneur, dan berbagai informasi
                                    bermanfaat untuk mengembangkan jiwa
                                    wirausaha Anda.
                                </p>

                                <div className="bg-[#259148]/10 p-4 rounded-lg mb-6 text-left">
                                    <ul className="space-y-3 text-gray-700">
                                        {[
                                            "Artikel seputar kewirausahaan santri",
                                            "Tips dan strategi bisnis praktis",
                                            "Kisah inspirasi santripreneur sukses",
                                            "Update terbaru dunia usaha dan startup",
                                        ].map((text, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start"
                                            >
                                                <FiCheck className="text-[#259148] w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8">
                                    <Link
                                        href="/articles"
                                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#259148] hover:bg-[#1e7a3a] shadow-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        Jelajahi Artikel
                                        <ArrowBigRightIcon
                                            className="w-5 h-5 ml-2"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* close modal */}
                    <div
                        className="absolute top-4 right-4 cursor-pointer"
                        onClick={closeModal}
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

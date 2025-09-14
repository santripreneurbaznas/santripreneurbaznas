import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";

export default function AnnouncementModal() {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        // Cek jika modal sudah pernah ditampilkan
        const hasSeenModal = localStorage.getItem("hasSeenAnnouncementModal");
        if (!hasSeenModal) {
            setIsOpen(true);
            localStorage.setItem("hasSeenAnnouncementModal", "true");
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
                    <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-emerald-400/20 rounded-full animate-float1"></div>
                    <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-500/15 rounded-full animate-float2"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-emerald-400/10 rounded-full animate-float3"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-emerald-500/20 rounded-full animate-float4"></div>

                    {/* Bintang berkelap-kelip */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute star"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                width: `${Math.random() * 4 + 2}px`,
                                height: `${Math.random() * 4 + 2}px`,
                            }}
                        ></div>
                    ))}
                </div>

                {/* Modal content */}
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full animate-fadeIn relative">
                    <div className="bg-white px-6 py-8 sm:p-10">
                        <div className="text-center">
                            <div>
                                <img
                                    src="/images/logo.png"
                                    alt="logo"
                                    className="mx-auto mb-4 w-1/2"
                                />
                            </div>

                            <h3 className="text-3xl font-extrabold text-gray-900 mb-2 uppercase">
                                Baca Artikel Terbaru Kami
                            </h3>

                            <p className="text-lg text-emerald-600 font-semibold mb-4">
                                Ingin tahu rahasia sukses para Santripreneur ?
                            </p>

                            <div className="mt-6 space-y-4">
                                <p className="text-gray-600">
                                    Artikel ini bisa jadi motivasi & ide baru
                                    untuk bisnismu. Jangan lewatkan kesempatan
                                    untuk belajar dari yang terbaik!
                                </p>

                                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                    <div className="flex items-start">
                                        <svg
                                            className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                        <span className="text-amber-700 text-sm">
                                            Jangan lewatkan insight berharga
                                            yang bisa menjadi motivasi untuk
                                            kesuksesanmu di masa depan!
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <Link
                                        href="/articles" // Ganti dengan URL artikel yang sesuai
                                        className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg transition-all duration-300 transform hover:scale-105 glow-effect"
                                    >
                                        Baca Artikel Inspiratif Ini
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

                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-full inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Nanti Saja
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Close button */}
                    <div
                        className="absolute top-4 right-4 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-500"
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

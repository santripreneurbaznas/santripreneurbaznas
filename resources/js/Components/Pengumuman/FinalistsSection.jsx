import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const FinalistsSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [showSpreadsheet, setShowSpreadsheet] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    const toggleSpreadsheet = () => {
        setShowSpreadsheet(!showSpreadsheet);
    };

    // URL untuk embed yang difokuskan hanya pada range data tertentu
    // Ganti dengan range yang sesuai dengan data Anda
    const sheetUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqNYr3V2jJ9U3XpQ4kK8W4tQ6Z7bL8q9Jz7y3y1y2y1y2y1y2y1y2y1y2y1/pubhtml?gid=2121043538&amp;single=true&amp;widget=true&amp;headers=false&amp;range=A1:E101";

    // Alternatif: menggunakan Google Sheets PUBLISH to web fitur dengan parameter chrome=false
    const publishedSheetUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqNYr3V2jJ9U3XpQ4kK8W4tQ6Z7bL8q9Jz7y3y1y2y1y2y1y2y1y2y1/pubhtml?widget=true&amp;headers=false&amp;chrome=false";

    return (
        <section className="relative py-20 bg-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-50 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                {/* Garis dekoratif */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6"
                    >
                        Daftar 100 Besar Peserta Lolos
                    </motion.h2>
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6"
                    >
                        -Klaster Haji dan Umroh-
                    </motion.h2>

                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full mb-8"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <span>Selamat kepada 100 peserta terpilih</span>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Berikut adalah daftar peserta yang berhasil lolos ke
                        tahap selanjutnya. Anda dapat melihat detail data dengan
                        menekan tombol di bawah.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="text-center mb-12"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleSpreadsheet}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-full glow-effect transition-all duration-300 flex items-center justify-center mx-auto"
                    >
                        {showSpreadsheet
                            ? "Sembunyikan Data"
                            : "Lihat Data Lengkap"}
                        <svg
                            className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                                showSpreadsheet ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </motion.button>
                </motion.div>

                {/* Embed Google Spreadsheet - Hanya tabel */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: showSpreadsheet ? 1 : 0,
                        height: showSpreadsheet ? "auto" : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl overflow-hidden shadow-2xl mb-12 bg-gray-50"
                >
                    <div className="w-full h-[600px] overflow-auto">
                        {showSpreadsheet && (
                            <div className="p-4">
                                <div className="bg-white rounded-lg shadow-sm p-2 ">
                                    <h3 className="text-lg font-semibold text-emerald-800 ">
                                        Daftar 100 Besar - Klaster Haji dan
                                        Umroh
                                    </h3>
                                </div>

                                {/* Jika menggunakan metode publish to web */}
                                <iframe
                                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSG798DuitDcP005EIvEHl-mz8r-pD3OhxkicKez75QSxm2eAb5OJeYYdwklZ2Wuw6ZDqY5eFXBK4Xj/pubhtml?widget=true&amp;headers=false"
                                    width="100%"
                                    height="500"
                                    frameBorder="0"
                                    className="w-full border border-gray-200 rounded-lg"
                                    allowFullScreen
                                ></iframe>

                                {/* Alternatif: Tautan langsung untuk yang ingin melihat di Google Sheets */}
                                <div className="mt-4 text-center">
                                    <a
                                        href="https://docs.google.com/spreadsheets/d/1bLqivJEAOxZFq-dAJey04L-huIGYJc1d4igsZkPkQ5w/edit?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
                                    >
                                        Buka di Google Sheets
                                        <svg
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Info tambahan */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 max-w-4xl mx-auto"
                >
                    <h3 className="text-xl font-semibold text-emerald-900 mb-4 text-center">
                        Informasi Penting
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                                <svg
                                    className="w-5 h-5 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-emerald-800 mb-1">
                                    Tahap Selanjutnya
                                </h4>
                                <p className="text-sm text-emerald-700">
                                    Peserta yang lolos akan dihubungi via email
                                    untuk informasi tahap selanjutnya.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                                <svg
                                    className="w-5 h-5 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-emerald-800 mb-1">
                                    Konfirmasi Kehadiran
                                </h4>
                                <p className="text-sm text-emerald-700">
                                    Harap konfirmasi kehadiran maksimal 3x24 jam
                                    setelah pengumuman.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                                <svg
                                    className="w-5 h-5 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-emerald-800 mb-1">
                                    Dokumen yang Diperlukan
                                </h4>
                                <p className="text-sm text-emerald-700">
                                    Siapkan dokumen persyaratan asli untuk
                                    verifikasi pada tahap selanjutnya.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                                <svg
                                    className="w-5 h-5 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-emerald-800 mb-1">
                                    Bantuan & Informasi
                                </h4>
                                <p className="text-sm text-emerald-700">
                                    Untuk pertanyaan lebih lanjut, hubungi
                                    panitia melalui email: info@seleksi.ac.id
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div> */}
            </div>
        </section>
    );
};

export default FinalistsSection;

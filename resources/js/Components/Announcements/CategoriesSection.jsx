// resources/js/Components/Announcements/CategoriesSection.jsx
import { motion } from "framer-motion";
import {
    FiFolder,
    FiFileText,
    FiDownload,
    FiChevronDown,
    FiChevronUp,
    FiEye,
} from "react-icons/fi";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const CategoriesSection = ({ competition }) => {
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedTopTypes, setExpandedTopTypes] = useState({});

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const toggleCategory = (categoryId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    };

    const toggleTopType = (categoryId, topType) => {
        const key = `${categoryId}-${topType}`;
        setExpandedTopTypes((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

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

    const topTypeColors = {
        100: {
            bg: "from-blue-500 to-indigo-600",
            text: "text-blue-100",
            badge: "bg-blue-100 text-blue-800",
        },
        50: {
            bg: "from-emerald-500 to-green-600",
            text: "text-emerald-100",
            badge: "bg-emerald-100 text-emerald-800",
        },
        10: {
            bg: "from-amber-500 to-orange-600",
            text: "text-amber-100",
            badge: "bg-amber-100 text-amber-800",
        },
    };

    const getTopTypeLabel = (type) => {
        const labels = {
            100: "Top 100 Besar",
            50: "Top 50 Besar",
            10: "Top 10 Besar",
        };
        return labels[type] || `Top ${type} Besar`;
    };

    return (
        <section
            id="categories-section"
            className="relative py-20 bg-gradient-to-b from-white to-emerald-50 overflow-hidden"
            ref={ref}
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-30"></div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: "30px",
                        }}
                    ></div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    {/* Section Header */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-6 py-2 mb-4 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200">
                            <span className="text-emerald-700 font-semibold text-sm">
                                PENGUMUMAN HASIL SELEKSI
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                                Kategori Kompetisi
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Pilih kategori untuk melihat pengumuman hasil
                            seleksi berdasarkan peringkat
                        </p>
                    </motion.div>

                    {/* Categories Grid */}
                    <div className="space-y-6">
                        {competition.categories.length === 0 ? (
                            <motion.div
                                variants={itemVariants}
                                className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200"
                            >
                                <FiFolder className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Belum Ada Kategori
                                </h3>
                                <p className="text-gray-500">
                                    Pengumuman untuk kompetisi ini belum
                                    tersedia
                                </p>
                            </motion.div>
                        ) : (
                            competition.categories.map((category) => (
                                <motion.div
                                    key={category.id}
                                    variants={itemVariants}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl"
                                >
                                    {/* Category Header */}
                                    <div
                                        className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-100 cursor-pointer transition-all duration-300 hover:from-emerald-100 hover:to-green-100"
                                        onClick={() =>
                                            toggleCategory(category.id)
                                        }
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white rounded-xl shadow-sm border border-emerald-100">
                                                    <FiFolder className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        {category.name}
                                                    </h3>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-sm text-emerald-600 font-medium px-3 py-1 bg-emerald-100 rounded-full">
                                                            {
                                                                category.total_announcements
                                                            }{" "}
                                                            Pengumuman
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {
                                                                category
                                                                    .announcements
                                                                    .length
                                                            }{" "}
                                                            Total File
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {expandedCategories[
                                                    category.id
                                                ] ? (
                                                    <>
                                                        <span className="text-sm text-emerald-600 font-medium">
                                                            Tutup
                                                        </span>
                                                        <FiChevronUp className="w-5 h-5 text-emerald-600" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-sm text-emerald-600 font-medium">
                                                            Lihat Pengumuman
                                                        </span>
                                                        <FiChevronDown className="w-5 h-5 text-emerald-600" />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category Content (Expanded) */}
                                    {expandedCategories[category.id] && (
                                        <div className="p-6 bg-gray-50/50">
                                            {Object.keys(
                                                category.announcements_by_top ||
                                                    {}
                                            ).length === 0 ? (
                                                <div className="text-center py-8">
                                                    <FiFileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                                    <p className="text-gray-500">
                                                        Belum ada pengumuman
                                                        untuk kategori ini
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    {Object.entries(
                                                        category.announcements_by_top
                                                    )
                                                        .sort(
                                                            (a, b) =>
                                                                parseInt(b[0]) -
                                                                parseInt(a[0])
                                                        ) // Sort descending
                                                        .map(
                                                            ([
                                                                topType,
                                                                announcements,
                                                            ]) => {
                                                                const colors =
                                                                    topTypeColors[
                                                                        topType
                                                                    ] ||
                                                                    topTypeColors[
                                                                        "100"
                                                                    ];
                                                                const key = `${category.id}-${topType}`;

                                                                return (
                                                                    <div
                                                                        key={
                                                                            topType
                                                                        }
                                                                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                                                                    >
                                                                        {/* Top Type Header */}
                                                                        <div
                                                                            className={`p-4 bg-gradient-to-r ${colors.bg} cursor-pointer transition-all duration-300 hover:brightness-110`}
                                                                            onClick={() =>
                                                                                toggleTopType(
                                                                                    category.id,
                                                                                    topType
                                                                                )
                                                                            }
                                                                        >
                                                                            <div className="flex justify-between items-center">
                                                                                <div className="flex items-center gap-3">
                                                                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                                                                        <FiFileText className="w-5 h-5 text-white" />
                                                                                    </div>
                                                                                    <h4
                                                                                        className={`text-lg font-bold ${colors.text}`}
                                                                                    >
                                                                                        {getTopTypeLabel(
                                                                                            topType
                                                                                        )}
                                                                                    </h4>
                                                                                </div>
                                                                                <div className="flex items-center gap-3">
                                                                                    <span
                                                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}
                                                                                    >
                                                                                        {
                                                                                            announcements.length
                                                                                        }{" "}
                                                                                        File
                                                                                    </span>
                                                                                    {expandedTopTypes[
                                                                                        key
                                                                                    ] ? (
                                                                                        <FiChevronUp className="w-5 h-5 text-white" />
                                                                                    ) : (
                                                                                        <FiChevronDown className="w-5 h-5 text-white" />
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        {/* Announcements List (Expanded) */}
                                                                        {expandedTopTypes[
                                                                            key
                                                                        ] &&
                                                                            announcements.length >
                                                                                0 && (
                                                                                <div className="p-4 bg-gray-50">
                                                                                    <div className="space-y-3">
                                                                                        {announcements.map(
                                                                                            (
                                                                                                announcement
                                                                                            ) => (
                                                                                                <div
                                                                                                    key={
                                                                                                        announcement.id
                                                                                                    }
                                                                                                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-200 transition-all duration-300 hover:shadow-sm"
                                                                                                >
                                                                                                    <div className="flex-1 mb-3 md:mb-0">
                                                                                                        <div className="flex items-start gap-3">
                                                                                                            <div className="p-2 bg-emerald-50 rounded-lg">
                                                                                                                <FiFileText className="w-5 h-5 text-emerald-600" />
                                                                                                            </div>
                                                                                                            <div>
                                                                                                                <h5 className="font-medium text-gray-900">
                                                                                                                    {announcement.file_name ||
                                                                                                                        `Pengumuman ${getTopTypeLabel(
                                                                                                                            topType
                                                                                                                        )}`}
                                                                                                                </h5>
                                                                                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                                                                                    {announcement.description ||
                                                                                                                        `File pengumuman ${
                                                                                                                            category.name
                                                                                                                        } untuk ${getTopTypeLabel(
                                                                                                                            topType
                                                                                                                        )}`}
                                                                                                                </p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <div className="flex items-center gap-3">
                                                                                                        <a
                                                                                                            href={`/berkas${announcement.public_url}`}
                                                                                                            target="_blank"
                                                                                                            rel="noopener noreferrer"
                                                                                                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-sm hover:shadow"
                                                                                                        >
                                                                                                            <FiEye className="mr-2" />
                                                                                                            Lihat
                                                                                                        </a>
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Additional Information */}
                    {competition.categories.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            className="mt-16 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-100"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="p-4 bg-white rounded-xl shadow-sm">
                                    <FiFileText className="w-8 h-8 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Informasi Pengumuman
                                    </h3>
                                    <p className="text-gray-600">
                                        Semua pengumuman resmi hanya akan
                                        dipublikasikan melalui halaman ini.
                                        Pastikan Anda mengunduh file yang sesuai
                                        dengan kategori dan peringkat yang
                                        diikuti. Untuk pertanyaan lebih lanjut,
                                        silakan hubungi panitia melalui kontak
                                        yang tersedia.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Closing Message */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 text-center"
                    >
                        <div className="inline-block p-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg">
                            <div className="bg-white rounded-full px-8 py-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Selamat Kepada Semua Peserta!
                                </h3>
                                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                    Terima kasih atas partisipasi dan semangat
                                    yang telah ditunjukkan. Apapun hasilnya,
                                    Anda semua adalah pemenang karena telah
                                    berani mencoba.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CategoriesSection;

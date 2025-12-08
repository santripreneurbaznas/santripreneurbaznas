// resources/js/Pages/Announcements/Index.jsx
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    FiAward,
    FiCalendar,
    FiFolder,
    FiFileText,
    FiChevronRight,
    FiSearch,
    FiTrendingUp,
    FiUsers,
    FiStar,
    FiArrowRight,
    FiCheckCircle,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";

const AnnouncementsIndex = ({ competitions, stats }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCompetitions, setFilteredCompetitions] =
        useState(competitions);
    const [selectedYear, setSelectedYear] = useState("all");
    const [sortBy, setSortBy] = useState("recent");

    // Filter dan sort competitions
    useEffect(() => {
        let result = [...competitions];

        // Filter by search term
        if (searchTerm) {
            result = result.filter(
                (comp) =>
                    comp.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    comp.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    comp.year.toString().includes(searchTerm)
            );
        }

        // Filter by year
        if (selectedYear !== "all") {
            result = result.filter(
                (comp) => comp.year.toString() === selectedYear
            );
        }

        // Sort competitions
        switch (sortBy) {
            case "recent":
                result.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                break;
            case "oldest":
                result.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                );
                break;
            case "name":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "announcements":
                result.sort(
                    (a, b) => b.total_announcements - a.total_announcements
                );
                break;
            default:
                result.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
        }

        setFilteredCompetitions(result);
    }, [searchTerm, selectedYear, sortBy, competitions]);

    // Get unique years for filter
    const uniqueYears = [
        "all",
        ...new Set(competitions.map((c) => c.year).sort((a, b) => b - a)),
    ];

    // Animation variants
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

    const cardVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            transition: {
                duration: 0.3,
            },
        },
    };

    // Stats cards data
    const statsCards = [
        {
            icon: FiAward,
            value: stats.total_competitions,
            label: "Total Daftar Kompetisi",
            color: "from-emerald-500 to-green-600",
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-700",
        },
        {
            icon: FiFolder,
            value: competitions.reduce(
                (sum, comp) => sum + comp.total_categories,
                0
            ),
            label: "Total Kategori Klaster",
            color: "from-emerald-500 to-green-600",
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-700",
        },
        {
            icon: FiFileText,
            value: competitions.reduce(
                (sum, comp) => sum + comp.total_announcements,
                0
            ),
            label: "Total Daftar Pengumuman",
            color: "from-emerald-500 to-emerald-600",
            bgColor: "bg-emerald-50",
            textColor: "text-emerald-700",
        },
    ];

    return (
        <>
            <Head title="Daftar Kompetisi - Pengumuman" />
            <Navbar />

            {/* Hero Section */}
            <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-emerald-400 rounded-full opacity-15 animate-float3"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <div className="inline-flex items-center gap-4 px-6 py-3 mb-4 text-sm text-white bg-emerald-500/30 rounded-full backdrop-blur-sm border border-emerald-400/30">
                                <FiAward className="text-yellow-300" />
                                <span>Pengumuman Resmi</span>
                            </div>
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg">
                            <span className="block animate-gradient">
                                Pengumuman Kompetisi
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 animate-gradient mt-2">
                                BAZNAS Santripreneur
                            </span>
                        </h1>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari kompetisi..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Stats Section */}
            <section className="relative py-12 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3  gap-6"
                    >
                        {statsCards.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div
                                            className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}
                                        >
                                            <stat.icon
                                                className={`w-6 h-6 ${stat.textColor}`}
                                            />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900">
                                            {stat.value.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {stat.label}
                                        </div>
                                    </div>
                                    <div
                                        className={`h-12 w-1 rounded-full bg-gradient-to-b ${stat.color}`}
                                    ></div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Competitions Grid */}
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    {filteredCompetitions.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="inline-flex p-6 bg-emerald-50 rounded-2xl mb-6">
                                <FiSearch className="w-16 h-16 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                Tidak Ditemukan
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                Tidak ada kompetisi yang sesuai dengan pencarian
                                Anda. Coba dengan kata kunci lain atau tahun
                                yang berbeda.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredCompetitions.map((competition, index) => (
                                <motion.div
                                    key={competition.id}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    initial="hidden"
                                    animate="visible"
                                    custom={index}
                                >
                                    <Link
                                        href={route(
                                            "announcements.show",
                                            competition.slug
                                        )}
                                        className="block h-full group"
                                    >
                                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-emerald-200 transition-all duration-300 h-full flex flex-col">
                                            {/* Card Header */}
                                            <div className="relative h-48 bg-gradient-to-r from-emerald-500 to-green-600 overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                                <div className="absolute top-4 right-4">
                                                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                                        <span className="text-white text-sm font-medium flex items-center">
                                                            <FiCalendar className="mr-1" />
                                                            {competition.year}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <h3 className="text-2xl font-bold text-white line-clamp-2">
                                                        {competition.name}
                                                    </h3>
                                                </div>

                                                {/* Animated overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                            </div>

                                            {/* Card Body */}
                                            <div className="p-6 flex-1">
                                                {/* Stats */}
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div className="bg-emerald-50 rounded-xl p-3 text-center">
                                                        <div className="flex items-center justify-center gap-2 mb-1">
                                                            <FiFolder className="text-emerald-600" />
                                                            <span className="text-lg font-bold text-gray-900">
                                                                {
                                                                    competition.total_categories
                                                                }
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-gray-600">
                                                            Kategori
                                                        </span>
                                                    </div>
                                                    <div className="bg-green-50 rounded-xl p-3 text-center">
                                                        <div className="flex items-center justify-center gap-2 mb-1">
                                                            <FiFileText className="text-green-600" />
                                                            <span className="text-lg font-bold text-gray-900">
                                                                {
                                                                    competition.total_announcements
                                                                }
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-gray-600">
                                                            Pengumuman
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Last Updated */}
                                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                    <span>
                                                        Diperbarui:{" "}
                                                        {competition.updated_at}
                                                    </span>
                                                    <FiCheckCircle className="text-emerald-500" />
                                                </div>
                                            </div>

                                            {/* Card Footer */}
                                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors">
                                                        Lihat Pengumuman
                                                    </span>
                                                    <div className="relative">
                                                        <FiChevronRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-2 transition-transform" />
                                                        <div className="absolute inset-0 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Featured Competition Banner */}
            {filteredCompetitions.length > 0 && (
                <section className="py-20 bg-gradient-to-r from-emerald-50 to-green-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-3xl overflow-hidden shadow-2xl"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    {/* Left Content */}
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="inline-flex items-center gap-2 mb-4">
                                            <div className="p-2 bg-emerald-100 rounded-lg">
                                                <FiStar className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <span className="text-sm font-semibold text-emerald-700">
                                                KOMISI TERBARU
                                            </span>
                                        </div>

                                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                            Cek Pengumuman Terbaru
                                        </h2>

                                        <p className="text-gray-600 mb-8 text-lg">
                                            Jangan lewatkan hasil seleksi dan
                                            pengumuman penting dari
                                            kompetisi-kompetisi terbaru. Semua
                                            informasi resmi tersedia di sini.
                                        </p>

                                        <div className="flex flex-wrap gap-4">
                                            <Link
                                                href={route(
                                                    "announcements.show",
                                                    filteredCompetitions[0].slug
                                                )}
                                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                            >
                                                Lihat Kompetisi Terbaru
                                                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Right Illustration */}
                                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
                                        <div className="relative z-10 text-center">
                                            {/* <FiAward className="w-32 h-32 text-white/90 mx-auto mb-6" /> */}
                                            <img
                                                src="/images/logo.png"
                                                alt="santripreneur"
                                                className=" h-[115px] text-white/90 mx-auto mb-6 brightness-0 invert"
                                            />
                                            <h3 className="text-2xl font-bold text-white mb-3">
                                                Informasi Terpercaya
                                            </h3>
                                            <p className="text-emerald-100">
                                                Semua pengumuman bersifat resmi
                                                dan terverifikasi
                                            </p>
                                        </div>

                                        {/* Decorative Elements */}
                                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Empty State Illustration (when no competitions) */}
            {competitions.length === 0 && (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 10 }}
                            className="inline-block p-8 bg-gradient-to-r from-emerald-100 to-green-100 rounded-3xl mb-8"
                        >
                            <FiAward className="w-24 h-24 text-emerald-500" />
                        </motion.div>

                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Belum Ada Kompetisi
                        </h3>

                        <p className="text-gray-600 max-w-md mx-auto text-lg mb-8">
                            Saat ini belum ada kompetisi yang memiliki
                            pengumuman. Nantikan kompetisi-kompetisi mendatang!
                        </p>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
};

export default AnnouncementsIndex;

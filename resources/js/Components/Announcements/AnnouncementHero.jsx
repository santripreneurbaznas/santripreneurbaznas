// resources/js/Components/Announcements/AnnouncementHero.jsx
import { motion } from "framer-motion";
import { FiArrowDown, FiAward, FiUsers, FiCalendar } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

const AnnouncementHero = ({ competition, stats }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
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

    // Format tahun kompetisi
    const competitionYear = competition.created_at
        ? new Date(competition.created_at).getFullYear()
        : "2021";

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-float1"></div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white rounded-full opacity-10 animate-float2"></div>
                <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-emerald-400 rounded-full opacity-15 animate-float3"></div>
                <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-amber-300 rounded-full opacity-20 animate-float4"></div>

                {/* Bintang */}
                {[...Array(15)].map((_, i) => (
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

            {/* Konten utama */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    {/* Competition Info Badge */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <div className="inline-flex items-center gap-4 px-6 py-3 mb-4 text-sm text-white bg-emerald-500/30 rounded-full backdrop-blur-sm border border-emerald-400/30">
                            <FiCalendar className="text-yellow-300" />
                            <span>Edisi {competitionYear}</span>
                            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                            <FiAward className="text-yellow-300" />
                            <span>Pengumuman Resmi</span>
                        </div>
                    </motion.div>

                    {/* Competition Title */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg"
                    >
                        <span className="block">Pengumuman Finalis</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 mt-2 animate-gradient">
                            {competition.name}
                        </span>
                    </motion.h1>

                    {/* Competition Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        Para peserta terpilih yang berhasil lolos ke tahap
                        selanjutnya dalam seleksi kompetisi kami.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-full glow-effect transition-all duration-300 flex items-center justify-center group"
                            onClick={() => {
                                document
                                    .getElementById("categories-section")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                            }}
                        >
                            Lihat Pengumuman
                            <FiArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Dekorasi */}
            <div className="absolute bottom-10 left-10 w-24 h-24 opacity-30 leaf-shape bg-emerald-400 animate-gentle"></div>
            <div className="absolute top-20 right-16 w-16 h-16 opacity-40 leaf-shape bg-amber-300 animate-float2"></div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="animate-bounce w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-3 bg-white/70 rounded-full mt-2"
                    ></motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AnnouncementHero;

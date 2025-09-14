import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

const ArticleHero = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Variasi animasi untuk teks
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

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
            {/* Background elements dengan animasi float */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-float1"></div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white rounded-full opacity-10 animate-float2"></div>
                <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-emerald-400 rounded-full opacity-15 animate-float3"></div>
                <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-amber-300 rounded-full opacity-20 animate-float4"></div>

                {/* Bintang berkelap-kelip */}
                {[...Array(20)].map((_, i) => (
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
                    className="max-w-4xl mx-auto"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 text-shadow-lg"
                    >
                        <span className="block"> Koleksi Artikel Terbaru</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mt-2">
                            Santripreneur BAZNAS
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Perjalanan para santri yang berani mencoba dunia usaha.
                        Dari pesantren, mereka merintis usaha kecil, belajar
                        jatuh bangun, sampai akhirnya memberi manfaat bagi
                        banyak orang.
                    </motion.p>
                </motion.div>
            </div>

            {/* Dekorasi daun */}
            <div className="absolute bottom-10 left-10 w-24 h-24 opacity-30 leaf-shape bg-emerald-400 animate-gentle"></div>
            <div className="absolute top-20 right-16 w-16 h-16 opacity-40 leaf-shape bg-amber-300 animate-float2"></div>
            <div className="absolute bottom-1/4 right-20 w-20 h-20 opacity-25 leaf-shape bg-white animate-float3"></div>

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

export default ArticleHero;

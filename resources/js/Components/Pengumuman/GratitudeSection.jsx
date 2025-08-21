import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const GratitudeSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const cardVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section className="relative py-20 bg-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-40"></div>

                {/* Garis dekoratif */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>

                {/* Pola dekoratif */}
                <div className="absolute top-20 right-20 w-12 h-12 bg-emerald-300/20 rounded-lg rotate-45"></div>
                <div className="absolute bottom-32 left-24 w-16 h-16 bg-amber-300/20 rounded-full"></div>
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
                        Terima Kasih Atas Partisipasi Anda
                    </motion.h2>

                    <motion.div
                        variants={itemVariants}
                        className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200 shadow-sm mb-8"
                    >
                        <span className="text-4xl md:text-5xl font-bold text-emerald-800">
                            2.904
                        </span>
                        <span className="block text-emerald-600 text-sm mt-1 font-medium">
                            Total Pendaftar
                        </span>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Perjalanan seleksi ini telah menunjukkan dedikasi dan
                        semangat luar biasa dari semua peserta. Kami sangat
                        menghargai setiap usaha dan waktu yang telah Anda
                        berikan.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <div className="inline-block p-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-md">
                        <div className="bg-white rounded-full px-8 py-4">
                            <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                                Terus Berkarya dan Menginspirasi!
                            </h3>
                            <p className="text-gray-600">
                                Apapun hasilnya, kami bangga dengan semangat dan
                                inovasi yang telah Anda tunjukkan.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GratitudeSection;

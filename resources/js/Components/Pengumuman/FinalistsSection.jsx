import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FinalistsSection = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

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

    const buttonVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
            transition: {
                duration: 0.3,
            },
        },
        tap: {
            scale: 0.95,
        },
    };

    const floatingElements = [
        {
            style: "top-20 left-10 w-8 h-8 bg-emerald-300/30 animate-float1",
            shape: "rounded-full",
        },
        {
            style: "top-1/3 right-16 w-12 h-12 bg-amber-300/20 animate-float2",
            shape: "rounded-lg",
        },
        {
            style: "bottom-1/4 left-20 w-10 h-10 bg-emerald-400/25 animate-float3",
            shape: "rounded-full",
        },
        {
            style: "bottom-40 right-24 w-14 h-14 bg-green-300/15 animate-float4",
            shape: "rounded-lg",
        },
        {
            style: "top-44 left-1/4 w-16 h-16 bg-amber-200/10 animate-float2",
            shape: "rounded-full",
        },
    ];

    return (
        <section
            id="finalis-100-besar"
            className="relative py-20 bg-white overflow-hidden"
        >
            {/* Background decorative elements dengan animasi */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-50 rounded-full translate-y-1/2 -translate-x-1/2 opacity-70"></div>

                {/* Garis dekoratif */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent"></div>

                {/* Floating elements dengan animasi */}
                {floatingElements.map((element, index) => (
                    <div
                        key={index}
                        className={`absolute ${element.style} ${element.shape} backdrop-blur-sm`}
                    ></div>
                ))}

                {/* Pola latar belakang subtle */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full pattern-dots pattern-green-500 pattern-bg-white pattern-opacity-20 pattern-size-4"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="space-y-[60px] flex flex-col">
                    <motion.div>
                        <motion.div ref={ref} className="text-center mb-16">
                            <motion.h2
                                variants={itemVariants}
                                className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6"
                            >
                                <span className="text-shadow">
                                    Daftar 100 Besar Peserta Lolos
                                </span>
                            </motion.h2>

                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 rounded-full shadow-sm mb-8 border border-emerald-200/60"
                            >
                                <svg
                                    className="w-6 h-6 mr-2 text-emerald-600"
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
                                <span className="font-medium">
                                    Selamat kepada 100 peserta terpilih
                                </span>
                            </motion.div>

                            <motion.p
                                variants={itemVariants}
                                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                            >
                                Berikut adalah daftar peserta yang berhasil
                                lolos ke tahap selanjutnya. Pilih klaster untuk
                                melihat daftar peserta.
                            </motion.p>
                        </motion.div>
                        {/* ini */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col md:flex-row justify-center gap-5 mb-12 px-20 "
                        >
                            {[
                                {
                                    id: "haji",
                                    label: "Klaster Haji dan Umroh",
                                    link: "/files/finalis/2025/Finalis-100-Besar-Kompetisi-BAZNAS-Santripreneur-Klaster-Haji-dan-Umroh-2025.pdf",
                                },
                                {
                                    id: "kreatif",
                                    label: "Klaster Industri Kreatif",
                                    link: "/files/finalis/2025/Finalis-100-Besar-Kompetisi-BAZNAS-Santripreneur-Klaster-Industri-Kreatif-2025.pdf",
                                },
                                {
                                    id: "peternakan",
                                    label: "Klaster Peternakan",
                                    link: "/files/finalis/2025/Finalis-100-Besar-Kompetisi-BAZNAS-Santripreneur-Klaster-Peternakan-2025.pdf",
                                },
                            ].map((cluster, index) => (
                                <motion.a
                                    key={cluster.id}
                                    href={cluster.link}
                                    variants={buttonVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`px-8 py-4 font-semibold rounded-full transition-all duration-300 flex-1 min-w-[250px] bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg glow-effect text-center`}
                                    style={{
                                        transition: "all 0.3s ease",
                                    }}
                                    target="_blank"
                                >
                                    {cluster.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                    <motion.div>
                        <motion.div ref={ref} className="text-center mb-16">
                            <motion.h2
                                variants={itemVariants}
                                className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6"
                            >
                                <span className="text-shadow">
                                    Daftar 50 Besar Peserta Lolos
                                </span>
                            </motion.h2>

                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 rounded-full shadow-sm mb-8 border border-emerald-200/60"
                            >
                                <svg
                                    className="w-6 h-6 mr-2 text-emerald-600"
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
                                <span className="font-medium">
                                    Selamat kepada 50 peserta terpilih
                                </span>
                            </motion.div>

                            <motion.p
                                variants={itemVariants}
                                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                            >
                                Berikut adalah daftar peserta yang berhasil
                                lolos ke tahap selanjutnya. Pilih klaster untuk
                                melihat daftar peserta.
                            </motion.p>
                        </motion.div>

                        {/* ini */}

                        <motion.div className="flex flex-col md:flex-row justify-center gap-5 mb-12 px-20 ">
                            {[
                                {
                                    id: "haji",
                                    label: "Klaster Haji dan Umroh",
                                    link: "/files/finalis/2025/Finalis-50-Besar-Kompetisi-BAZNAS-Santripreneur-Klaster-Haji-dan-Umrah.pdf",
                                },
                                {
                                    id: "kreatif",
                                    label: "Klaster Industri Kreatif",
                                    link: "/files/finalis/2025/269-Pengumuman-Pitching-Audition-BAZNAS-Santripreneur-Klaster-Industri-Kreatif-2025-signed.pdf",
                                },
                                {
                                    id: "peternakan",
                                    label: "Klaster Peternakan",
                                    link: "/files/finalis/2025/Finalis-50-Besar-Kompetisi-BAZNAS-Santripreneur-Klaster-Peternakan.pdf",
                                },
                            ].map((cluster, index) => (
                                <motion.a
                                    key={cluster.id}
                                    href={cluster.link}
                                    variants={buttonVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`px-8 py-4 font-semibold rounded-full transition-all duration-300 flex-1 min-w-[250px] bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg glow-effect text-center`}
                                    style={{
                                        transition: "all 0.3s ease",
                                    }}
                                    target="_blank"
                                >
                                    {cluster.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                    <motion.div>
                        <motion.div ref={ref} className="text-center mb-16">
                            <motion.h2
                                variants={itemVariants}
                                className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6"
                            >
                                <span className="text-shadow">
                                    Daftar 10 Besar Peserta Lolos
                                </span>
                            </motion.h2>

                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 rounded-full shadow-sm mb-8 border border-emerald-200/60"
                            >
                                <svg
                                    className="w-6 h-6 mr-2 text-emerald-600"
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
                                <span className="font-medium">
                                    Selamat kepada 50 peserta terpilih
                                </span>
                            </motion.div>

                            <motion.p
                                variants={itemVariants}
                                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                            >
                                Berikut adalah daftar peserta yang berhasil
                                lolos ke tahap selanjutnya. Pilih klaster untuk
                                melihat daftar peserta.
                            </motion.p>
                        </motion.div>

                        {/* ini */}

                        <motion.div className="flex flex-col md:flex-row justify-center gap-5 mb-12 px-20 ">
                            {[
                                {
                                    id: "haji",
                                    label: "Klaster Haji dan Umroh",
                                    link: "/files/finalis/2025/FINALIS-10-BESAR-KLASTER-HAJI-DAN-UMRAH-2025.pdf",
                                },
                                // {
                                //     id: "kreatif",
                                //     label: "Klaster Industri Kreatif",
                                //     link: "/files/finalis/2025/269-Pengumuman-Pitching-Audition-BAZNAS-Santripreneur-Klaster-Industri-Kreatif-2025-signed.pdf",
                                // },
                                // {
                                //     id: "peternakan",
                                //     label: "Klaster Peternakan",
                                //     link: "/files/finalis/2025/Finalis-50-Besar-Kompetisi-BAZNAS-Santripreneur-Klaster-Peternakan.pdf",
                                // },
                            ].map((cluster, index) => (
                                <motion.a
                                    key={cluster.id}
                                    href={cluster.link}
                                    variants={buttonVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`px-8 py-4 font-semibold rounded-full transition-all duration-300 flex-1 min-w-[250px] bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg glow-effect text-center`}
                                    style={{
                                        transition: "all 0.3s ease",
                                    }}
                                    target="_blank"
                                >
                                    {cluster.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Info tambahan dengan animasi */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100 max-w-4xl mx-auto shadow-sm mb-16"
                >
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-xl font-semibold text-emerald-900 mb-4 text-center flex items-center justify-center"
                    >
                        <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-full mr-3"
                        >
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
                        </motion.span>
                        Informasi Penting
                    </motion.h3>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center"
                    >
                        <p className="text-lg text-emerald-800 leading-relaxed">
                            Bagi peserta yang dinyatakan lolos, dimohon untuk
                            memastikan bahwa
                            <span className="font-semibold text-emerald-900">
                                {" "}
                                nomor WhatsApp selalu aktif{" "}
                            </span>
                            untuk mendapatkan informasi selanjutnya
                        </p>
                    </motion.div>
                </motion.div>

                {/* Pesan inspiratif */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-16 mb-16"
                >
                    <div className="inline-block p-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-lg">
                        <div className="bg-white rounded-full px-8 py-6">
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-2xl font-semibold text-emerald-800 mb-3"
                            >
                                Terus Berkarya dan Menginspirasi!
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="text-gray-600 text-lg"
                            >
                                Apapun hasilnya, kami bangga dengan semangat dan
                                inovasi yang telah Anda tunjukkan.
                            </motion.p>
                        </div>
                    </div>
                </motion.div>

                {/* Section terima kasih */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                    className="text-center mt-24 mb-16"
                >
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-4xl md:text-5xl font-bold text-emerald-900 mb-8"
                    >
                        <span className="text-shadow">
                            Terima Kasih Atas Partisipasi Anda
                        </span>
                    </motion.h2>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.4 }}
                        className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full border border-emerald-200 shadow-md mb-10"
                    >
                        <span className="text-5xl md:text-6xl font-bold text-emerald-800 block">
                            2.904
                        </span>
                        <span className="block text-emerald-600 text-lg mt-2 font-medium">
                            Total Pendaftar
                        </span>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.6 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Perjalanan seleksi ini telah menunjukkan dedikasi dan
                        semangat luar biasa dari semua peserta. Kami sangat
                        menghargai setiap usaha dan waktu yang telah Anda
                        berikan.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalistsSection;

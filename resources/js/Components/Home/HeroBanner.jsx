import React, { useEffect, useState } from "react";

const HeroBanner = () => {
    const [santriCount, setSantriCount] = useState(0);
    const [mentorCount, setMentorCount] = useState(0);
    const [mitraCount, setMitraCount] = useState(0);

    useEffect(() => {
        // Durasi animasi dalam milidetik
        const duration = 2000;
        // Interval update
        const interval = 20;

        // Hitung step untuk setiap counter
        const santriStep = Math.ceil(3000 / (duration / interval));
        const mentorStep = Math.ceil(100 / (duration / interval));
        const mitraStep = Math.ceil(200 / (duration / interval));

        const santriTimer = setInterval(() => {
            setSantriCount((prev) => {
                if (prev >= 3000) {
                    clearInterval(santriTimer);
                    return 3000;
                }
                return prev + santriStep;
            });
        }, interval);

        const mentorTimer = setInterval(() => {
            setMentorCount((prev) => {
                if (prev >= 100) {
                    clearInterval(mentorTimer);
                    return 100;
                }
                return prev + mentorStep;
            });
        }, interval);

        const mitraTimer = setInterval(() => {
            setMitraCount((prev) => {
                if (prev >= 200) {
                    clearInterval(mitraTimer);
                    return 200;
                }
                return prev + mitraStep;
            });
        }, interval);

        return () => {
            clearInterval(santriTimer);
            clearInterval(mentorTimer);
            clearInterval(mitraTimer);
        };
    }, []);
    return (
        <section className="relative min-h-[90vh] bg-gradient-to-br from-[#259148] to-[#4CAF50] overflow-hidden pt-24 md:pt-0">
            {/* Floating decorative elements */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full filter blur-xl animate-float1"></div>
            <div className="absolute bottom-1/3 right-20 w-32 h-32 bg-white/10 rounded-full filter blur-xl animate-float2"></div>
            <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-[#FFC107]/20 rounded-full animate-float3"></div>

            {/* Content */}
            <div className="container mx-auto h-full flex flex-col lg:flex-row items-center justify-center relative z-10 px-6 py-12 md:py-24">
                {/* Text Content */}
                <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 animate-fadeIn">
                    <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white mb-6 leading-tight">
                        <span className="block">
                            Komunitas Santripreneur BAZNAS:
                        </span>
                        <span className="block text-yellow-300 mt-2">
                            Santri Mandiri, Umat Berdikari
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
                        Wadah pengembangan kewirausahaan santri yang
                        mengintegrasikan nilai-nilai pesantren dengan inovasi
                        bisnis modern.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeIn delay-200">
                        <a
                            href="/login"
                            className="bg-white text-[#259148] px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg text-center"
                        >
                            Daftar Sekarang
                        </a>
                        <a
                            href="#program"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all transform hover:scale-105 shadow-lg text-center"
                        >
                            Lihat Program
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12 animate-fadeIn delay-300">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">
                                {santriCount.toLocaleString()}+
                            </div>
                            <div className="text-white/80">Jaringan santri</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">
                                {mentorCount}+
                            </div>
                            <div className="text-white/80">Mentor Expert</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">
                                {mitraCount} +
                            </div>
                            <div className="text-white/80">Mitra</div>
                        </div>
                    </div>
                </div>

                {/* Image/Illustration */}
                <div className="lg:w-1/2 flex justify-center animate-fadeIn delay-100">
                    <div className="relative w-full max-w-lg">
                        {/* Container dengan efek glow */}
                        <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 p-2 shadow-2xl glow-effect">
                            <div className="aspect-w-16 aspect-h-9 bg-white/20 rounded-2xl overflow-hidden relative">
                                <img
                                    src="/images/Hero.JPG"
                                    alt="Santripreneur"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#4CAF50]/20"></div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FFC107]/30 rounded-full filter blur-lg animate-pulse"></div>
                        <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-[#259148]/30 rounded-full filter blur-lg animate-pulse delay-1000"></div>

                        {/* Tag dengan efek lebih menarik */}
                        <div className="absolute -bottom-6 -right-6 bg-[#FFC107] px-6 py-3 rounded-lg shadow-lg border-2 border-white transform hover:rotate-3 transition-transform">
                            <div className="text-[#259148] font-bold text-lg animate-pulse-slow">
                                #SantriMaju
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrolling indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg
                    className="w-8 h-8 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    ></path>
                </svg>
            </div>
        </section>
    );
};

export default HeroBanner;

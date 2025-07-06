import React from "react";

const Timeline = () => {
    const events = [
        {
            date: "8 Juli 2025",
            title: "Pendaftaran Dibuka",
            description:
                "Pendaftaran kompetisi resmi dibuka untuk seluruh santripreneur",
            icon: "📅",
        },
        {
            date: "31 Juli 2025",
            title: "Batas Akhir Pendaftaran",
            description: "Batas akhir pengumpulan proposal bisnis",
            icon: "⏰",
        },
        {
            date: "To Be Announced on August 2025",
            title: "Pengumuman Seleksi",
            description: "Pengumuman peserta yang lolos ke tahap berikutnya",
            icon: "📢",
        },
        {
            date: "To Be Announced on August 2025",
            title: "Bootcamp Santripreneur",
            description: "Pelatihan intensif untuk finalis",
            icon: "🎓",
        },
        {
            date: "To Be Announced on August 2025",
            title: "Final Kompetisi",
            description: "Presentasi final di hadapan dewan juri",
            icon: "🏆",
        },
        {
            date: "To Be Announced on August 2025",
            title: "Pengumuman Pemenang",
            description: "Malam penganugerahan pemenang kompetisi",
            icon: "🎉",
        },
    ];

    return (
        <section className="relative py-20 bg-[#259148] overflow-hidden">
            {/* Animated floating elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/10 rounded-full animate-float1"></div>
            <div className="absolute bottom-1/4 right-20 w-24 h-24 bg-white/15 rounded-full animate-float2"></div>
            <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-white/10 rounded-full animate-float3"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-300/20 rounded-full animate-float4"></div>

            {/* Glow effects */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/5 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        <span className="text-yellow-300">Timeline</span>{" "}
                        Pelaksanaan
                    </h2>
                    <div className="w-20 h-1 bg-yellow-300 mx-auto mb-6"></div>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fadeIn delay-100">
                        Timeline Perjalanan Kompetisi Menuju Kesuksesan
                    </p>
                </div>

                <div className="relative">
                    {/* Main timeline line with glow */}
                    <div className="hidden sm:block absolute h-full w-1 bg-white/30 left-1/2 transform -translate-x-1/2">
                        <div className="absolute inset-0 bg-white w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>

                    {/* Dotted line effect */}
                    <div className="hidden sm:block absolute h-full w-1 left-1/2 transform -translate-x-1/2">
                        <div
                            className="h-full w-full"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, white 1px, transparent 1px)",
                                backgroundSize: "1px 20px",
                                backgroundRepeat: "repeat-y",
                            }}
                        ></div>
                    </div>

                    <div className="space-y-12">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col sm:flex-row items-center group animate-fadeIn delay-${
                                    index * 100
                                }`}
                            >
                                {/* Timeline dot with pulse animation */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-4 border-[#259148] shadow-xl flex items-center justify-center z-10 transform group-hover:scale-110 transition-all duration-300">
                                    <div className="w-6 h-6 flex items-center justify-center text-[#259148] text-lg">
                                        {event.icon}
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-300"></div>
                                </div>

                                {/* Event card with glassmorphism effect */}
                                <div
                                    className={`flex-1 ${
                                        index % 2 === 0
                                            ? "sm:pr-8 sm:pl-6"
                                            : "sm:pl-8 sm:pr-6"
                                    } mt-6 sm:mt-0`}
                                >
                                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                                        <div className="flex items-center mb-3">
                                            <div className="flex-shrink-0 w-8 h-8 text-white bg-white/20 rounded-full flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="ml-3 font-semibold text-white">
                                                {event.date}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                                            <span className="mr-2">
                                                {event.icon}
                                            </span>
                                            {event.title}
                                        </h3>
                                        <p className="text-white/80">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative elements at bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden transform rotate-180">
                <svg
                    className="relative block w-full h-20"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25"
                        fill="#ffffff"
                    ></path>
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"
                        fill="#ffffff"
                    ></path>
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>
        </section>
    );
};

export default Timeline;

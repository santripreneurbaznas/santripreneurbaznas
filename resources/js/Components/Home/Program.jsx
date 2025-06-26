import React from "react";

const OurPrograms = () => {
    const programs = [
        {
            title: "BAZNAS Santripreuner kompetisi perencanaan bisnis",
            description:
                "Program intensif tahunan untuk membekali santri dengan keterampilan bisnis dasar dan mindset entrepreneur",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="#259148"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                </svg>
            ),
            stats: "500+ Alumni",
        },
        {
            title: "Santripreneur Digital",
            description:
                "Pelatihan pemasaran digital dan e-commerce khusus untuk produk-produk pesantren",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="#259148"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                </svg>
            ),
            stats: "300+ Peserta Aktif",
        },
        {
            title: "Pendampingan Bisnis",
            description:
                "Program pendampingan 1-on-1 dengan mentor bisnis berpengalaman selama 6 bulan",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="#259148"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                </svg>
            ),
            stats: "150+ Bisnis Terbentuk",
        },
        {
            title: "Pelatihan Kewirausahaan Dasar",
            description:
                "Program intensif 3 bulan untuk membekali santri dengan keterampilan bisnis dasar dan mindset entrepreneur",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="#259148"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path>
                </svg>
            ),
            stats: "500+ Alumni",
        },
    ];

    return (
        <section
            id="program"
            className="relative py-16 md:py-24 bg-white overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-20 left-10 w-40 h-40 bg-[#259148] rounded-full filter blur-3xl animate-float1"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#259148] rounded-full filter blur-3xl animate-float2"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fadeIn">
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-[#259148] bg-green-50 rounded-full">
                        Program Unggulan
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        <span className="text-[#259148]">Ekosistem</span>{" "}
                        Pembelajaran Santripreneur
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Program komprehensif kami dirancang untuk membentuk
                        santri menjadi entrepreneur yang kompeten dan
                        berkarakter.
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            className="relative group animate-fadeIn"
                            style={{ animationDelay: `${index * 100 + 100}ms` }}
                        >
                            {/* Card */}
                            <div className="h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transform transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-2">
                                <div className="p-6">
                                    {/* Icon */}
                                    <div className="w-14 h-14 mb-4 rounded-xl bg-green-50 flex items-center justify-center transform transition-all duration-300 group-hover:rotate-6 group-hover:bg-slate-100 group-hover:text-white">
                                        <div className="transform transition-all duration-300 group-hover:scale-110 group-hover:text-white">
                                            {program.icon}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {program.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {program.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="flex items-center text-sm font-medium text-[#259148]">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                            ></path>
                                        </svg>
                                        {program.stats}
                                    </div>
                                </div>

                                {/* Hover effect */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-[#259148] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Floating dot */}
                            <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#259148] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16 animate-fadeIn delay-500">
                    <button
                        onClick={() => (window.location.href = "/klaster")}
                        className="px-8 py-3 bg-[#259148] hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                    >
                        Bergabung sekarang
                        <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OurPrograms;

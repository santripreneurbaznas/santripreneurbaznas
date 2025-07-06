import React from "react";

const Footer = () => {
    const quickLinks = [
        { name: "Tentang Kami", url: "/about" },
        { name: "Program", url: "/programs" },
        { name: "Mentor", url: "/mentors" },
        { name: "Blog", url: "/blog" },
        { name: "FAQ", url: "/faq" },
    ];

    const socialMedia = [
        { name: "Instagram", icon: "ig", url: "#" },
        { name: "Facebook", icon: "fb", url: "#" },
        { name: "YouTube", icon: "yt", url: "#" },
        { name: "LinkedIn", icon: "in", url: "#" },
        { name: "Twitter", icon: "tw", url: "#" },
    ];

    // Warna palette berdasarkan primary #259148
    const colorPalette = {
        primary: "#259148",
        primaryLight: "#4CAF50",
        primaryDark: "#1B5E20",
        accent: "#FFC107",
        textOnPrimary: "#FFFFFF",
        secondaryText: "#E0E0E0",
        divider: "rgba(255, 255, 255, 0.12)",
    };

    return (
        <footer
            className="relative pt-16 pb-8 overflow-hidden"
            style={{ backgroundColor: colorPalette.primaryDark }}
        >
            {/* Wave top decoration */}
            <div className="absolute top-0 left-0 right-0 h-16 transform -translate-y-full overflow-hidden">
                <svg
                    viewBox="0 0 1440 120"
                    className="w-full h-full"
                    style={{ color: colorPalette.primaryDark }}
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 46.307C160.5 14.807 400.5 -18.693 720 46.307C1040 111.307 1200 111.307 1440 46.307V120H0V46.307Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>

            {/* Floating elements */}
            <div
                className="absolute top-20 left-10 w-8 h-8 rounded-full opacity-20 animate-float3"
                style={{ backgroundColor: colorPalette.accent }}
            ></div>
            <div
                className="absolute bottom-1/4 right-20 w-12 h-12 rounded-full opacity-10 animate-float4"
                style={{ backgroundColor: colorPalette.primaryLight }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                    {/* Brand info */}
                    <div className="animate-fadeIn">
                        <div className="flex items-center mb-6">
                            <img
                                src="/images/logo.png"
                                alt=""
                                className="w-48 h-20 mr-4 brightness-0 invert"
                            />
                        </div>
                        <p
                            className="mb-6 leading-relaxed"
                            style={{ color: colorPalette.secondaryText }}
                        >
                            Membangun generasi santri yang mandiri secara
                            ekonomi tanpa meninggalkan nilai-nilai pesantren.
                        </p>
                        <div className="flex space-x-4">
                            {socialMedia.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 transform hover:scale-110"
                                    style={{
                                        backgroundColor: colorPalette.primary,
                                        color: colorPalette.textOnPrimary,
                                    }}
                                    aria-label={social.name}
                                >
                                    <span className="text-lg">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    {/* <div className="animate-fadeIn delay-100">
                        <h3
                            className="text-lg font-semibold mb-6 relative inline-block"
                            style={{ color: colorPalette.textOnPrimary }}
                        >
                            Tautan Cepat
                            <span
                                className="absolute bottom-0 left-0 w-full h-0.5"
                                style={{ backgroundColor: colorPalette.accent }}
                            ></span>
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.url}
                                        className="transition-colors duration-300 flex items-center hover:underline"
                                        style={{
                                            color: colorPalette.secondaryText,
                                        }}
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{
                                                color: colorPalette.accent,
                                            }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            ></path>
                                        </svg>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div> */}

                    {/* Contact info */}
                    <div className="animate-fadeIn delay-200">
                        <h3
                            className="text-lg font-semibold mb-6 relative inline-block"
                            style={{ color: colorPalette.textOnPrimary }}
                        >
                            Kontak Kami
                            <span
                                className="absolute bottom-0 left-0 w-full h-0.5"
                                style={{ backgroundColor: colorPalette.accent }}
                            ></span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <svg
                                    className="w-12 h-12 mr-3 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ color: colorPalette.accent }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                                <span
                                    style={{
                                        color: colorPalette.secondaryText,
                                    }}
                                >
                                    Jl. Matraman Raya No.134 5, RT.5/RW.4, Kb.
                                    Manggis, Kec. Matraman, Kota Jakarta Timur,
                                    Daerah Khusus Ibukota Jakarta 13150
                                </span>
                            </li>
                            <li className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ color: colorPalette.accent }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    ></path>
                                </svg>
                                <span
                                    style={{
                                        color: colorPalette.secondaryText,
                                    }}
                                >
                                    +62 81383822698
                                </span>
                            </li>
                            <li className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ color: colorPalette.accent }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    ></path>
                                </svg>
                                <span
                                    style={{
                                        color: colorPalette.secondaryText,
                                    }}
                                >
                                    connect@santripreneurbaznas.id
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    {/* Santripreneur BAZNAS */}
                    <div className="animate-fadeIn delay-300">
                        <h3
                            className="text-lg font-semibold mb-6 relative inline-block"
                            style={{ color: colorPalette.textOnPrimary }}
                        >
                            Santripreneur BAZNAS
                            <span
                                className="absolute bottom-0 left-0 w-full h-0.5"
                                style={{ backgroundColor: colorPalette.accent }}
                            ></span>
                        </h3>
                        <div className="space-y-2">
                            <h4
                                className="text-2xl font-bold leading-tight"
                                style={{
                                    color: colorPalette.textOnPrimary,
                                    lineHeight: "1.3",
                                }}
                            >
                                <span className="block">Santri Mandiri,</span>
                                <span className="relative inline-block">
                                    <span
                                        style={{ color: colorPalette.accent }}
                                    >
                                        Umat Berdikari
                                    </span>
                                    <span
                                        className="absolute bottom-0 left-0 w-full h-1 opacity-50"
                                        style={{
                                            backgroundColor:
                                                colorPalette.accent,
                                            transform: "skewX(-15deg)",
                                        }}
                                    ></span>
                                </span>
                            </h4>
                            <p
                                className="text-sm italic mt-3"
                                style={{
                                    color: colorPalette.secondaryText,
                                    position: "relative",
                                    paddingLeft: "20px",
                                }}
                            >
                                <span
                                    className="absolute left-0 top-1 h-3/4 w-1 rounded-full"
                                    style={{
                                        backgroundColor: colorPalette.accent,
                                    }}
                                ></span>
                                Membangun kemandirian santri untuk kemandirian
                                umat
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div
                    className="pt-8 mt-8 text-center text-sm animate-fadeIn delay-400"
                    style={{
                        borderTop: `1px solid ${colorPalette.divider}`,
                        color: colorPalette.secondaryText,
                    }}
                >
                    <p>
                        &copy; {new Date().getFullYear()} Santripreneur. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from "react";

const PreFooter = () => {
    const partners = [
        { name: "BAZNAS RI", logo: "/images/baznas.png" },

        { name: "Al Ittifaq", logo: "/images/alittifaq.png" },
        { name: "IPB", logo: "/images/ipb.png" },
    ];

    return (
        <section className="relative py-16 bg-gray-50 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-1/4 left-10 w-48 h-48 bg-[#259148] rounded-full filter blur-3xl opacity-20 animate-float1"></div>
                <div className="absolute bottom-1/3 right-20 w-40 h-40 bg-[#259148] rounded-full filter blur-3xl opacity-15 animate-float2"></div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 relative z-10">
                {/* Testimonial */}
                <div className="max-w-4xl mx-auto mb-20 text-center animate-fadeIn">
                    <svg
                        className="w-12 h-12 mx-auto text-[#259148] mb-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                    </svg>
                    <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 leading-relaxed">
                        "Santripreneur telah membuka wawasan saya bahwa menjadi
                        santri tidak hanya tentang mengaji, tapi juga bisa
                        mandiri secara ekonomi dengan bisnis yang barokah."
                    </blockquote>
                    <div className="flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#259148] bg-opacity-10 flex items-center justify-center mr-4">
                            <span className="text-xl font-bold text-[#259148]">
                                S
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">
                                Syarifuddin Musthofa (Mustav & Co)
                            </p>
                            <p className="text-sm text-gray-600">
                                Alumni Angkatan 2023
                            </p>
                        </div>
                    </div>
                </div>

                {/* Partner Logos */}
                <div className="animate-fadeIn delay-100">
                    <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
                        Didukung Oleh
                    </h3>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {partners.map((partner, index) => (
                            <div
                                key={index}
                                className="opacity-70 hover:opacity-100 transition-opacity duration-300 transform hover:scale-110"
                                style={{
                                    animationDelay: `${index * 100 + 200}ms`,
                                }}
                            >
                                {/* Replace div below with actual Image component or img tag */}

                                <div className="h-12 flex items-center">
                                    <img
                                        className="h-12"
                                        src={partner.logo}
                                        alt={partner.name}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating elements */}
            <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-[#259148] rounded-full opacity-20 animate-float3"></div>
            <div className="absolute top-1/2 right-16 w-6 h-6 bg-yellow-300 rounded-full opacity-50 animate-float4"></div>
        </section>
    );
};

export default PreFooter;

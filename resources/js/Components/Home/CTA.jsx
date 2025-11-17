import React from "react";

const RegistrationCTA = () => {
    return (
        <section className="relative py-16 md:py-28 bg-gradient-to-br from-[#259148] to-green-700 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20 animate-float1"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20 animate-float2"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-8 h-8 bg-white rounded-full opacity-20 animate-float3"></div>
            <div className="absolute bottom-20 right-20 w-12 h-12 bg-white rounded-full opacity-30 animate-float4"></div>
            <div className="absolute top-1/3 right-16 w-6 h-6 bg-yellow-300 rounded-full opacity-70 animate-float2"></div>

            <div className="container mx-auto  relative z-10">
                <div className="">
                    {/* Animated checkmarks */}
                    <div className="flex justify-center space-x-4 mb-8">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-fadeIn"
                                style={{ animationDelay: `${item * 100}ms` }}
                            >
                                <svg
                                    className="w-6 h-6 text-white animate-check"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    style={{
                                        animationDelay: `${item * 200 + 300}ms`,
                                    }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                        ))}
                    </div>

                    {/* Main content */}
                    <div>
                        <img
                            src="/images/data.jpeg"
                            alt="dataset"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bottom-0 rounded-full bg-white opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 10 + 2}px`,
                            height: `${Math.random() * 10 + 2}px`,
                            animation: `float-up ${
                                Math.random() * 1 + 1
                            }s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default RegistrationCTA;

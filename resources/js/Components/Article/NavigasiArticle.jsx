import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";

const ArticleNavigation = ({ categories }) => {
    const { url } = usePage();

    // Fungsi untuk mengecek apakah link aktif
    const isActive = (path) => {
        if (path === "/articles") {
            return url === "/articles";
        }
        return url.startsWith(path);
    };

    return (
        <nav className=" bg-gradient-to-br from-[#259148] to-[#4CAF50] shadow-xl rounded-b-2xl ">
            {/* Logo dan Menu Mobile */}
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-white group"
                    >
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            className="w-36 h-12 brightness-0 invert"
                        />
                    </Link>
                </div>

                {/* Kategori Navigation */}
                <div className={`mt-5 `}>
                    <div className="flex flex-wrap gap-2">
                        {/* All Categories Button */}
                        <Link
                            href="/articles"
                            className={`flex items-center px-4 py-2 text-white rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 mb-2 ${
                                isActive("/articles")
                                    ? "bg-[#259148] shadow shadow-white"
                                    : "bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20"
                            }`}
                        >
                            Semua Artikel
                        </Link>

                        {/* Category List */}
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/articles/category/${category.slug}`}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300 border mb-2 capitalize ${
                                    isActive(
                                        `/articles/category/${category.slug}`
                                    )
                                        ? "bg-[#259148] text-white shadow shadow-white border-transparent"
                                        : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/20"
                                }`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dekorasi Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-2 right-4 w-3 h-3 bg-yellow-400 rounded-full opacity-40 animate-pulse-slow"></div>
                <div className="absolute bottom-4 left-6 w-2 h-2 bg-emerald-400 rounded-full opacity-50 animate-ping-slow"></div>
                <div className="absolute top-4 left-1/4 w-4 h-4 bg-white rounded-full opacity-20 animate-float1"></div>
            </div>

            {/* Tambahkan style untuk glow-effect */}
            <style jsx>{`
                .glow-effect {
                    box-shadow: 0 0 10px rgba(5, 150, 105, 0.6),
                        0 0 20px rgba(5, 150, 105, 0.3);
                }
            `}</style>
        </nav>
    );
};

export default ArticleNavigation;

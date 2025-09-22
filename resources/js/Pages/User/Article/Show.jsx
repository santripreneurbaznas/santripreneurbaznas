import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    FiArrowLeft,
    FiCalendar,
    FiEye,
    FiShare2,
    FiBookmark,
    FiArrowRight,
} from "react-icons/fi";
import { toast } from "sonner";
import Toaster from "@/Components/Toater";

export default function Show({ article, recommended, categories }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    const handleShare = async () => {
        // const shareData = {
        //     title: article.title,
        //     text:
        //         article.excerpt ||
        //         article.content.replace(/<[^>]+>/g, "").substring(0, 150) +
        //             "...",
        //     url: window.location.href,
        // };

        // try {
        //     if (navigator.share) {
        //         await navigator.share(shareData);
        //         console.log("Artikel berhasil dibagikan");
        //     } else if (navigator.clipboard) {
        //         await navigator.clipboard.writeText(window.location.href);
        //         alert("Link artikel berhasil disalin ke clipboard!");
        //     } else {
        //         // Fallback terakhir
        //         const dummyInput = document.createElement("input");
        //         dummyInput.value = window.location.href;
        //         document.body.appendChild(dummyInput);
        //         dummyInput.select();
        //         document.execCommand("copy");
        //         document.body.removeChild(dummyInput);
        //         alert("Link artikel berhasil disalin!");
        //     }
        // } catch (error) {
        //     console.error("Gagal membagikan:", error);
        //     alert("Ups, ada masalah saat mencoba membagikan artikel.");
        // }
        toast.info("Fitur belum tersedia");
    };

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        // Here you would typically make an API call to save the bookmark
    };

    return (
        <>
            <Toaster />

            <Head title={article.title} />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
                {/* Background decorative elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl animate-float1"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl animate-float2"></div>
                    <div className="absolute bottom-40 left-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float3"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Breadcrumb and Back Button */}
                    <div className="mb-8 flex items-center justify-between">
                        <Link
                            href="/articles"
                            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-300"
                        >
                            <FiArrowLeft className="mr-2" />
                            Kembali ke Semua Artikel
                        </Link>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleShare}
                                className="p-2 text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
                                title="Bagikan artikel"
                            >
                                <FiShare2 size={18} />
                            </button>
                            <button
                                onClick={toggleBookmark}
                                className={`p-2 transition-colors duration-300 ${
                                    isBookmarked
                                        ? "text-amber-500 hover:text-amber-600"
                                        : "text-emerald-600 hover:text-emerald-700"
                                }`}
                                title={
                                    isBookmarked
                                        ? "Hapus bookmark"
                                        : "Simpan artikel"
                                }
                            >
                                <FiBookmark
                                    size={18}
                                    fill={
                                        isBookmarked ? "currentColor" : "none"
                                    }
                                />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Konten Utama (2/3 layout) */}
                        <div className="w-full lg:w-2/3">
                            <div
                                className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl transition-all duration-700 ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                {/* Article Image */}
                                {article.image && (
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={`/berkas/storage/${article.image}`}
                                            alt={article.title}
                                            className="w-full h-64 sm:h-80 md:h-96 object-contain transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                )}

                                {/* Article Content */}
                                <div className="p-6 md:p-8">
                                    {/* Article Meta */}
                                    <div className="flex flex-wrap items-center text-sm text-black mb-4">
                                        <div className="flex items-center mr-6 mb-2">
                                            <FiCalendar className="mr-2" />
                                            <span>
                                                {formatDate(article.created_at)}
                                            </span>
                                        </div>
                                        <div className="flex items-center mr-6 mb-2">
                                            <FiEye className="mr-2" />
                                            <span>{article.views} views</span>
                                        </div>
                                        {article.category && (
                                            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium mb-2">
                                                {article.category.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Article Title */}
                                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
                                        {article.title}
                                    </h1>

                                    {/* Article Content */}
                                    <div
                                        className="content"
                                        dangerouslySetInnerHTML={{
                                            __html: article.content,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Artikel Terkait (1/3 layout) */}
                        <div className="w-full lg:w-1/3">
                            <div
                                className={`sticky top-6 transition-all duration-700 delay-300 ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                {/* Recommended Articles */}
                                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl mb-6">
                                    <h2 className="text-xl font-bold text-emerald-900 mb-4 pb-2 border-b border-emerald-100 flex items-center">
                                        <span className="bg-emerald-900 text-white p-2 rounded-lg mr-3">
                                            <FiBookmark size={16} />
                                        </span>
                                        Artikel Terkait
                                    </h2>
                                    <div className="space-y-4">
                                        {recommended.slice(0, 4).map((rec) => (
                                            <Link
                                                key={rec.id}
                                                href={route(
                                                    "user.articles.show",
                                                    rec.slug
                                                )}
                                                className="block group"
                                            >
                                                <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors duration-300">
                                                    {rec.image && (
                                                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                                            <img
                                                                src={`/berkas/storage/${rec.image}`}
                                                                alt={rec.title}
                                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-emerald-900 text-sm leading-tight group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                                                            {rec.title}
                                                        </h3>
                                                        <p className="text-xs text-emerald-600 mt-1">
                                                            {formatDate(
                                                                rec.created_at
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
                                    <h2 className="text-xl font-bold text-emerald-900 mb-4 pb-2 border-b border-emerald-100 flex items-center">
                                        <span className="bg-emerald-900 text-white p-2 rounded-lg mr-3">
                                            <i className="fas fa-folder"></i>
                                        </span>
                                        Kategori Artikel
                                    </h2>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={`/articles/category/${category.slug}`}
                                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-emerald-50 transition-colors duration-300 group"
                                            >
                                                <span className="text-emerald-700 group-hover:text-emerald-600 font-medium">
                                                    {category.name}
                                                </span>
                                                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                                                    {category.articles_count}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Newsletter Subscription */}
                                <div className="bg-gradient-to-br from-[#259148] to-[#4CAF50] rounded-3xl p-6 text-white shadow-xl mt-6">
                                    <h3 className="text-lg font-bold mb-2">
                                        Tetap Terupdate
                                    </h3>
                                    <p className="text-sm opacity-90 mb-4">
                                        Dapatkan artikel terbaru langsung ke
                                        email Anda
                                    </p>
                                    <div className="space-y-3">
                                        <input
                                            type="email"
                                            placeholder="Email Anda"
                                            className="w-full px-4 py-2 rounded-full text-emerald-900 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                                        />
                                        <button className="w-full bg-white text-emerald-600 font-semibold py-2 rounded-full hover:bg-emerald-50 transition-colors duration-300 text-sm flex items-center justify-center">
                                            Berlangganan
                                            <FiArrowRight className="ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { FiArrowRightCircle } from "react-icons/fi";

const ListArticleUser = ({ latestArticle, articles }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    console.log(articles);

    useEffect(() => {
        setIsVisible(true);

        // Efek parallax untuk gambar utama
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector(".main-featured-image");
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/articles/search?q=${encodeURIComponent(
                searchQuery
            )}`;
        }
    };

    // Cek apakah tidak ada artikel
    const hasArticles =
        latestArticle ||
        (articles && articles.data && articles.data.length > 0);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
                {/* Background decorative elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl animate-float1"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl animate-float2"></div>
                    <div className="absolute bottom-40 left-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float3"></div>

                    {/* Floating shapes */}
                    <div className="absolute top-32 left-1/4 w-16 h-16 bg-emerald-300/30 leaf-shape animate-float4"></div>
                    <div className="absolute top-64 right-1/3 w-12 h-12 bg-teal-300/40 barrier-shape animate-float3"></div>
                    <div className="absolute bottom-52 left-20 w-14 h-14 bg-cyan-300/30 leaf-shape animate-float2"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto ">
                    {/* Header dengan Search */}
                    <header className="mb-12 text-center animate-fadeIn">
                        {/* Search Bar */}
                        <form
                            onSubmit={handleSearch}
                            className="max-w-2xl mx-auto mb-12"
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full px-6 py-4  text-lg bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-full focus:ring-4 focus:ring-gray-300 focus:border-gray-400 outline-none transition-all duration-300"
                                />
                                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-emerald-600">
                                    <i className="fas fa-search text-xl"></i>
                                </div>
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#259148] text-white px-6 py-2 rounded-full hover:bg-[#259148]/90 transition-all duration-300 "
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </header>

                    {/* Tampilkan pesan jika tidak ada artikel */}
                    {!hasArticles && (
                        <div className="text-center py-16">
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl max-w-2xl mx-auto">
                                <div className="text-6xl text-emerald-400 mb-6">
                                    <i className="fas fa-newspaper"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-emerald-900 mb-4">
                                    Artikel Tidak Ditemukan
                                </h2>
                                <p className="text-emerald-700 mb-6">
                                    Maaf, tidak ada artikel yang tersedia saat
                                    ini. Silakan coba lagi nanti atau gunakan
                                    kata kunci lain untuk pencarian.
                                </p>
                                <Link
                                    href="/articles"
                                    className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors duration-300"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Kembali ke Semua Artikel
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Featured Article (Latest) - hanya tampilkan jika ada */}
                    {latestArticle && (
                        <div className={`mb-16 transition-all duration-1000`}>
                            <Link
                                href={`/articles/${latestArticle.slug}`}
                                className="block group"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl  hover:shadow-3xl transition-all duration-500">
                                    <div className="relative overflow-hidden">
                                        {latestArticle.image && (
                                            <img
                                                src={`/storage/${latestArticle.image}`}
                                                alt={latestArticle.title}
                                                className="w-full h-96 object-contain transition-transform duration-700 group-hover:scale-110"
                                            />
                                        )}
                                        <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            Terbaru
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col justify-center">
                                        <div className="flex items-center text-black mb-4">
                                            <span className="text-sm">
                                                <i className="far fa-calendar-alt mr-2"></i>
                                                {formatDate(
                                                    latestArticle.created_at
                                                )}
                                            </span>
                                            <span className="mx-4">•</span>
                                            <span className="text-sm">
                                                <i className="far fa-eye mr-2"></i>
                                                {latestArticle.views} views
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 group-hover:text-black transition-colors duration-300 capitalize">
                                            {latestArticle.title}
                                        </h2>

                                        <div
                                            className="text-black mb-6 line-clamp-3"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    latestArticle.content.substring(
                                                        0,
                                                        200
                                                    ) + "...",
                                            }}
                                        />

                                        <div className="flex items-center text-black font-semibold">
                                            <span>Baca Selengkapnya</span>
                                            <span>
                                                <FiArrowRightCircle className="ml-2" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Articles Grid - hanya tampilkan jika ada articles.data */}
                    {articles && articles.data && articles.data.length > 0 && (
                        <div
                            className={`mb-12 transition-all duration-700 delay-200 ${
                                isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-shadow flex items-center">
                                <span className="bg-emerald-600 text-white p-2 rounded-lg mr-4">
                                    <i className="fas fa-newspaper"></i>
                                </span>
                                Artikel Lainya
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                                {articles.data.map((article, index) => (
                                    <Link
                                        key={article.id}
                                        href={`/articles/${article.slug}`}
                                        className="group bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}
                                    >
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden aspect-[4/3]">
                                            {article.image ? (
                                                <img
                                                    src={`/storage/${article.image}`}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center">
                                                    <i className="fas fa-newspaper text-2xl text-emerald-600 opacity-50"></i>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-3 md:p-4">
                                            {/* Date */}
                                            <div className="flex items-center text-black text-xs mb-2">
                                                <i className="far fa-calendar-alt text-[10px]"></i>
                                                <span className="text-[10px] md:text-xs">
                                                    {formatDate(
                                                        article.created_at
                                                    )}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-semibold text-black mb-2 line-clamp-2 group-hover:text-black/90 transition-colors duration-300 text-sm md:text-base leading-tight">
                                                {article.title}
                                            </h3>

                                            {/* Excerpt/Content Preview */}
                                            <div className="text-black mb-3 line-clamp-2 text-xs md:text-sm leading-relaxed">
                                                {article.excerpt ? (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: article.excerpt,
                                                        }}
                                                        className="prose prose-sm max-w-none"
                                                    />
                                                ) : (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                article.content.substring(
                                                                    0,
                                                                    80
                                                                ) + "...",
                                                        }}
                                                        className="prose prose-sm max-w-none"
                                                    />
                                                )}
                                            </div>

                                            {/* Read More */}
                                            <div className="flex items-center text-black text-xs md:text-sm font-semibold">
                                                <span className="text-xs">
                                                    Baca
                                                </span>
                                                <i className="fas fa-arrow-right ml-2 text-[10px] transition-transform duration-300 group-hover:translate-x-1"></i>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Load More/Pagination - hanya tampilkan jika ada articles.next_page_url */}
                    {articles && articles.next_page_url && (
                        <div className="text-center transition-all duration-700 delay-300">
                            <button className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-black hover:scale-105 transition-all duration-300 glow-effect">
                                Load More Articles
                                <i className="fas fa-arrow-down ml-2"></i>
                            </button>
                        </div>
                    )}
                </div>

                {/* Newsletter Subscription - hanya tampilkan jika ada artikel */}
                {hasArticles && (
                    <div className="relative z-10 max-w-4xl mx-auto mt-20 p-8 bg-gradient-to-br from-[#259148] to-[#4CAF50] rounded-3xl text-center text-white shadow-2xl">
                        <h3 className="text-2xl font-bold mb-4">
                            Stay Updated
                        </h3>
                        <p className="mb-6 opacity-90">
                            Subscribe to our newsletter for the latest articles
                            and updates
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-full text-emerald-900 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-colors duration-300">
                                Subscribe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ListArticleUser;

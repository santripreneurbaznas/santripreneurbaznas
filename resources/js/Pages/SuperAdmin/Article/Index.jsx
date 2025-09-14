import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const ArticleList = ({ articles, filters }) => {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const form = useForm({ name: "" });

    function createCategory(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        formData.append("name", form.data.name);

        router.post("/super-admin/articles/category", formData);

        form.reset();

        toast.success("Category created successfully!");
    }

    // Debounce search to avoid too many requests
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                "/super-admin/articles",
                { search: searchTerm },
                {
                    preserveState: true,
                    replace: true,
                    only: ["articles", "filters"],
                }
            );
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const deleteArticle = (id) => {
        if (confirm("Are you sure you want to delete this article?")) {
            router.delete(`/super-admin/articles/${id}`);
        }
    };

    const handlePerPageChange = (e) => {
        const newPerPage = e.target.value;
        router.get(
            "/super-admin/articles",
            {
                search: filters.search,
                perPage: newPerPage,
            },
            {
                preserveState: true,
                replace: true,
                only: ["articles", "filters"],
            }
        );
    };

    return (
        <>
            <Head title="Article Management" />

            <div className="">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                    {/* Table Section - 2/3 width */}
                    <div className="w-full lg:w-2/3">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg mb-6 text-white relative overflow-hidden">
                            <h1 className="text-3xl font-bold text-shadow-lg relative z-10">
                                Article Management
                            </h1>
                            <p className="mt-2 opacity-90 relative z-10">
                                Manage your articles and content
                            </p>

                            {/* Animated background elements */}
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-white opacity-10 rounded-full animate-ping-slow"></div>
                                <div className="absolute top-10 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-ping-slow delay-200"></div>
                                <div className="absolute bottom-5 left-20 w-12 h-12 bg-white opacity-10 rounded-full animate-ping-slow delay-100"></div>
                            </div>
                        </div>

                        {/* Search and Controls Box */}
                        <div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <label className="text-sm text-gray-600 whitespace-nowrap">
                                        Show:
                                    </label>
                                    <select
                                        value={filters.perPage || 3}
                                        onChange={handlePerPageChange}
                                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                                    >
                                        <option value="3">3</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                    </select>
                                    <span className="text-sm text-gray-600 whitespace-nowrap">
                                        per page
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Article
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Views
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Date
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {articles.data.length > 0 ? (
                                            articles.data.map((article) => (
                                                <tr
                                                    key={article.id}
                                                    className="hover:bg-green-50 transition-colors duration-200"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-12 w-12">
                                                                <img
                                                                    className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                                                    src={
                                                                        `/berkas/storage/${article.image}` ||
                                                                        "/placeholder-article.jpg"
                                                                    }
                                                                    alt={
                                                                        article.title
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                                    {
                                                                        article.title
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-gray-500 line-clamp-1">
                                                                    {article.slug ||
                                                                        article.slug.substring(
                                                                            0,
                                                                            60
                                                                        ) +
                                                                            "..."}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                article.views >
                                                                0
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                            }`}
                                                        >
                                                            {article.views +
                                                                " views"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(
                                                            article.created_at
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <a
                                                                href={`/super-admin/articles/${article.id}/edit`}
                                                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                                </svg>
                                                            </a>
                                                            <button
                                                                onClick={() =>
                                                                    deleteArticle(
                                                                        article.id
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="px-6 py-8 text-center text-sm text-gray-500"
                                                >
                                                    <div className="flex flex-col items-center justify-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-12 w-12 text-gray-400 mb-2"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        No articles found.
                                                        Create your first
                                                        article!
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {articles.data.length > 0 && (
                                <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Showing{" "}
                                        <span className="font-medium">
                                            {articles.from}
                                        </span>{" "}
                                        to{" "}
                                        <span className="font-medium">
                                            {articles.to}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-medium">
                                            {articles.total}
                                        </span>{" "}
                                        results
                                    </div>
                                    <div className="flex space-x-2">
                                        {/* Previous Page Button */}
                                        <button
                                            onClick={() => {
                                                if (articles.prev_page_url) {
                                                    router.get(
                                                        articles.prev_page_url,
                                                        {},
                                                        {
                                                            preserveState: true,
                                                            replace: true,
                                                            only: [
                                                                "articles",
                                                                "filters",
                                                            ],
                                                        }
                                                    );
                                                }
                                            }}
                                            disabled={!articles.prev_page_url}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                articles.prev_page_url
                                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            Previous
                                        </button>

                                        {/* Page Numbers */}
                                        {articles.links.map((link, index) => {
                                            if (
                                                index === 0 ||
                                                index ===
                                                    articles.links.length - 1
                                            )
                                                return null;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        if (link.url) {
                                                            router.get(
                                                                link.url,
                                                                {},
                                                                {
                                                                    preserveState: true,
                                                                    replace: true,
                                                                    only: [
                                                                        "articles",
                                                                        "filters",
                                                                    ],
                                                                }
                                                            );
                                                        }
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                        link.active
                                                            ? "bg-emerald-500 text-white"
                                                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                    }`}
                                                />
                                            );
                                        })}

                                        {/* Next Page Button */}
                                        <button
                                            onClick={() => {
                                                if (articles.next_page_url) {
                                                    router.get(
                                                        articles.next_page_url,
                                                        {},
                                                        {
                                                            preserveState: true,
                                                            replace: true,
                                                            only: [
                                                                "articles",
                                                                "filters",
                                                            ],
                                                        }
                                                    );
                                                }
                                            }}
                                            disabled={!articles.next_page_url}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                                articles.next_page_url
                                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Section - 1/3 width */}
                    <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
                        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-2xl shadow-lg text-white h-full flex flex-col justify-center space-y-5">
                            <div>
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-shadow mb-2">
                                        Create New Article
                                    </h2>
                                    <p className="opacity-90">
                                        Start writing and sharing your knowledge
                                        with the world
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href="/super-admin/articles/create"
                                        className="block w-full bg-white text-emerald-600 text-center font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:bg-opacity-90 transform hover:scale-105 glow-effect"
                                    >
                                        Create Article
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-shadow">
                                        New Category
                                    </h2>
                                </div>
                            </div>

                            <div>
                                <form
                                    className="space-y-4"
                                    onSubmit={createCategory}
                                >
                                    <div>
                                        <label className="block text-lg font-medium text-gray-100">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={form.data.name}
                                            onChange={(e) =>
                                                form.setData(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-emerald-600"
                                            placeholder="Enter category name"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="block w-full bg-white text-emerald-600 text-center font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:bg-opacity-90 transform hover:scale-105 glow-effect"
                                    >
                                        Create Category
                                    </button>
                                </form>
                            </div>

                            {/* Animated background elements */}
                            <div className="absolute bottom-0 right-0 overflow-hidden opacity-20">
                                <div className="w-32 h-32 bg-white rounded-full -mb-16 -mr-10 animate-ping-slow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ArticleList.layout = (page) => (
    <AuthenticatedLayout children={page}></AuthenticatedLayout>
);

export default ArticleList;

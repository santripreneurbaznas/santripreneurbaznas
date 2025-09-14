import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";

const Edit = ({ article }) => {
    const form = useForm({
        title: article.title || "",
        content: article.content || "",
        image: null,
    });
    const [editorReady, setEditorReady] = useState(false);
    const [imagePreview, setImagePreview] = useState(
        article.image ? `/storage/${article.image}` : null
    );

    useEffect(() => {
        const csrf = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        const initEditor = () => {
            if (window.CKEDITOR) {
                if (window.CKEDITOR.instances["content"]) {
                    window.CKEDITOR.instances["content"].destroy(true);
                }
                const editor = window.CKEDITOR.replace("content", {
                    filebrowserUploadUrl: `/super-admin/ckeditor/upload?_token=${csrf}`,
                    filebrowserUploadMethod: "form",
                    on: {
                        instanceReady: () => {
                            editor.setData(form.data.content); // isi dengan content lama
                            setEditorReady(true);
                        },
                    },
                });
            }
        };

        if (!window.CKEDITOR) {
            const s = document.createElement("script");
            s.src = "/plugins/ckeditor/ckeditor.js";
            s.onload = initEditor;
            document.body.appendChild(s);
            return () => {
                if (window.CKEDITOR?.instances["content"]) {
                    window.CKEDITOR.instances["content"].destroy(true);
                }
                document.body.removeChild(s);
            };
        } else {
            initEditor();
            return () => {
                if (window.CKEDITOR?.instances["content"]) {
                    window.CKEDITOR.instances["content"].destroy(true);
                }
            };
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        form.setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    function submit(e) {
        e.preventDefault();
        const contentData = window.CKEDITOR.instances["content"].getData();

        const formData = new FormData();
        formData.append("content", contentData);
        formData.append("title", form.data.title);
        if (form.data.image) {
            formData.append("image", form.data.image);
        }
        formData.append("_method", "PUT");

        router.post(`/super-admin/articles/${article.id}`, formData);
    }

    return (
        <div className="min-h-screen ">
            {/* Decorative elements */}
            <div className="fixed top-10 left-10 w-16 h-16 bg-green-200 rounded-full opacity-30 animate-float1"></div>
            <div className="fixed top-20 right-20 w-12 h-12 bg-emerald-300 rounded-full opacity-40 animate-float2"></div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative overflow-hidden">
                    <h1 className="text-3xl font-bold text-shadow-lg relative z-10">
                        Edit Article
                    </h1>
                    <p className="mt-2 opacity-90 relative z-10">
                        Update your article content
                    </p>

                    {/* Animated background elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-white opacity-10 rounded-full animate-ping-slow"></div>
                        <div className="absolute top-10 right-10 w-16 h-16 bg-white opacity-10 rounded-full animate-ping-slow delay-200"></div>
                        <div className="absolute bottom-5 left-20 w-12 h-12 bg-white opacity-10 rounded-full animate-ping-slow delay-100"></div>
                    </div>
                </div>

                <form onSubmit={submit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            value={form.data.title}
                            onChange={(e) =>
                                form.setData("title", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                            placeholder="Enter article title"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700">
                            Featured Image
                        </label>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-lg cursor-pointer border border-dashed border-emerald-300 hover:bg-emerald-200 transition-all duration-300 flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Change Image
                                </label>
                            </div>

                            {(imagePreview || article.image) && (
                                <div className="relative group">
                                    <img
                                        src={
                                            imagePreview ||
                                            `/storage/${article.image}`
                                        }
                                        alt="Preview"
                                        className="h-20 w-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity duration-300">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                form.setData("image", null);
                                                setImagePreview(null);
                                            }}
                                            className="text-white p-1 bg-red-500 rounded-full"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                            Current image will be replaced if you upload a new
                            one
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-lg font-medium text-gray-700">
                            Content
                        </label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
                            <textarea
                                id="content"
                                className="min-h-[300px]"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                        <a
                            href="/super-admin/articles"
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Back to Articles
                        </a>

                        <button
                            type="submit"
                            disabled={!editorReady}
                            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center ${
                                editorReady
                                    ? "bg-emerald-500 hover:bg-emerald-600 text-white glow-effect transform hover:scale-105"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            {editorReady ? (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Update Article
                                </>
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 animate-spin"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Loading Editor...
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

Edit.layout = (page) => (
    <AuthenticatedLayout children={page} title="Edit Article" />
);

export default Edit;

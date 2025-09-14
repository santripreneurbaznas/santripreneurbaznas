import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";

const Create = ({ categories }) => {
    const form = useForm({
        title: "",
        content: "",
        image: null,
        category_id: "",
    });
    const [editorReady, setEditorReady] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const csrf = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");

        const initEditor = () => {
            if (window.CKEDITOR) {
                if (window.CKEDITOR.instances["content"]) {
                    window.CKEDITOR.instances["content"].destroy(true);
                }
                window.CKEDITOR.replace("content", {
                    filebrowserUploadUrl: `/super-admin/ckeditor/upload?_token=${csrf}`,
                    filebrowserUploadMethod: "form",
                    on: {
                        instanceReady: () => {
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

    function submit(e) {
        e.preventDefault();
        const contentData = window.CKEDITOR.instances["content"].getData();

        const formData = new FormData(e.target);
        formData.append("content", contentData);
        formData.append("title", form.data.title);
        formData.append("image", form.data.image);
        formData.append("category_id", form.data.category_id);

        router.post("/super-admin/articles", formData);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        form.setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="">
                <div className=" bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative overflow-hidden">
                        <h1 className="text-3xl font-bold text-shadow-lg relative z-10">
                            Create New Article
                        </h1>
                        <p className="mt-2 opacity-90 relative z-10">
                            Fill in the details to create a new article
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
                                Category
                            </label>
                            <select
                                value={form.data.category_id}
                                onChange={(e) =>
                                    form.setData("category_id", e.target.value)
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">
                                Featured Image
                            </label>
                            <div className="flex items-center space-x-6">
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
                                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Choose Image
                                    </label>
                                </div>

                                {imagePreview && (
                                    <div className="relative group">
                                        <img
                                            src={imagePreview}
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

                        <div className="flex justify-end pt-4">
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
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Publish Article
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
        </AuthenticatedLayout>
    );
};

export default Create;

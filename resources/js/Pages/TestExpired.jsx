import React from "react";
import { Head, useForm } from "@inertiajs/react";

export default function TestExpired() {
    const { post } = useForm();

    const submit = (e) => {
        e.preventDefault();
        post("/super-admin/test-expired-submit");
    };

    return (
        <>
            <Head title="Test Expired Page" />

            <div className="min-h-screen flex items-center justify-center bg-green-900 text-white">
                <div className="bg-green-800 p-8 rounded-xl shadow-xl border border-green-600 max-w-md w-full">
                    <h1 className="text-3xl font-bold mb-4 text-center">
                        Test Halaman Expired
                    </h1>

                    <p className="mb-6 text-green-200 text-center">
                        Klik tombol di bawah untuk memicu error{" "}
                        <strong>419 Page Expired</strong>.
                    </p>

                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-green-300 mb-2">
                                Nama (bebas)
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-4 py-2 rounded-lg bg-green-700 border border-green-500 text-white"
                                placeholder="Ketik apapun..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full bg-green-600 hover:bg-green-500 transition-all py-3 rounded-lg font-semibold shadow-lg"
                        >
                            Submit & Lihat Halaman Expired
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

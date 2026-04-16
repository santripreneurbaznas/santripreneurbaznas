import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function Index() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
            alert("Pilih file dulu!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        router.post("/import-winners-process", formData, {
            forceFormData: true,
            onSuccess: () => {
                alert("Import berhasil!");
                setFile(null);
            },
            onError: () => {
                alert("Terjadi error!");
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
                Import Data Peserta
            </h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "10px 20px",
                        background: loading ? "#999" : "#4CAF50",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </div>
    );
}

import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function MaintenanceButtons() {
    const [downLoading, setDownLoading] = useState(false);
    const [upLoading, setUpLoading] = useState(false);
    const [message, setMessage] = useState("");

    const activateMaintenance = async () => {
        setDownLoading(true);
        setMessage("");
        try {
            const response = await router.post("/super-admin/maintenance/down");
            setMessage("Maintenance mode diaktifkan!");
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            setMessage("Gagal mengaktifkan maintenance mode");
            console.error(error);
        } finally {
            setDownLoading(false);
        }
    };

    const deactivateMaintenance = async () => {
        setUpLoading(true);
        setMessage("");
        try {
            const response = await router.post("/super-admin/maintenance/up");
            setMessage("Maintenance mode dinonaktifkan!");
            setTimeout(() => window.location.reload(), 1500);
        } catch (error) {
            setMessage("Gagal menonaktifkan maintenance mode");
            console.error(error);
        } finally {
            setUpLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex space-x-4">
                <button
                    onClick={activateMaintenance}
                    disabled={downLoading}
                    className={`px-4 py-2 rounded-md text-white ${
                        downLoading
                            ? "bg-gray-500"
                            : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                    {downLoading ? "Memproses..." : "Aktifkan Maintenance Mode"}
                </button>

                <button
                    onClick={deactivateMaintenance}
                    disabled={upLoading}
                    className={`px-4 py-2 rounded-md text-white ${
                        upLoading
                            ? "bg-gray-500"
                            : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {upLoading
                        ? "Memproses..."
                        : "Nonaktifkan Maintenance Mode"}
                </button>
            </div>

            {message && (
                <div className="p-3 rounded-md bg-blue-100 text-blue-800">
                    {message}
                </div>
            )}
        </div>
    );
}

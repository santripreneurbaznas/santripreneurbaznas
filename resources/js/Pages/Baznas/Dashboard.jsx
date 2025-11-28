import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({
    provinsiData,
    kabupatenData,
    totalPenerima,
}) {
    const cleanName = (name) => {
        if (!name) return "";
        return name
            .replace(/Kabupaten\s*/i, "")
            .replace(/Kota\s*/i, "")
            .trim();
    };

    return (
        <AuthenticatedLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Dashboard Overview
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Statistik dan analisis data penerima manfaat
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Provinsi */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-green-50 mr-4">
                                <div className="w-6 h-6 bg-gradient-to-br from-[#259148] to-[#4CAF50] rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Provinsi
                                </p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">
                                    {provinsiData.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Total Kabupaten/Kota */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-50 mr-4">
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Kabupaten/Kota
                                </p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">
                                    {kabupatenData.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Total Penerima Manfaat */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-yellow-50 mr-4">
                                <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Penerima Manfaat
                                </p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">
                                    {totalPenerima.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1  gap-6">
                    {/* Provinsi Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-lg text-gray-800">
                                Jumlah Peserta per Provinsi
                            </h3>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gradient-to-br from-[#259148] to-[#4CAF50] rounded-full"></div>
                                <span className="text-sm text-gray-600">
                                    Peserta
                                </span>
                            </div>
                        </div>

                        {/* Legend List */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-h-32 overflow-y-auto">
                            {provinsiData.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <span className="font-medium text-xs text-gray-700 truncate ">
                                        {item.province}
                                    </span>
                                    <span className="font-bold text-gray-800 text-xs bg-white px-2 py-1 rounded-md">
                                        {item.total}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="w-full h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={provinsiData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0f0f0"
                                    />
                                    <XAxis
                                        dataKey="province"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        fontSize={12}
                                        tick={{ fill: "#6b7280" }}
                                    />
                                    <YAxis
                                        fontSize={12}
                                        tick={{ fill: "#6b7280" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "1px solid #e5e7eb",
                                            boxShadow:
                                                "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        }}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="url(#colorProvinsi)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <defs>
                                        <linearGradient
                                            id="colorProvinsi"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#259148"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#4CAF50"
                                                stopOpacity={0.8}
                                            />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Kabupaten Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-lg text-gray-800">
                                Jumlah Peserta per Kabupaten/Kota
                            </h3>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                                <span className="text-sm text-gray-600">
                                    Peserta
                                </span>
                            </div>
                        </div>

                        {/* Legend List */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-h-32 overflow-y-auto">
                            {kabupatenData.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <span className="font-medium text-xs text-gray-700 truncate ">
                                        {cleanName(item.kabupaten)}
                                    </span>
                                    <span className="font-bold text-gray-800 text-xs bg-white px-2 py-1 rounded-md">
                                        {item.total}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="w-full h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={kabupatenData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#f0f0f0"
                                    />
                                    <XAxis
                                        dataKey="kabupaten"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        fontSize={12}
                                        tick={{ fill: "#6b7280" }}
                                    />
                                    <YAxis
                                        fontSize={12}
                                        tick={{ fill: "#6b7280" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "1px solid #e5e7eb",
                                            boxShadow:
                                                "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        }}
                                    />
                                    <Bar
                                        dataKey="total"
                                        fill="url(#colorKabupaten)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <defs>
                                        <linearGradient
                                            id="colorKabupaten"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#3b82f6"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#1d4ed8"
                                                stopOpacity={0.8}
                                            />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="font-semibold text-lg text-gray-800 mb-4">
                        Ringkasan Cepat
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">
                                {provinsiData.length}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Provinsi
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">
                                {kabupatenData.length}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Kabupaten/Kota
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">
                                {totalPenerima.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Total Penerima
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">
                                {provinsiData.reduce(
                                    (max, item) =>
                                        item.total > max.total ? item : max,
                                    provinsiData[0]
                                )?.province || "-"}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                Provinsi Terbanyak
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

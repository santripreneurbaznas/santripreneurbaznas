import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function SuperAdminDashboard({ auth, categories, chartData }) {
    const formatChartData = () => {
        const result = [];

        chartData.weeks.forEach((week) => {
            const weekData = { week };

            chartData.series.forEach((category) => {
                weekData[category.name] = category.data[week] || 0;
            });

            result.push(weekData);
        });

        return result;
    };

    const chartDataFormatted = formatChartData();
    // Fungsi untuk generate inisial avatar
    const getInitials = (name) => {
        if (!name) return "";
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    // Warna untuk avatar
    const avatarColors = [
        "bg-green-500",
        "bg-pink-500",
        "bg-purple-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-red-500",
        "bg-teal-500",
    ];
    const randomColor =
        avatarColors[Math.floor(Math.random() * avatarColors.length)];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Super Admin" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Bagian Kiri - Profil User */}
                        <div className="w-full lg:w-1/4">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 h-fit sticky top-6">
                                <div className="flex flex-col items-center text-center">
                                    {/* Avatar Inisial */}
                                    <div
                                        className={`bg-gradient-to-br from-[#259148] to-[#4CAF50] w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md`}
                                    >
                                        {getInitials(auth.user.name)}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800">
                                        {auth.user.name}
                                    </h3>
                                    <p className="text-gray-500 mb-2 text-sm">
                                        {auth.user.email}
                                    </p>
                                    <span className="px-3 py-1 bg-primary/10 hover:bg-primary/20  text-primary text-xs font-medium rounded-full mb-4">
                                        {auth.user.role_id === 1
                                            ? "Super Admin"
                                            : auth.user.role_id === 2
                                            ? "Admin"
                                            : "User"}
                                    </span>
                                </div>

                                <div className="mt-4 border-t pt-4">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Bergabung:
                                            </span>
                                            <span className="font-medium">
                                                {new Date(
                                                    auth.user.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="w-full ">
                                            <button
                                                onClick={() =>
                                                    router.visit(
                                                        route("profile.edit")
                                                    )
                                                }
                                                className="bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-md text-primary  text-center w-full font-semibold"
                                            >
                                                Edit Profil
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bagian Kanan - Card Kategori */}
                        <div className="w-full lg:w-3/4">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Data Registrasi
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {categories.length} Kategori Aktif
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categories.map((category) => (
                                        <div
                                            key={category.id}
                                            className="border rounded-lg p-5 hover:shadow-lg transition-all duration-300 hover:border-green-300 group"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                                                        {category.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {category.competition
                                                            ?.name ||
                                                            "No competition"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-end justify-between">
                                                <div>
                                                    <p className="text-3xl font-bold text-green-600">
                                                        {
                                                            category.registrations_count
                                                        }
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Total Registrasi
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Statistik Registrasi Bulan Ini
                            </h3>

                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={chartDataFormatted}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="week"
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 12 }}
                                            label={{
                                                value: "Jumlah Registrasi",
                                                angle: -90,
                                                position: "insideLeft",
                                                fontSize: 12,
                                            }}
                                        />
                                        <Tooltip />
                                        <Legend />
                                        {chartData.series.map(
                                            (category, index) => (
                                                <Line
                                                    key={category.name}
                                                    type="monotone"
                                                    dataKey={category.name}
                                                    stroke={category.color}
                                                    strokeWidth={2}
                                                    activeDot={{ r: 6 }}
                                                    animationDuration={1000}
                                                    animationEasing="ease-out"
                                                />
                                            )
                                        )}
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

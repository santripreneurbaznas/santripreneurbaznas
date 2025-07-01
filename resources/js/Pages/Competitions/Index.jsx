import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast } from "sonner";
import useFlashMessages from "@/Hooks/useFlashMessages";

export default function DashboardCompetitions({ auth }) {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { flash } = usePage().props;

    useFlashMessages();

    useEffect(() => {
        fetch("/api/active-competitions")
            .then((response) => response.json())
            .then((data) => {
                setCompetitions(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching competitions:", error);
                setLoading(false);
            });
    }, []);

    return (
        <AuthenticatedLayout>
            <div className="">
                <div className="">
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" bg-white  border-b border-gray-200 space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Daftar Kompetisi
                                </h1>
                                <p className="mb-4 text-gray-600 text-sm">
                                    Temukan berbagai kompetisi seru dan
                                    menantang yang siap mengasah kemampuanmu.
                                    Pilih yang sesuai minatmu dan tunjukkan
                                    potensimu!
                                </p>
                                <div className="h-[0.5px] w-full bg-gray-200"></div>
                            </div>

                            {loading ? (
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="animate-pulse bg-gray-200  rounded-lg h-24"
                                        ></div>
                                    ))}
                                </div>
                            ) : competitions.length === 0 ? (
                                <div className="text-center py-8">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
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
                                    <h3 className="mt-2 text-lg font-medium text-gray-900 ">
                                        No active competitions
                                    </h3>
                                    <p className="mt-1 text-gray-500 ">
                                        Check back later for upcoming
                                        competitions.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {competitions.map((competition) => (
                                        <div
                                            key={competition.id}
                                            className="group relative bg-white  rounded-lg border border-gray-200  p-4 hover:border-[#4CAF50] transition-colors duration-200"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-medium text-gray-900  truncate">
                                                        {competition.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                        {
                                                            competition.description
                                                        }
                                                    </p>

                                                    <div className="mt-3 flex items-center space-x-4">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <svg
                                                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            <span>
                                                                {new Date(
                                                                    competition.start_date
                                                                ).toLocaleDateString()}{" "}
                                                                -{" "}
                                                                {new Date(
                                                                    competition.end_date
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center text-sm text-gray-500 ">
                                                            <svg
                                                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                                />
                                                            </svg>
                                                            <span>
                                                                {
                                                                    competition
                                                                        .categories
                                                                        .length
                                                                }{" "}
                                                                Categories
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex-shrink-0 flex flex-col items-end">
                                                    <div className="w-full md:w-40 mb-2">
                                                        <div className="flex justify-between text-xs text-gray-500  mb-1">
                                                            <span>
                                                                Berakhir
                                                            </span>
                                                            <span>
                                                                {calculateTimePercentage(
                                                                    competition.start_date,
                                                                    competition.end_date
                                                                )}
                                                                %
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 ">
                                                            <div
                                                                className="bg-[#4CAF50] h-1.5 rounded-full"
                                                                style={{
                                                                    width: `${calculateTimePercentage(
                                                                        competition.start_date,
                                                                        competition.end_date
                                                                    )}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    <Link
                                                        href={route(
                                                            "user.competitions.register",
                                                            {
                                                                competition:
                                                                    competition.id,
                                                            }
                                                        )}
                                                        className="inline-flex items-center px-4 py-2 bg-[#4CAF50] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#259148] focus:bg-[#259148] active:bg-[#1e7e3d] focus:outline-none focus:ring-2 focus:ring-[#259148] focus:ring-offset-2  transition ease-in-out duration-150"
                                                    >
                                                        Register
                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[#4CAF50] pointer-events-none transition-all duration-200"></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function calculateTimePercentage(startDate, endDate) {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 0;
    if (now > end) return 100;

    const totalDuration = end - start;
    const elapsed = now - start;

    return Math.round((elapsed / totalDuration) * 100);
}

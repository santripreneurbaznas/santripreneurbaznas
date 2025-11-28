import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    FiAward,
    FiList,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";
import WinnerList from "../SuperAdmin/Management/WinnerList";

export default function ManagementIndex({ auth, competitions }) {
    const [expandedCompetitions, setExpandedCompetitions] = useState([]);

    const toggleCompetitionExpand = (competitionId) => {
        setExpandedCompetitions((prev) =>
            prev.includes(competitionId)
                ? prev.filter((id) => id !== competitionId)
                : [...prev, competitionId]
        );
    };

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Penerima Manfaat Santripreneur" />

            <div className="min-h-screen">
                <div className="">
                    {/* Header Section */}
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                                Penerima Manfaat Santripreneur
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Daftar Penerima Manfaat Santripreneur BAZNAS
                            </p>
                        </div>
                    </div>

                    {/* Competitions List */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {competitions.length === 0 ? (
                            <div className="p-8 text-center">
                                <FiAward className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">
                                    Belum ada kompetisi
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Buat kompetisi baru untuk memulai
                                </p>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {competitions.map((competition) => (
                                    <li
                                        key={competition.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="px-6 py-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() =>
                                                            toggleCompetitionExpand(
                                                                competition.id
                                                            )
                                                        }
                                                        className="mr-3 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {expandedCompetitions.includes(
                                                            competition.id
                                                        ) ? (
                                                            <FiChevronUp
                                                                size={20}
                                                            />
                                                        ) : (
                                                            <FiChevronDown
                                                                size={20}
                                                            />
                                                        )}
                                                    </button>
                                                    <div>
                                                        <h3 className="text-lg font-medium text-green-600 flex items-center">
                                                            {competition.name}
                                                        </h3>
                                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                                            <FiCalendar
                                                                className="mr-1"
                                                                size={14}
                                                            />
                                                            {formatDate(
                                                                competition.start_date
                                                            )}{" "}
                                                            -{" "}
                                                            {formatDate(
                                                                competition.end_date
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {expandedCompetitions.includes(
                                                competition.id
                                            ) && (
                                                <div className="mt-4 pl-9">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <h4 className="text-md font-medium flex items-center">
                                                            <FiList className="mr-2 text-green-500" />
                                                            Daftar Kategori
                                                        </h4>
                                                    </div>

                                                    {competition.categories
                                                        .length === 0 ? (
                                                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                                                            <p className="text-sm text-gray-500">
                                                                Belum ada
                                                                kategori untuk
                                                                kompetisi ini
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {competition.categories.map(
                                                                (category) => (
                                                                    <div
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                                                                    >
                                                                        <div>
                                                                            <h5 className="font-medium text-gray-900">
                                                                                {
                                                                                    category.name
                                                                                }
                                                                            </h5>
                                                                            {category.description && (
                                                                                <p className="text-sm text-gray-600 mt-1">
                                                                                    {
                                                                                        category.description
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex space-x-2">
                                                                            <WinnerList
                                                                                category={
                                                                                    category
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

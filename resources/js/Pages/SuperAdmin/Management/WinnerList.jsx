import React, { useState, useEffect } from "react";
import { FiAward, FiUsers, FiDownload, FiEye, FiEyeOff } from "react-icons/fi";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import axios from "axios";
import { toast } from "sonner";
import { HandHeart } from "lucide-react";

export default function WinnerList({ category }) {
    const [showModal, setShowModal] = useState(false);
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false);

    // Fetch data Penerima Manfaat ketika modal dibuka
    useEffect(() => {
        if (showModal) {
            fetchWinners();
        }
    }, [showModal, category.id]);

    const fetchWinners = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `/participant/categories/${category.id}/winners`
            );
            setWinners(response.data);
        } catch (error) {
            console.error("Error fetching winners:", error);
            toast.error("Gagal memuat data Penerima Manfaat");
            setWinners([]);
        } finally {
            setLoading(false);
        }
    };

    const exportToExcel = async () => {
        setExporting(true);
        try {
            const response = await axios.get(
                `/participant/categories/${category.id}/winners/export`,
                {
                    responseType: "blob",
                }
            );

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `Penerima Manfaat-${category.name}-${
                    new Date().toISOString().split("T")[0]
                }.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("Data berhasil diexport");
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Gagal mengexport data");
        } finally {
            setExporting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <>
            {/* Tombol Lihat Penerima Manfaat */}
            <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                size="small"
                icon={FiAward}
            >
                Lihat Penerima Manfaat
            </Button>

            {/* Modal List Penerima Manfaat */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title={`Daftar Penerima Manfaat - ${category.name}`}
                maxWidth="4xl"
            >
                <div className="space-y-4">
                    {/* Header Stats */}
                    <div className="bg-gradient-to-r from-green-50 to-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex lg:flex-row flex-col space-y-2 lg:space-y-0 justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <HandHeart className="text-green-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Total Penerima Manfaat
                                    </h3>
                                    <p className="text-2xl font-bold text-green-600">
                                        {winners.length} Peserta
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={exportToExcel}
                                variant="primary"
                                size="medium"
                                icon={FiDownload}
                                disabled={exporting || winners.length === 0}
                            >
                                {exporting ? "Exporting..." : "Export Excel"}
                            </Button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                            <p className="mt-2 text-gray-600">
                                Memuat data Penerima Manfaat...
                            </p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && winners.length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <FiAward className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">
                                Belum Ada Penerima Manfaat
                            </h3>
                            <p className="text-gray-500 mt-1">
                                Tidak ada Penerima Manfaat yang ditetapkan untuk
                                kategori ini.
                            </p>
                        </div>
                    )}

                    {/* Winners List */}
                    {!loading && winners.length > 0 && (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {winners.map((winner, index) => (
                                <div
                                    key={winner.id}
                                    className="bg-white border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4 flex-1">
                                            {/* Nomor Urut */}
                                            <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </div>

                                            {/* Data Peserta */}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="text-lg font-semibold text-gray-900">
                                                        {winner.user.name}
                                                    </h4>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                                    <div className="space-y-1">
                                                        <div className="flex">
                                                            <span className="font-medium w-24">
                                                                NIK:
                                                            </span>
                                                            <span>
                                                                {
                                                                    winner.user
                                                                        .nik
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="font-medium w-24">
                                                                Email:
                                                            </span>
                                                            <span>
                                                                {
                                                                    winner.user
                                                                        .email
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="font-medium w-24">
                                                                WhatsApp:
                                                            </span>
                                                            <span>
                                                                {
                                                                    winner.number_wa
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <div className="flex">
                                                            <span className="font-medium w-24">
                                                                Pesantren:
                                                            </span>
                                                            <span className="flex-1">
                                                                {
                                                                    winner.boarding_school_name
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="font-medium w-24">
                                                                TTL:
                                                            </span>
                                                            <span>
                                                                {
                                                                    winner.place_of_birth
                                                                }
                                                                ,{" "}
                                                                {formatDate(
                                                                    winner.date_of_birth
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="font-medium w-24">
                                                                Jenis Kelamin:
                                                            </span>
                                                            <span>
                                                                {winner.gender}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Alamat Lengkap */}
                                                <div className="mt-3 pt-3 border-t border-gray-200">
                                                    <div className="flex">
                                                        <span className="font-medium text-sm w-20">
                                                            Alamat:
                                                        </span>
                                                        <span className="text-sm text-gray-600 flex-1">
                                                            {winner.address},{" "}
                                                            {winner.kelurahan},{" "}
                                                            {winner.kecamatan},{" "}
                                                            {winner.kabupaten},{" "}
                                                            {winner.province}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                            {winners.length} Penerima Manfaat ditemukan
                        </div>
                        <Button
                            onClick={() => setShowModal(false)}
                            variant="secondary"
                            size="medium"
                        >
                            Tutup
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

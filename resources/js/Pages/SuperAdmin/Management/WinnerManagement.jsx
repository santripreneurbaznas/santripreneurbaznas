import React, { useState } from "react";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import {
    FiAward,
    FiSearch,
    FiUser,
    FiPlus,
    FiTrash2,
    FiUsers,
    FiCheck,
    FiUpload,
    FiFile,
    FiX,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function WinnerManagement({ category }) {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedWinners, setSelectedWinners] = useState([]);
    const [importing, setImporting] = useState(false);
    const [showImportSection, setShowImportSection] = useState(false);
    const [importResults, setImportResults] = useState({
        found: [],
        notFound: [],
        duplicates: [],
    });

    // Fungsi untuk mencari peserta berdasarkan NIK
    const searchParticipants = async () => {
        if (!searchQuery.trim()) {
            toast.error("Masukkan NIK untuk mencari");
            return;
        }

        setSearching(true);
        try {
            const response = await axios.get(
                `/super-admin/registrations/search`,
                {
                    params: {
                        nik: searchQuery,
                        category_id: category.id,
                    },
                }
            );

            if (response.data.length === 0) {
                toast.error("Peserta tidak ditemukan");
                setSearchResults([]);
            } else {
                setSearchResults(response.data);
            }
        } catch (error) {
            console.error("Search error:", error);
            toast.error("Gagal mencari peserta");
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    // Tambah peserta ke list pemenang
    const addToWinnerList = (participant) => {
        const isAlreadyAdded = selectedWinners.some(
            (winner) => winner.id === participant.id
        );

        if (isAlreadyAdded) {
            toast.error("Peserta sudah ada dalam list pemenang");
            return;
        }

        setSelectedWinners((prev) => [...prev, participant]);
        setSearchQuery("");
        setSearchResults([]);
        toast.success("Peserta ditambahkan ke list pemenang");
    };

    // Hapus peserta dari list pemenang
    const removeFromWinnerList = (participantId) => {
        setSelectedWinners((prev) =>
            prev.filter((winner) => winner.id !== participantId)
        );
        toast.success("Peserta dihapus dari list pemenang");
    };

    // Handle file import
    const handleFileImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validasi file type
        if (!file.name.match(/\.(xlsx|xls)$/)) {
            toast.error("Hanya file Excel (.xlsx, .xls) yang diizinkan");
            return;
        }

        setImporting(true);
        setImportResults({ found: [], notFound: [], duplicates: [] });

        try {
            const data = await readExcelFile(file);
            const niks = extractNIKsFromData(data);

            if (niks.length === 0) {
                toast.error("Tidak ditemukan NIK dalam file Excel");
                return;
            }

            await processImportedNIKs(niks);
        } catch (error) {
            console.error("Import error:", error);
            toast.error("Gagal memproses file Excel");
        } finally {
            setImporting(false);
            event.target.value = ""; // Reset file input
        }
    };

    // Read Excel file
    const readExcelFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: "array" });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    };

    // Extract NIKs from Excel data
    const extractNIKsFromData = (data) => {
        const niks = new Set();

        data.forEach((row) => {
            // Cari kolom yang berisi NIK (case insensitive)
            Object.keys(row).forEach((key) => {
                const value = row[key];
                if (typeof value === "string" || typeof value === "number") {
                    const strValue = value.toString().trim();
                    // Validasi NIK (16 digit angka)
                    if (/^\d{16}$/.test(strValue)) {
                        niks.add(strValue);
                    }
                }
            });
        });

        return Array.from(niks);
    };

    // Process imported NIKs
    const processImportedNIKs = async (niks) => {
        try {
            const response = await axios.post(
                "/super-admin/registrations/bulk-search",
                {
                    niks: niks,
                    category_id: category.id,
                }
            );

            const { found, not_found } = response.data;

            // Filter out duplicates yang sudah ada di selectedWinners
            const existingIds = new Set(selectedWinners.map((w) => w.id));
            const newFound = found.filter(
                (participant) => !existingIds.has(participant.id)
            );
            const duplicates = found.filter((participant) =>
                existingIds.has(participant.id)
            );

            setImportResults({
                found: newFound,
                notFound: not_found,
                duplicates: duplicates,
            });

            // Auto-add found participants
            if (newFound.length > 0) {
                setSelectedWinners((prev) => [...prev, ...newFound]);
                toast.success(
                    `${newFound.length} peserta berhasil ditambahkan dari file`
                );
            }

            // Show summary
            let summary = `Import selesai: `;
            if (newFound.length > 0)
                summary += `${newFound.length} ditemukan & ditambahkan, `;
            if (duplicates.length > 0)
                summary += `${duplicates.length} duplikat (sudah ada), `;
            if (not_found.length > 0)
                summary += `${not_found.length} tidak ditemukan`;

            toast.info(summary);
        } catch (error) {
            console.error("Bulk search error:", error);
            toast.error("Gagal memproses NIK dari file");
        }
    };

    // Add all found participants from import
    const addAllFromImport = () => {
        setSelectedWinners((prev) => [...prev, ...importResults.found]);
        setImportResults((prev) => ({ ...prev, found: [] }));
        toast.success(
            `Semua ${importResults.found.length} peserta ditambahkan`
        );
    };

    // Submit pemenang dengan AXIOS
    const handleSubmitWinners = async () => {
        if (selectedWinners.length === 0) {
            toast.error("Pilih minimal 1 pemenang");
            return;
        }

        const winnerIds = selectedWinners.map((winner) => winner.id);
        const formData = {
            category_id: category.id,
            winners: winnerIds,
        };

        console.log("Submitting data:", formData);

        setSubmitting(true);

        try {
            const response = await axios.post(
                route("superadmin.winners.set"),
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                    },
                }
            );

            console.log("Response:", response);

            if (response.status === 200) {
                toast.success("Pemenang berhasil ditetapkan");
                setShowModal(false);
                setSelectedWinners([]);
                setSearchQuery("");
                setSearchResults([]);
                setImportResults({ found: [], notFound: [], duplicates: [] });
                setShowImportSection(false);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Submission error:", error);

            if (error.response) {
                const errors = error.response.data.errors;
                console.log("Error details:", errors);

                if (errors?.winners) {
                    toast.error("Data pemenang tidak valid");
                } else if (errors?.category_id) {
                    toast.error("Kategori tidak valid");
                } else {
                    toast.error(
                        error.response.data.message ||
                            "Gagal menetapkan pemenang"
                    );
                }
            } else if (error.request) {
                console.error("No response received:", error.request);
                toast.error("Tidak ada respon dari server");
            } else {
                console.error("Error:", error.message);
                toast.error("Terjadi kesalahan");
            }
        } finally {
            setSubmitting(false);
        }
    };

    // Reset modal
    const resetModal = () => {
        setSelectedWinners([]);
        setSearchQuery("");
        setSearchResults([]);
        setImportResults({ found: [], notFound: [], duplicates: [] });
        setShowImportSection(false);
        setShowModal(false);
    };

    return (
        <>
            {/* Tombol Tambah Pemenang */}
            <Button
                onClick={() => setShowModal(true)}
                variant="primary"
                size="small"
                icon={FiAward}
            >
                Tambah Pemenang
            </Button>

            {/* Modal Tambah Pemenang */}
            <Modal
                show={showModal}
                onClose={resetModal}
                title={`Tambah Pemenang - ${category.name}`}
                maxWidth="4xl"
            >
                <div className="space-y-6">
                    {/* Import Section Toggle */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">
                            Tambah Pemenang
                        </h3>
                        <Button
                            onClick={() =>
                                setShowImportSection(!showImportSection)
                            }
                            variant={
                                showImportSection ? "secondary" : "primary"
                            }
                            size="medium"
                            icon={FiUpload}
                        >
                            {showImportSection
                                ? "Tutup Import"
                                : "Import dari Excel"}
                        </Button>
                    </div>

                    {/* Import Section */}
                    {showImportSection && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h3 className="text-lg font-medium text-green-900 mb-3 flex items-center">
                                <FiUpload className="mr-2" />
                                Import dari File Excel
                            </h3>

                            <div className="space-y-4">
                                {/* File Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-green-700 mb-2">
                                        Upload File Excel (.xlsx, .xls)
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex-1">
                                            <input
                                                type="file"
                                                accept=".xlsx,.xls"
                                                onChange={handleFileImport}
                                                className="hidden"
                                                disabled={importing}
                                            />
                                            <div
                                                className={`flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                                    importing
                                                        ? "border-green-300 bg-green-100"
                                                        : "border-green-300 hover:border-green-400 hover:bg-green-100"
                                                }`}
                                            >
                                                <FiFile className="text-green-500 mr-2" />
                                                <span className="text-green-700">
                                                    {importing
                                                        ? "Memproses..."
                                                        : "Pilih file Excel"}
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                    <p className="text-xs text-green-600 mt-2">
                                        File harus berisi kolom dengan NIK (16
                                        digit). Sistem akan otomatis mendeteksi
                                        kolom NIK.
                                    </p>
                                </div>

                                {/* Import Results */}
                                {(importResults.found.length > 0 ||
                                    importResults.notFound.length > 0 ||
                                    importResults.duplicates.length > 0) && (
                                    <div className="space-y-3">
                                        {/* Found Participants */}
                                        {importResults.found.length > 0 && (
                                            <div className="bg-green-50 p-3 rounded-lg">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium text-green-800">
                                                        Ditemukan:{" "}
                                                        {
                                                            importResults.found
                                                                .length
                                                        }{" "}
                                                        peserta
                                                    </span>
                                                    <Button
                                                        onClick={
                                                            addAllFromImport
                                                        }
                                                        variant="success"
                                                        size="small"
                                                        icon={FiPlus}
                                                    >
                                                        Tambah Semua
                                                    </Button>
                                                </div>
                                                <div className="space-y-2">
                                                    {importResults.found.map(
                                                        (
                                                            participant,
                                                            index
                                                        ) => (
                                                            <div
                                                                key={
                                                                    participant.id
                                                                }
                                                                className="flex justify-between items-center text-sm"
                                                            >
                                                                <span>
                                                                    {
                                                                        participant
                                                                            .user
                                                                            .name
                                                                    }{" "}
                                                                    (NIK:{" "}
                                                                    {
                                                                        participant
                                                                            .user
                                                                            .nik
                                                                    }
                                                                    )
                                                                </span>
                                                                <Button
                                                                    onClick={() =>
                                                                        addToWinnerList(
                                                                            participant
                                                                        )
                                                                    }
                                                                    variant="success"
                                                                    size="small"
                                                                    icon={
                                                                        FiPlus
                                                                    }
                                                                >
                                                                    Tambah
                                                                </Button>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Duplicates */}
                                        {importResults.duplicates.length >
                                            0 && (
                                            <div className="bg-yellow-50 p-3 rounded-lg">
                                                <span className="text-sm font-medium text-yellow-800">
                                                    Duplikat (sudah ada):{" "}
                                                    {
                                                        importResults.duplicates
                                                            .length
                                                    }{" "}
                                                    peserta
                                                </span>
                                            </div>
                                        )}

                                        {/* Not Found */}
                                        {importResults.notFound.length > 0 && (
                                            <div className="bg-red-50 p-3 rounded-lg">
                                                <span className="text-sm font-medium text-red-800">
                                                    Tidak ditemukan:{" "}
                                                    {
                                                        importResults.notFound
                                                            .length
                                                    }{" "}
                                                    NIK
                                                </span>
                                                <div className="mt-1 text-xs text-red-700">
                                                    {importResults.notFound
                                                        .slice(0, 10)
                                                        .join(", ")}
                                                    {importResults.notFound
                                                        .length > 10 &&
                                                        ` ...dan ${
                                                            importResults
                                                                .notFound
                                                                .length - 10
                                                        } lainnya`}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Manual Search Section */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-green-900 mb-3 flex items-center">
                            <FiSearch className="mr-2" />
                            Cari Manual Berdasarkan NIK
                        </h3>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Masukkan NIK peserta..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") searchParticipants();
                                }}
                                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                disabled={searching}
                            />
                            <Button
                                onClick={searchParticipants}
                                variant="primary"
                                size="medium"
                                icon={FiSearch}
                                disabled={searching || !searchQuery.trim()}
                            >
                                {searching ? "Mencari..." : "Cari"}
                            </Button>
                        </div>

                        {/* Search Results */}
                        {searchResults.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h4 className="text-sm font-medium text-green-800">
                                    Hasil Pencarian:
                                </h4>
                                {searchResults.map((participant) => (
                                    <div
                                        key={participant.id}
                                        className="bg-white p-3 rounded-lg border border-green-200 flex justify-between items-center"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <FiUser className="text-green-500 mr-2" />
                                                <span className="font-medium">
                                                    {participant.user.name}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                <div>
                                                    NIK: {participant.user.nik}
                                                </div>
                                                <div>
                                                    Email:{" "}
                                                    {participant.user.email}
                                                </div>
                                                <div>
                                                    WhatsApp:{" "}
                                                    {participant.number_wa}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() =>
                                                addToWinnerList(participant)
                                            }
                                            variant="success"
                                            size="small"
                                            icon={FiPlus}
                                        >
                                            Tambah
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Selected Winners List */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-green-900 mb-3 flex items-center">
                            <FiUsers className="mr-2" />
                            List Pemenang yang Dipilih
                            <span className="ml-2 bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">
                                {selectedWinners.length} peserta
                            </span>
                        </h3>

                        {selectedWinners.length === 0 ? (
                            <div className="text-center py-4 text-green-700">
                                <FiUsers className="mx-auto h-8 w-8 mb-2 opacity-50" />
                                <p>Belum ada pemenang yang dipilih</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {selectedWinners.map((winner, index) => (
                                    <div
                                        key={winner.id}
                                        className="bg-white p-4 rounded-lg border border-green-200 flex justify-between items-center"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3">
                                                        {index + 1}
                                                    </div>
                                                    <span className="font-medium">
                                                        {winner.user.name}
                                                    </span>
                                                </div>
                                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    NIK: {winner.user.nik}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 mt-2 ml-9">
                                                <div>
                                                    Pesantren:{" "}
                                                    {
                                                        winner.boarding_school_name
                                                    }
                                                </div>
                                                <div>
                                                    WhatsApp: {winner.number_wa}
                                                </div>
                                                <div>
                                                    Alamat: {winner.address},{" "}
                                                    {winner.kelurahan},{" "}
                                                    {winner.kecamatan}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() =>
                                                removeFromWinnerList(winner.id)
                                            }
                                            variant="danger"
                                            size="small"
                                            icon={FiTrash2}
                                            className="ml-2"
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                            Total {selectedWinners.length} pemenang dipilih
                        </div>
                        <div className="flex space-x-3">
                            <Button
                                onClick={resetModal}
                                variant="secondary"
                                size="medium"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleSubmitWinners}
                                variant="primary"
                                size="medium"
                                icon={FiCheck}
                                disabled={
                                    submitting || selectedWinners.length === 0
                                }
                            >
                                {submitting
                                    ? "Memproses..."
                                    : "Tambahkan sebagai Pemenang"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

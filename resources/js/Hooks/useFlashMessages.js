// Buat file useFlashMessages.js
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

export default function useFlashMessages() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.error) {
            toast.error(flash.error);
        }
        if (flash.success) {
            toast.success(flash.success);
        }
        // Tambahkan tipe flash message lainnya sesuai kebutuhan
    }, [flash]);
}

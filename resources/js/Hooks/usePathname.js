import { usePage } from "@inertiajs/react";

export function usePathname() {
    const { url } = usePage();
    return url;
}

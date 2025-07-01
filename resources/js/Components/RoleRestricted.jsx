// resources/js/Components/RoleRestricted.jsx

import { useEffect } from "react";
import { router, usePage } from "@inertiajs/react";

export default function RoleRestricted({ allowedRoles, children }) {
    const { auth } = usePage().props;

    useEffect(() => {
        if (!allowedRoles.includes(auth.user.role_id)) {
            router.visit("/dashboard");
        }
    }, [allowedRoles, auth.user.role_id]);

    return allowedRoles.includes(auth.user.role_id) ? children : null;
}

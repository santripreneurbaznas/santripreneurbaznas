import { useState, useEffect } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { usePathname } from "@/Hooks/usePathname";
import { Icons } from "./Icons";
import Toaster from "@/Components/Toater";

export default function AuthenticatedLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const { auth } = usePage().props;
    const pathname = usePathname();

    // console.log(pathname);

    // Close mobile sidebar when route changes
    useEffect(() => {
        setMobileSidebarOpen(false);
    }, [pathname]);

    // Navigation items
    const navItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <Icons.dashboard className="w-5 h-5" />,
            allowedRoles: [3, 2, 1],
        },
        {
            name: "Data Peserta",
            href: "/super-admin/users",
            icon: <Icons.orders className="w-5 h-5" />,
            allowedRoles: [1],
        },
        {
            name: "Admin Akses",
            href: "/super-admin/admin-access",
            icon: <Icons.orders className="w-5 h-5" />,
            allowedRoles: [1],
        },
        {
            name: "Program",
            href: "/super-admin/management",
            icon: <Icons.orders className="w-5 h-5" />,
            allowedRoles: [1],
        },
        {
            name: "Pendaftaran",
            href: "/admin/registrations",
            icon: <Icons.portfolio className="w-5 h-5" />,
            allowedRoles: [2],
        },
        {
            name: "Daftar Lomba",
            href: "/user/competitions",
            icon: <Icons.services className="w-5 h-5" />,
            allowedRoles: [3],
        },
        {
            name: "Pendaftaran Saya",
            href: "/user/my-registrations",
            icon: <Icons.testimonials className="w-5 h-5" />,
            allowedRoles: [3],
        },

        {
            name: "Pengaturan",
            href: "/profile",
            icon: <Icons.setting className="w-5 h-5" />,
            allowedRoles: [1, 2, 3],
        },
    ];

    const filteredNavItems = navItems.filter((item) =>
        item.allowedRoles.includes(auth.user.role_id)
    );

    // console.log(auth);

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 ">
            <Toaster />
            {/* Mobile sidebar backdrop */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Collapsible Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 bg-white  shadow-xl transition-all duration-300 ease-in-out ${
                    sidebarOpen ? "w-64" : "w-20"
                } ${
                    mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-gradient-to-br from-[#259148] to-[#4CAF50] relative overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-0 "
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `twinkle ${
                                    Math.random() * 3 + 5
                                }s infinite ${Math.random() * 0.5}s`,
                            }}
                        ></div>
                    ))}

                    <Link href="/dashboard" className="z-10">
                        {sidebarOpen ? (
                            <div className="flex items-center justify-center">
                                <img
                                    src="/images/logo.png"
                                    alt=""
                                    className="w-[140px] brightness-0 invert"
                                />
                            </div>
                        ) : (
                            <>
                                <img
                                    src="/favicons/android-chrome-192x192.png"
                                    alt=""
                                    className="h-8 w-8 brightness-0 invert"
                                />
                            </>
                        )}
                    </Link>
                    {sidebarOpen && (
                        <button
                            onClick={() => setMobileSidebarOpen(false)}
                            className="p-1 rounded-md text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white lg:hidden z-10"
                        >
                            <Icons.close className="w-6 h-6" />
                        </button>
                    )}
                </div>

                <div className="overflow-y-auto h-[calc(100vh-4rem)] py-4 px-3 bg-white ">
                    <nav>
                        <ul className="space-y-1">
                            {filteredNavItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center p-3 rounded-lg hover:bg-[#259148]/10  transition-all duration-200 ${
                                            sidebarOpen
                                                ? "hover:translate-x-1 hover:shadow-sm"
                                                : ""
                                        } ${
                                            pathname === item.href
                                                ? "bg-[#259148]/10 text-[#259148]  font-medium border-l-4 border-[#259148] "
                                                : "text-gray-700 "
                                        }`}
                                    >
                                        <span className="mr-3">
                                            {item.icon}
                                        </span>
                                        {sidebarOpen && (
                                            <>
                                                <span>{item.name}</span>
                                                {pathname === item.href && (
                                                    <span className="ml-auto w-2 h-2 rounded-full bg-[#259148]  animate-pulse"></span>
                                                )}
                                            </>
                                        )}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className={`flex items-center p-3 rounded-lg hover:bg-[#259148]/10  transition-all duration-200 w-full text-gray-700 ${
                                        sidebarOpen
                                            ? "hover:translate-x-1 hover:shadow-sm"
                                            : ""
                                    }`}
                                >
                                    <Icons.logout className="w-5 h-5 mr-3" />
                                    {sidebarOpen && (
                                        <>
                                            <span>Keluar</span>
                                        </>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Sidebar footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200  bg-white ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#259148] to-[#4CAF50] flex items-center justify-center text-white">
                                {auth.user.name?.charAt(0) || (
                                    <Icons.user className="w-5 h-5" />
                                )}
                            </div>
                            {sidebarOpen && (
                                <div>
                                    <p className="text-sm font-medium text-gray-700 ">
                                        {auth.user.name}
                                    </p>
                                    <p className="text-xs text-gray-500  capitalize">
                                        {auth.user.role}
                                    </p>
                                </div>
                            )}
                        </div>
                        {sidebarOpen && (
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-gray-500 hover:text-gray-700  hover:bg-gray-100 p-2 rounded-full transition-colors"
                            >
                                <Icons.logout className="w-5 h-5" />
                            </Link>
                        )}
                    </div>
                </div>
            </aside>

            {/* Static Content Area */}
            <div
                className={`flex-1 flex flex-col overflow-hidden ${
                    sidebarOpen ? "lg:ml-64" : "lg:ml-20"
                }`}
            >
                {/* Header */}
                <header className="bg-white  shadow-sm z-10 glass-effect">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center">
                            <button
                                onClick={() => setMobileSidebarOpen(true)}
                                className="p-2 rounded-md text-gray-500 hover:text-gray-700  hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-[#0b1d51] lg:hidden transition-colors"
                            >
                                <Icons.menu className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-md text-gray-500 hover:text-gray-700  hover:bg-gray-100  hidden lg:block transition-colors"
                            >
                                <div className="relative w-6 h-6">
                                    <Icons.chevronLeft
                                        className={`w-6 h-6 absolute transition-all duration-300 ${
                                            sidebarOpen
                                                ? "opacity-100 rotate-0"
                                                : "opacity-0 -rotate-90"
                                        }`}
                                    />
                                    <Icons.chevronRight
                                        className={`w-6 h-6 absolute transition-all duration-300 ${
                                            sidebarOpen
                                                ? "opacity-0 rotate-90"
                                                : "opacity-100 rotate-0"
                                        }`}
                                    />
                                </div>
                            </button>
                            <h1 className="ml-4 text-lg font-semibold text-gray-800 ">
                                {navItems.find((item) => item.href === pathname)
                                    ?.name || "Dashboard"}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="flex items-center space-x-2 focus:outline-none group">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#259148] to-[#4CAF50] flex items-center justify-center text-white">
                                        {auth.user.name?.charAt(0) || (
                                            <Icons.user className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="hidden md:flex flex-col items-start">
                                        <span className="hidden md:inline-block text-sm font-medium text-gray-700  group-hover:text-[#0b1d51]  transition-colors capitalize">
                                            {auth.user.name}
                                        </span>
                                        <span className="hidden md:inline-block text-[12px] font-medium text-gray-700  group-hover:text-[#0b1d51]  transition-colors">
                                            {auth.user.email}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100  p-4 md:p-6">
                    <div className="mx-auto lg:max-w-6xl">
                        <div className="animate-fadeIn bg-white  rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow duration-300">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

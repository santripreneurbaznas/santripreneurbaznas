import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Program", href: "/#program" },
        { name: "Tentang Kami", href: "/#tentang-kami" },
        { name: "Kompetisi", href: "/kompetisi" },
    ];

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-500 ${
                isScrolled ? "py-2" : "py-4"
            }`}
        >
            <motion.div
                animate={{
                    scale: isScrolled ? 0.95 : 1,
                    backgroundColor: isScrolled
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgba(255, 255, 255, 0)",
                    backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
                    boxShadow: isScrolled
                        ? "0 4px 30px rgba(0, 0, 0, 0.1)"
                        : "none",
                }}
                className={`container mx-auto  rounded-xl h-16  ${
                    isScrolled ? "border border-white border-opacity-20" : ""
                }`}
            >
                <div className="flex justify-between items-center h-full px-4">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center"
                    >
                        <img
                            src="/images/logo.png"
                            alt="Logo Santripreneur"
                            className={`w-36 h-12 transition-all duration-300 ${
                                isScrolled
                                    ? "brightness-100"
                                    : "brightness-0 invert"
                            }`}
                        />
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className={`font-semibold transition-colors duration-300 ${
                                    isScrolled ? "text-primary" : "text-white"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <motion.button
                            onClick={() => (window.location.href = "/login")}
                            whileHover={{ scale: 0.9 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-[#FFC107] py-2 px-4 font-semibold rounded-lg text-primary  mx-auto border-2 border-white"
                        >
                            Daftar Sekarang
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`md:hidden  ${
                            isScrolled ? "text-primary" : "text-white"
                        }`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <FiX size={24} />
                        ) : (
                            <FiMenu size={24} />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`md:hidden mt-4 overflow-hidden rounded-lg shadow-lg ${
                                isScrolled ? "bg-white" : "bg-primary"
                            }`}
                        >
                            <div className="flex flex-col space-y-4 pb-4">
                                {navLinks.map((link) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className={`font-medium py-2 px-4 rounded-lg ${
                                            isScrolled
                                                ? "text-primary hover:text-primary/90"
                                                : "text-white"
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <div className="flex items-center  pt-2 border-t border-gray-200">
                                    <motion.button
                                        onClick={() =>
                                            (window.location.href = "/login")
                                        }
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-[#FFC107] p-2 rounded-lg text-white w-1/2 mx-auto"
                                    >
                                        Daftar sekarang
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;

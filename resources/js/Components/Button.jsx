import React from "react";
import { motion } from "framer-motion";

const Button = ({
    children,
    className = "",
    type = "button",
    onClick,
    disabled = false,
    variant = "primary",
    size = "medium",
    icon: Icon,
    iconPosition = "left",
    isLoading = false,
    ...props
}) => {
    const baseClasses =
        "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center";

    const sizeClasses = {
        small: "px-3 py-1.5 text-xs",
        medium: "px-4 py-2 text-sm",
        large: "px-6 py-3 text-base",
    };

    const variantClasses = {
        primary:
            "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500 shadow-md hover:shadow-lg",
        secondary:
            "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 border border-gray-300",
        danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-md hover:shadow-lg",
        success:
            "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500 shadow-md hover:shadow-lg",
        ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-200",
    };

    const disabledClasses = "opacity-50 cursor-not-allowed";

    return (
        <motion.button
            type={type}
            className={`${baseClasses} ${sizeClasses[size]} ${
                variantClasses[variant]
            } ${disabled || isLoading ? disabledClasses : ""} ${className}`}
            onClick={onClick}
            disabled={disabled || isLoading}
            whileHover={!disabled && !isLoading ? { scale: 1.03 } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
            {...props}
        >
            {isLoading ? (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            ) : (
                Icon &&
                iconPosition === "left" && (
                    <Icon
                        className={`mr-2 ${
                            size === "small" ? "w-3 h-3" : "w-4 h-4"
                        }`}
                    />
                )
            )}
            {children}
            {Icon && iconPosition === "right" && !isLoading && (
                <Icon
                    className={`ml-2 ${
                        size === "small" ? "w-3 h-3" : "w-4 h-4"
                    }`}
                />
            )}
        </motion.button>
    );
};

export default Button;

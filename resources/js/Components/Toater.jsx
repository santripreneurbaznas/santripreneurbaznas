import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
    return (
        <Sonner
            theme="light" // Anda bisa menambahkan logika tema dark/light jika diperlukan
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: `group toast group-[.toaster]:bg-gradient-to-r group-[.toaster]:from-[#0b1d51] group-[.toaster]:to-[#4DA8DA]
            group-[.toaster]:text-white group-[.toaster]:border-0 group-[.toaster]:shadow-lg
            group-[.toaster]:rounded-lg group-[.toaster]:p-4`,

                    title: "group-[.toast]:font-bold group-[.toast]:text-lg",

                    description:
                        "group-[.toast]:text-white/90 group-[.toast]:text-sm",

                    actionButton: `group-[.toast]:bg-white group-[.toast]:text-[#0b1d51]
            group-[.toast]:font-medium group-[.toast]:border-0
            group-[.toast]:hover:bg-white/90 group-[.toast]:transition-all`,

                    cancelButton: `group-[.toast]:bg-transparent group-[.toast]:text-white
            group-[.toast]:border group-[.toast]:border-white/20
            group-[.toast]:hover:bg-white/10 group-[.toast]:transition-all`,

                    closeButton:
                        "group-[.toast]:text-white/80 hover:group-[.toast]:text-white",

                    // Variasi warna untuk tipe toast berbeda
                    success: `group-[.toast]:bg-gradient-to-r group-[.toast]:from-green-600 group-[.toast]:to-green-500`,

                    error: `group-[.toast]:bg-gradient-to-r group-[.toast]:from-red-600 group-[.toast]:to-red-500`,

                    warning: `group-[.toast]:bg-gradient-to-r group-[.toast]:from-yellow-600 group-[.toast]:to-yellow-500`,

                    info: `group-[.toast]:bg-gradient-to-r group-[.toast]:from-blue-600 group-[.toast]:to-blue-500`,

                    loading: `group-[.toast]:bg-gradient-to-r group-[.toast]:from-[#0b1d51] group-[.toast]:to-[#0b1d51]/80`,
                },
            }}
            position="top-right"
            duration={5000}
            visibleToasts={3}
            richColors
            {...props}
        />
    );
};

export default Toaster;

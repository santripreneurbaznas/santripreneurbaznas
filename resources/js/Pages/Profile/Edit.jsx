import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { FiUser, FiLock, FiMail, FiCheck } from "react-icons/fi";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div className="py-8">
                <div className="max-w-5xl mx-auto lg:px-8 space-y-6">
                    {/* Profile Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-[#259148] to-[#4CAF50] flex items-center justify-center text-white text-4xl font-bold mb-4">
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {auth.user.name}
                        </h1>
                        <p className="text-gray-600 mt-1">{auth.user.email}</p>
                    </div>

                    {/* Profile Sections */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Profile Information Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            </div>
                        </div>

                        {/* Password Update Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <UpdatePasswordForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

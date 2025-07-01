import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Button from "@/Components/Button";
import { FiUser, FiMail, FiCheckCircle } from "react-icons/fi";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className,
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <div className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <FiUser className="mr-2 text-blue-500" />
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel for="name" value="Name" />
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FiUser />
                        </div>
                        <TextInput
                            id="name"
                            className="block w-full pl-10"
                            value={data.name}
                            handleChange={(e) =>
                                setData("name", e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="name"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel for="email" value="Email" />
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FiMail />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            className="block w-full pl-10"
                            value={data.email}
                            handleChange={(e) =>
                                setData("email", e.target.value)
                            }
                            required
                            autoComplete="email"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-yellow-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    Your email address is unverified.
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="ml-1 underline text-sm text-yellow-700 hover:text-yellow-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                    >
                                        Click here to re-send the verification
                                        email.
                                    </Link>
                                </p>
                                {status === "verification-link-sent" && (
                                    <div className="mt-2 text-sm text-green-700">
                                        A new verification link has been sent to
                                        your email address.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        disabled={processing}
                        variant="primary"
                        className="min-w-[120px]"
                    >
                        Save Changes
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="flex items-center text-sm text-green-600">
                            <FiCheckCircle className="mr-1" />
                            Saved successfully
                        </div>
                    </Transition>
                </div>
            </form>
        </div>
    );
}

import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Button from "@/Components/Button";
import { FiLock, FiCheckCircle } from "react-icons/fi";

export default function UpdatePasswordForm({ className }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <div className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <FiLock className="mr-2 text-blue-500" />
                    Update Password
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <InputLabel
                        for="current_password"
                        value="Current Password"
                    />
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FiLock />
                        </div>
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            handleChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            type="password"
                            className="block w-full pl-10"
                            autoComplete="current-password"
                        />
                    </div>
                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel for="password" value="New Password" />
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FiLock />
                        </div>
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            handleChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            className="block w-full pl-10"
                            autoComplete="new-password"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        for="password_confirmation"
                        value="Confirm Password"
                    />
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <FiLock />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            handleChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type="password"
                            className="block w-full pl-10"
                            autoComplete="new-password"
                        />
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        processing={processing}
                        variant="primary"
                        className="min-w-[120px]"
                    >
                        Update Password
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
                            Password updated
                        </div>
                    </Transition>
                </div>
            </form>
        </div>
    );
}

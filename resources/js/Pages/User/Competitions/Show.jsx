// resources/js/Pages/User/Competitions/Show.jsx
// import { Head, useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function CompetitionShow({ competition }) {
    const { data, setData, post, processing, errors } = useForm({
        competition_id: competition.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("user.competitions.register", competition.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={competition.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-4">
                                {competition.name}
                            </h1>
                            <p className="text-gray-600 mb-2">
                                Category: {competition.category.name}
                            </p>
                            <p className="text-gray-600 mb-2">
                                Start Date:{" "}
                                {new Date(
                                    competition.start_date
                                ).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600 mb-4">
                                End Date:{" "}
                                {new Date(
                                    competition.end_date
                                ).toLocaleDateString()}
                            </p>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">
                                    Description
                                </h2>
                                <p className="text-gray-700">
                                    {competition.description}
                                </p>
                            </div>

                            <form onSubmit={submit}>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={processing}
                                >
                                    Register for this Competition
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

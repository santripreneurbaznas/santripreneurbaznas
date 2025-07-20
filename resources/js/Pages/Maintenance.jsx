import MaintenanceButtons from "@/Components/MaintenanceButtons";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Maintenance = () => {
    return (
        <AuthenticatedLayout>
            <h2 className="text-xl font-semibold mb-4">
                Maintenance Mode Control
            </h2>

            <MaintenanceButtons />
        </AuthenticatedLayout>
    );
};
export default Maintenance;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { ScrollArea } from "@/components/ui/scroll-area";

function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <ScrollArea className="h-full w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-12">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </ScrollArea>
        </>
    );
}

Edit.layout = (page) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
            children={page}
        ></AuthenticatedLayout>
    );
};

export default Edit;

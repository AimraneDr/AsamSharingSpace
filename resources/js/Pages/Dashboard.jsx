import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Head } from '@inertiajs/react';

function Dashboard({ auth }) {
    return (
        <>
            <Head title="Dashboard" />

            <ScrollArea className="w-full h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
        </ScrollArea>
        </>
    );
}

Dashboard.layout = (page)=>{
    return(
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            children={page}
        ></AuthenticatedLayout>
    )
}

export default Dashboard;
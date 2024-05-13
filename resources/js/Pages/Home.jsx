import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Head } from '@inertiajs/react';

const Home = ({ auth }) => {


    return (
        <>
            <Head title="Welcome" />
            <ScrollArea className="w-full h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="font-bold text-3xl text-oxford_blue-300">
                        Home Page
                    </h1>
                </div>
            </ScrollArea>
        </>
    );
}
Home.layout = (page) => {
    return (
        <AuthenticatedLayout>
            {page}
        </AuthenticatedLayout>
    );
};

export default Home;
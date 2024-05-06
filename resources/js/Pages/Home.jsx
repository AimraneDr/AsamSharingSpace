import { Head } from '@inertiajs/react';

export default function Home({ auth }) {


    return (
        <>
            <Head title="Welcome" />
            <div className='w-full h-screen'>
                <h1 className='font-bold text-3xl text-black'>Home Page</h1>
            </div>
        </>
    );
}

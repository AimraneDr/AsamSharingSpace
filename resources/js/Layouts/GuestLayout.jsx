import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ title, children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gunmetal text-blue_(ncs)-700 gradiant-blue">
            <div className="relative text-3xl font-bold after:size-[130%] after:border-2 after:border-moonstone-900 after:absolute after:-bottom-0.5 after:-right-1 after:rounded before:size-[130%] before:border-2 before:border-moonstone-900 before:absolute before:-top-1 before:-left-2 before:rounded">
                {title}
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-moonstone/50 shadow-lg shadow-white/20 overflow-hidden sm:rounded-lg text-moonstone-900">
                {children}
            </div>
        </div>
    );
}

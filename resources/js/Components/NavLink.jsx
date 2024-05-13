import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-4 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-oxford_blue-700 text-oxford_blue focus:border-oxford_blue-700 "
                    : "border-transparent text-moonstone-900 hover:text-oxford_blue hover:border-oxford_blue focus:text-oxford_blue focus:border-moonstone-900 ") +
                className
            }
        >
            {children}
        </Link>
    );
}

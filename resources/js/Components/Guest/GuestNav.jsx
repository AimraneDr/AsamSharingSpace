import ApplicationLogo from "../ApplicationLogo";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";


export default function GuestNav(){

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <nav id="header" className={`fixed w-full z-30 top-0 text-white ${scrolled && 'bg-white shadow-xl'}`}>
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="pl-4 flex items-center">
                    <Link className={`${scrolled ? 'text-gray-800' : 'text-white'} no-underline hover:no-underline font-bold text-2xl lg:text-4xl`} href="/home">
                        <ApplicationLogo className="w-10 inline mr-3"/>
                        <span>sharing-space</span>
                    </Link>
                </div>
                <div className="block lg:hidden pr-4">
                    <button id="nav-toggle" className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                    </button>
                </div>
                <div className={`w-full flex-grow lg:flex lg:items-center gap-4 lg:w-auto hidden mt-2 lg:mt-0 bg-[#d8675f] lg:bg-transparent text-black p-4 py-10 lg:p-0 z-20 ${scrolled ? 'bg-white' : 'bg-gray-100'}`} id="nav-content">
                    <ul className="list-reset lg:flex justify-center flex-1 items-center mb-4 lg:mb-0">
                        <li className="mr-3">
                            <a className="inline-block py-2 px-4 text-white lg:text-black font-bold no-underline" href="#">about</a>
                        </li>
                        <li className="mr-3">
                            <a className="inline-block text-white lg:text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">contact</a>
                        </li>
                        <li className="mr-3">
                            <a className="inline-block text-white lg:text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#">dashboard</a>
                        </li>
                    </ul>
                    <ul className="flex items-center gap-4 px-2 py-1">
                        <li>
                            <a href="/login"
                                id="loginAction"
                                className={`mx-auto lg:mx-0 ${scrolled ? 'gradient' : 'bg-transparent'} text-white border-2 border-white font-extrabold hover:bg-white hover:bg-opacity-20 rounded-full mt-4 lg:mt-0 py-3 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out`}>
                            Login</a>
                        </li>
                        <li>
                            <a href=""
                                id="signupAction"
                                className={`mx-auto lg:mx-0 bg-white text-gray-800 hover:bg-opacity-90 font-bold ${scrolled ? 'border-2 py-3' : 'py-4'} border-[#b01b4d] rounded-full mt-4 lg:mt-0 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out`}>
                            SignUp</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
        </nav>
    )
}
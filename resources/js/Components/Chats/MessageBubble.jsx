import { useAuth } from "@/Contexts/AuthContext";
import { useEffect, useRef, useState } from "react";

export default function MessageBubble({ msg, i }) {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldFlip, setShouldFlip] = useState(true);
    const { user } = useAuth();
    const dropdownRef = useRef(null);
    const btnRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            event.preventDefault();
            setIsOpen(false);
            console.log(`btn id is : ${event.target.id}`);
            console.log("outside click event callbackl");
            setShouldFlip(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div key={i}
            className={`flex items-start gap-2.5 m-2 w-fit ${
                user.id === msg.sender_id
                    ? "self-end flex-row-reverse"
                    : "self-start"
            }`}
        >
            {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/> */}
            <div
                className={`flex flex-col w-full max-w-[520px] leading-1.5 py-1 p-4 border-2 dark:bg-gray-700 rounded-3xl ${
                    user.id === msg.sender_id
                        ? "rounded-tr-none border-teal-500 bg-teal-100"
                        : "rounded-tl-none border-slate-500 bg-violet-50"
                }`}
            >
                {/* 
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Bonnie Green
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        11:46
                    </span>
                </div>
                 */}
                <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">
                    {msg.content}
                </p>
                <div
                    className={`flex justify-between pb-0 m-0 text-sm font-normal text-gray-500 dark:text-gray-400 ${
                        user.id === msg.sender_id ? "flex-row-reverse" : ""
                    }`}
                >
                    <span>{msg.status}</span>
                    <span>{msg.sendTime}</span>
                </div>
            </div>
            <div className="relative items-center " id="options-btn">
                <button
                    ref={btnRef}
                    onClick={(e) => {
                        e.preventDefault();
                        if(shouldFlip) setIsOpen(true);
                        setShouldFlip(true)
                        console.log("btn click event callbackl");
                    }}
                    className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                    type="button"
                >
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 4 15"
                    >
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                </button>
                {isOpen && (
                    <div
                        id="options-dropdown-area"
                        ref={dropdownRef}
                        className={`z-10 absolute top-0 ${
                            user.id === msg.sender_id
                                ? "right-full"
                                : "left-full"
                        } bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600`}
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li key='reply'>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Reply
                                </a>
                            </li>
                            <li key='Forward'>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Forward
                                </a>
                            </li>
                            <li key='Copy'>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Copy
                                </a>
                            </li>
                            <li key='Report'>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Report
                                </a>
                            </li>
                            <li key='Delete'>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

import { useAuth } from "@/Contexts/AuthContext";
import React, { useEffect, useRef, useState } from "react";

const MessageBubble = React.forwardRef(
    ({ msg, i, unsaved, showHeader }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const { user } = useAuth();
        const dropdownRef = useRef(null);
        const btnRef = useRef(null);

        const [hour, minute] = msg.sendTime.split(":"); // Split the time string by ':'

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                btnRef.current &&
                !btnRef.current.contains(event.target)
            ) {
                event.preventDefault();

                /*
                 *   NOTE: I have no idea why it needs to check for the inverse of isOpen
                 *   but it wrks !!!
                 */
                if (!isOpen) {
                    setIsOpen(false);
                }
            }
        };

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        return (
            <div
                ref={ref}
                key={i}
                className={`flex items-start gap-2 gap-x-1 m-1 w-fit ${
                    user.id === msg.sender_id
                        ? "self-end flex-row-reverse"
                        : "self-start"
                }`}
            >
                <div
                    className={`flex flex-col w-full max-w-[520px] h-fit max-h-[250px] leading-1.5 py-1 p-1 border-2 dark:bg-gray-700 rounded-3xl ${
                        user.id === msg.sender_id
                            ? `rounded-tr-none ${
                                  unsaved
                                      ? "border-slate-500 bg-slate-200 text-slate-500"
                                      : "border-teal-500 bg-teal-100"
                              }`
                            : `rounded-tl-none border-slate-500 bg-violet-50`
                    }`}
                >
                    {showHeader && (
                        <div
                            className={`flex pb-1 justify-between items-center gap-4 border-b-[1px] border-slate-300 ${
                                user.id === msg.sender_id
                                    ? "flex-row-reverse pl-2"
                                    : "pr-2"
                            }`}
                        >
                            <div className="size-7 rounded-full bg-teal-500">
                                <img
                                    src="../../assets/images/user/user-02.png"
                                    alt="User"
                                />
                            </div>
                            <span className="text-sm text-slate-500">
                                {`${msg.sender.firstname} ${msg.sender.lastname}`}
                            </span>
                        </div>
                    )}
                    <p className="text-sm font-normal py-2 pr-2 pl-1 text-gray-900 dark:text-white text-wrap break-words">
                        {msg.content}
                    </p>
                    <div
                        className={`flex justify-between gap-4 px-2.5 pb-0 m-0 text-sm font-normal text-gray-500 dark:text-gray-400 ${
                            user.id === msg.sender_id ? "flex-row-reverse" : ""
                        }`}
                    >
                        <span>{msg.status}</span>
                        <span>
                            {hour}:{minute}
                        </span>
                    </div>
                </div>
                <div className="relative items-center " id="options-btn">
                    <button
                        ref={btnRef}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }}
                        className="inline-flex self-center items-center p-2 px-0 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-1 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
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
                    {isOpen == true && (
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
                                <li key="reply">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Reply
                                    </a>
                                </li>
                                <li key="Forward">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Forward
                                    </a>
                                </li>
                                <li key="Copy">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Copy
                                    </a>
                                </li>
                                <li key="Report">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Report
                                    </a>
                                </li>
                                <li key="Delete">
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
);

export default MessageBubble;

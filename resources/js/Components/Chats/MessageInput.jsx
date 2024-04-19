import { useState } from "react";
import axios from "axios";

export default function MessageInput({ chat, user }) {
    //for the form
    const [formData, setFormData] = useState({
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const now = new Date();

    // Format date as YYYY-MM-DD
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

    // Format time as HH:MM:SS
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!chat || !user) return;

        try {
            const response = await axios.post(
                `/api/chats/${chat.id}/messages/send`,
                {
                    content: formData.message,
                    chat_id: chat.id,
                    sender_id: user.id,
                    attachment: "",
                    status: "out",
                    sendDate: formattedDate,
                    sendTime: formattedTime,
                }
            );

            // Reset form fields after submission
            setFormData({
                message: "",
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        // <form className="w-full h-fit">
        //     <label for="chat" class="sr-only">
        //         Your message
        //     </label>
        //     <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        //         <button
        //             type="button"
        //             class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        //         >
        //             <svg
        //                 class="w-5 h-5"
        //                 aria-hidden="true"
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 fill="none"
        //                 viewBox="0 0 20 18"
        //             >
        //                 <path
        //                     fill="currentColor"
        //                     d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
        //                 />
        //                 <path
        //                     stroke="currentColor"
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     stroke-width="2"
        //                     d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
        //                 />
        //                 <path
        //                     stroke="currentColor"
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     stroke-width="2"
        //                     d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
        //                 />
        //             </svg>
        //             <span class="sr-only">Upload image</span>
        //         </button>
        //         <button
        //             type="button"
        //             class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        //         >
        //             <svg
        //                 class="w-5 h-5"
        //                 aria-hidden="true"
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 fill="none"
        //                 viewBox="0 0 20 20"
        //             >
        //                 <path
        //                     stroke="currentColor"
        //                     stroke-linecap="round"
        //                     stroke-linejoin="round"
        //                     stroke-width="2"
        //                     d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
        //                 />
        //             </svg>
        //             <span class="sr-only">Add emoji</span>
        //         </button>
        //         <textarea
        //             id="chat"
        //             rows="1"
        //             class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //             placeholder="Your message..."
        //         ></textarea>
        //         <button
        //             type="submit"
        //             class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        //         >
        //             <svg
        //                 class="w-5 h-5 rotate-90 rtl:-rotate-90"
        //                 aria-hidden="true"
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 fill="currentColor"
        //                 viewBox="0 0 18 20"
        //             >
        //                 <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
        //             </svg>
        //             <span class="sr-only">Send message</span>
        //         </button>
        //     </div>
        // </form>

        <form action="" className="flex w-full gap-4">
            {/* Textarea */}
            <div className="relative w-full">
                <textarea
                    id="hs-textarea-ex-2"
                    className="w-full p-4 pb-5 bg-teal-50 border-gray-200 rounded-lg text-lg focus:border-teal-500 focus:ring-teal-500"
                    placeholder="type your message..."
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                ></textarea>

                {/* Toolbar */}
                <div className="absolute bottom-px inset-x-px p-3 rounded-b-md bg-gray-100">
                    <div className="flex justify-between items-center">
                        {/* Button Group */}
                        <div className="flex items-center">
                            {/* Attach Button */}
                            <button
                                type="button"
                                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-teal-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <svg
                                    className="flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                </svg>
                            </button>
                            {/* End Attach Button */}
                        </div>
                        {/* End Button Group */}

                        {/* Button Group */}
                        <div className="flex items-center gap-x-1">
                            {/* Send Button */}
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-teal-500 hover:bg-teal-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <svg
                                    className="flex-shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path>
                                </svg>
                            </button>
                            {/* End Send Button */}
                        </div>
                        {/* End Button Group */}
                    </div>
                </div>
                {/* End Toolbar */}
            </div>
            {/* End Textarea */}
        </form>
    );
}

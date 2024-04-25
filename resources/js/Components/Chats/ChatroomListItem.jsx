import { useChat } from "@/Contexts/ChatContext";
import { useState } from "react";

export default function ChatroomListItem({ chat, user_id, opened, onClick }) {
    const [lastMsg, setLastMsg] = useState({ msg: "", time: "" });
    const { open } = useChat();
    let title;
    switch (chat.type) {
        case "private":
            //set title to the reciver name
            title = chat.users[0].firstname + " " + chat.users[0].lastname;
            break;
        case "group":
            title = chat.title;
            break;

        default:
            break;
    }
    return (
        <li
            key={`${chat.id}`}
            className="p-0 m-0"
            onClick={(e) => {
                e.preventDefault();
                open(chat);
                onClick();
            }}
        >
            <a
                className={`grid grid-cols-4 m-0 gap-6 max-w-full border-t border-stroke px-4.5 py-3 hover:bg-teal-50 transition-all duration-150 ease-in-out dark:border-strokedark dark:hover:bg-meta-4 ${
                    opened && "bg-teal-100"
                }`}
            >
                <div className="col-span-3 flex flex-col justify-end">
                    <h6 className="text-md font-bold text-black dark:text-white truncate">
                        {title || "unnamed chat"}
                    </h6>
                    <p className="text-sm">{lastMsg.msg || "somthing here"}</p>
                    <p className="text-xs">2min ago</p>
                </div>
                <div className="cols-span-1 size-12 rounded-full ">
                    <img
                        className=""
                        src="../../assets/images/user/user-02.png"
                        alt="User"
                    />
                </div>
            </a>
        </li>
    );
}

import { useEffect, useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useAuth } from "@/Contexts/AuthContext";
// import pusher from "@/echo";

export default function Chatroom({ chat, className }) {
    //for the listview
    //messages to be displayed
    const [messages, setMessages] = useState([]);

    const { user } = useAuth();

    useEffect(() => {
        if (!chat) return;

        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `/api/chats/${chat.id}/messages`
                );
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [chat]);

    useEffect(() => {
        if (chat) {
            const channelName = `chat.${chat.id}`;

            // Listen for incoming messages
            var channel = window.Echo.private(channelName);
            channel.listen(".MessageSentEvent", (data) => {
                alert(`EVERY BODY,  : ${data}`);
            });


            // Clean up subscription when component unmounts
            return () => {
                channel.unsubscribe();
            };
        }
    }, [chat]);

    return (
        <div className={`grid grid-cols-1 grid-rows-12 w-full ${className}`}>
            {/* Chat Room Info */}
            <div className="row-span-1 px-4 py-4 bg-teal-700 text-teal-50 flex justify-start items-center gap-4">
                <div className="size-10 rounded-full bg-teal-500">
                    <img
                        src="../../assets/images/user/user-02.png"
                        alt="User"
                    />
                </div>
                <div className="flex flex-col items-start justify-center text-md font-extrabold">
                    <span>{chat ? chat.title : "empyt"}</span>
                    <span className="text-xs font-light">Last seen : </span>
                </div>
            </div>
            {/* Chat Room Content */}
            <div className="row-span-9 w-full h-full border-r-[1px] border-meta-4 flex flex-col overflow-y-auto p-4 scroll">
                {messages.map((m, i) => {
                    return <MessageBubble i={i} msg={m} />
                })}
            </div>
            {/* Message Input */}
            <div className="row-span-2 p-3 flex items-center shadow">
                <MessageInput chat={chat} user={user} />
            </div>
        </div>
    );
}

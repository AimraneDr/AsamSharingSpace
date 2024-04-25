import ChatroomListItem from "@/Components/Chats/ChatroomListItem";
import Chatroom from "@/Components/Chats/chatroom";
import { ChatProvider } from "@/Contexts/ChatContext";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Chats({ user }) {
    const [currentChat, setCurrentChat] = useState(null);
    const [toggleChatList, setToggleChatList] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640); // Set true if viewport width is less than 640px
        };

        // Initial check on component mount
        handleResize();

        // Listen for window resize events to update state
        window.addEventListener("resize", handleResize);

        const channelName = `presence.user.${user.id}`;
        var channel = window.Echo.join(channelName);
        // channel.here()
        // channel.joining()
        channel.leaving((user) => {
            console.log("user is leaving");
            // debugger;
            axios.post(`api/users/${user.id}/last_seen`, {});
        });
        channel.error((err) => {
            console.error(err);
        });

        // Trigger leaving event when the user navigates away
        const handleBeforeUnload = () => {
            channel.leave(); // Manually trigger leaving the channel
            // debugger;
            // handleLeaving(); // Handle leaving action
        };
        // Listen for beforeunload event to trigger leaving action
        window.addEventListener("beforeunload", handleBeforeUnload);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.Echo.leave(channelName);
            console.log("Leaving");
            // debugger;
        };
    }, []);

    return (
        <Authenticated user={user}>
            <ChatProvider chatRef={currentChat}>
                <div className="z-0 flex flex-row-reverse w-full h-full">
                    {/* Contact list - Chat rooms */}
                    {isSmallScreen && toggleChatList && (
                        <div
                            className="z-1 absolute bg-slate-600 bg-opacity-30 top-0 left-0 bottom-0 right-0"
                            onClick={(e) => {
                                e.preventDefault();
                                setToggleChatList(false);
                            }}
                        ></div>
                    )}
                    <ul
                        className={`z-9 flex flex-col h-full overflow-y-auto lg:w-[40%] p-4 transition-all duration-200 ease-in-out max-sm:absolute  max-sm:bg-white
                    ${isSmallScreen && !toggleChatList && "left-full hidden"}`}
                    >
                        {user.chats.map((c) => {
                            return (
                                <ChatroomListItem
                                    chat={c}
                                    user_id={user.id}
                                    opened={c === currentChat}
                                    onClick={() => {
                                        setToggleChatList(false);
                                    }}
                                />
                            );
                        })}
                    </ul>
                    <Chatroom
                        isSmallScreen={isSmallScreen}
                        toggleChatList={toggleChatList}
                        setToggleChatList={setToggleChatList}
                    />
                </div>
            </ChatProvider>
        </Authenticated>
    );
}

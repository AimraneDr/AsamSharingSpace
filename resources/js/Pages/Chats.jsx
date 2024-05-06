import ConversationHeader from "@/Components/App/Conversation/ConversationHeader";
import MessageInput from "@/Components/App/Conversation/MessageInput";
import MessageItem from "@/Components/App/Conversation/MessageItem";
import { useEventBus } from "@/EventBus";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useRef, useState } from "react";

function Chats({ messages, selectedConversation }) {
    const [localMessages, setLocalMessages] = useState([]);
    const [noMoreMessages, setNoMoreMessages] = useState(false);
    const [scrollFromBottom, setScrollFromBottom] = useState(0);
    const MessagesContainerRef = useRef(null);
    const loadOlderIntersected = useRef(null);
    const { on } = useEventBus();

    const messageRecieved = (message) => {
        if (
            selectedConversation &&
            selectedConversation.is_group &&
            selectedConversation.id == message.group_id
        ) {
            setLocalMessages((prev) => [...prev, message]);
        }
        if (
            selectedConversation &&
            selectedConversation.is_conversation &&
            selectedConversation.id == message.conversation_id
        ) {
            setLocalMessages((prev) => [...prev, message]);
        }
    };

    const LoadMoreMessages = useCallback(() => {
        if (noMoreMessages) return;

        const firstMessage = localMessages[0];
        axios
            .get(route("messages.loadOlder", firstMessage.id))
            .then(({ data }) => {
                if (data.data.length === 0) {
                    setNoMoreMessages(true);
                    return;
                }

                const scrollHeight = MessagesContainerRef.current.scrollHeight;
                const scrollTop = MessagesContainerRef.current.scrollTop;
                const clientHeight = MessagesContainerRef.current.clientHeight;

                setScrollFromBottom(scrollHeight - scrollTop - clientHeight);

                setLocalMessages((prev) => [...data.data.reverse(), ...prev]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [localMessages, noMoreMessages]);

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            MessagesContainerRef.current.scrollTop =
                MessagesContainerRef.current.scrollHeight;
        }, 10);

        const offResieved = on("message.recieved", messageRecieved);

        setScrollFromBottom(0);
        setNoMoreMessages(false);

        return () => {
            offResieved();
        };
    }, [selectedConversation]);

    useEffect(() => {
        if (MessagesContainerRef.current && scrollFromBottom !== null) {
            MessagesContainerRef.current.scrollTop =
                MessagesContainerRef.current.scrollHeight -
                MessagesContainerRef.current.offsetHeight -
                scrollFromBottom;
        }
        if (noMoreMessages) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach(
                    (entry) => entry.isIntersecting && LoadMoreMessages()
                ),
            { rootMargin: "0px 0px 250px 0px" }
        );
        if(loadOlderIntersected.current){
            setTimeout(() => {
                observer.observe(loadOlderIntersected.current);
            }, 100);
        }

        return ()=>{
            observer.disconnect();
        }
    }, [localMessages]);
    return (
        <>
            {!messages ? (
                <div className="flex flex-col gap-8 justify-center items-center text-center h-full opacity-35">
                    <div className="text-2xl font-bold md:text-4xl p-16 text-slate-600">
                        No Conversation is selected.
                    </div>
                    <ChatBubbleLeftRightIcon className="w-32 h-32 inline-block" />
                </div>
            ) : (
                <>
                    <ConversationHeader conversation={selectedConversation} />
                    <div
                        className="flex-1 overflow-y-auto p-5"
                        ref={MessagesContainerRef}
                    >
                        {localMessages.length === 0 ? (
                            <div className="flex flex-col gap-8 justify-center items-center text-center h-full opacity-35">
                                <div className="text-2xl font-bold md:text-4xl p-16 text-slate-600">
                                    Conversation is Empty, start chatting by
                                    sending a message!
                                </div>
                                <ChatBubbleLeftRightIcon className="w-32 h-32 inline-block" />
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col">
                                <div
                                    ref={loadOlderIntersected}
                                ></div>
                                {localMessages.map((m) => (
                                    <MessageItem key={m.id} message={m} />
                                ))}
                            </div>
                        )}
                    </div>
                    <MessageInput conversation={selectedConversation} />
                </>
            )}
        </>
    );
}

Chats.layout = (page) => {
    return (
        <AuthenticatedLayout>
            <ChatLayout children={page}></ChatLayout>
        </AuthenticatedLayout>
    );
};

export default Chats;

import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import ConversationItem from "@/Components/App/Conversation/ConversationItem";
import { useEventBus } from "@/EventBus";

function ChatLayout({ children }) {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const user = page.props.auth.user;
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const {on} = useEventBus();

    const { emit } = useEventBus();

    const [onlineUsers, setONlineUsers] = useState([]);

    const isUserOnline = (user) =>
        onlineUsers.find((u) => u.id === user.id) ? true : false;

    const onSearch = (e) => {
        e.preventDefault();
        const search = e.target.value.toLowerCase();
        setLocalConversations(
            conversations.filter((conversation) => {
                return conversation.name.tolowerCase().include(search);
            })
        );
    };

    const messageRecieved = (message) => [
        setLocalConversations((old) => {
            return old.map((conversation) => {
                if (
                    (conversation.is_conversation &&
                        conversation.id == message.conversation_id) ||
                    (conversation.is_group &&
                        conversation.id == message.group_id)
                ) {
                    conversation.last_message_date = message.created_at;
                    conversation.last_message = message.content;
                    // conversation.unread_count = conversation.unread_count + 1;
                    return conversation;
                }
                return conversation;
            });
        }),
    ];

    useEffect(()=>{
        const offRecieved = on("message.recieved",messageRecieved);
        return()=>{
            offRecieved();
        }
    },[on])
    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if (a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }

                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    );
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                }
            })
        );
    }, [localConversations]);

    useEffect(() => {
        setLocalConversations(conversations);
        //messages.conversation.4
        conversations.forEach((conversation) => {
            const channelName = conversation.is_group
                ? `messages.group.` + conversation.id
                : `messages.conversation.` + conversation.id;
            Echo.private(channelName)
                .listen(".message.sent", (data) => {
                    const { message } = data;
                    // console.log("message.recieved", message);
                    emit("message.recieved", message);
                    if (message.sender_id === user.id) return;
                    emit("NewMessageNotification", {
                        user: message.sender,
                        group_id: message.group_id,
                        conversation_id: message.conversation_id,
                        message:
                            message.content ||
                            `Shared ${
                                message.attachments.length === 1
                                    ? "an attachment"
                                    : message.attachments.length +
                                      " attachments"
                            }`,
                    });
                })
                .error((err) => {
                    console.error(err);
                });
        });

        return () => {
            conversations.forEach((conversation) => {
                let channelName = conversation.is_group
                    ? `message.group.${conversation.id}`
                    : `messages.conversation.${conversation.id}`;
                Echo.leave(channelName);
            });
        };
    }, [conversations]);

    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                //cast users to any form wanted
                const newUsers = users.map((u) => u);
                setONlineUsers([...newUsers]);
            })
            .joining((user) => {
                setONlineUsers((prev) => {
                    const updatedUsers = prev ? [...prev] : [];
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
            })
            .leaving((user) => {
                setONlineUsers((prev) => {
                    const updatedUsers = prev ? [...prev] : [];
                    delete updatedUsers[user.id];
                    return updatedUsers;
                });
            })
            .error((err) => {
                console.error(err);
            });

        return () => {
            Echo.leave("online");
        };
    }, []);
    return (
        <div className="h-full w-full flex">
            <div
                className={`transition-all w-full sm:w-[220px] md:w-[300px] bg-slate-800 flex flex-col overflow-hidden ${
                    selectedConversation && "-ml-[100%] sm:ml-0"
                }`}
            >
                <div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
                    All Conversations
                    <div
                        className="tooltip tooltip-left"
                        data-tip="Create New Group"
                    >
                        <button className="text-gray-400 hover:text-gray-200">
                            <PencilSquareIcon className="w-4 h-4 inline-block ml-2" />
                        </button>
                    </div>
                </div>
                <div className="p-3">
                    <TextInput
                        onKeyUp={onSearch}
                        placeholder="Search for Groups and Users"
                        className="w-full"
                    />
                </div>
                <div className="flex-1 overflow-auto h-screen">
                    {sortedConversations ? (
                        sortedConversations.map((c) => (
                            <ConversationItem
                                key={`${
                                    c.is_group ? "group_" : "conversation_"
                                }${c.id}`}
                                conversation={c}
                                online={
                                    c.end_user
                                        ? isUserOnline(c.end_user)
                                        : false
                                }
                                selectedConversation={selectedConversation}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}

export default ChatLayout;

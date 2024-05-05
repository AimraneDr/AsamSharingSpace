import MessageInput from "./MessageInput";
import { useAuth } from "@/Contexts/AuthContext";
import ArrowSvg from "../svgs/ArrowSvg";
import { useChat } from "@/Contexts/ChatContext";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import ImageViewer from "./ImageViewer";
// import pusher from "@/echo";

export default function Chatroom({
    isSmallScreen,
    toggleChatList,
    setToggleChatList,
    className,
}) {
    //for the listview
    //messages to be displayed
    const [unsavedMessages, setUnsavedMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [presentUsers, setPresentUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const lastMsg = useRef();
    const { chat, imageInView } = useChat();
    const { user } = useAuth();

    let lastMessageRefIsSet = false;
    let totalMsgs = 0;

    const appendMsg = (msg) => {
        setUnsavedMessages((pre) => [...pre, msg]);
    };

    const messageSent = (id) => {
        const updatedMessages = unsavedMessages.filter((msg) => msg.id !== id);
        setUnsavedMessages(updatedMessages);
    };

    const presentUserExists = (user_id) => {
        return presentUsers.some((u) => u.id === user_id);
    };
    useEffect(() => {
        console.log("presentUsers updated:", presentUsers);
    }, [presentUsers]); // Trigger when presentUsers state changes

    useEffect(() => {
        if (!chat) return;

        const fetchMessage = async (id) => {
            try {
                const response = await axios.get(
                    `/api/chats/${chat.id}/message/${id}`,
                    {
                        buffer: 10, //how many messages to get
                        offset_id: 0, // from witch message start to get (0 means from last)
                    }
                );
                const message = response.data;
                setMessages((prevMessagesGroup) => {
                    // [...prevMessages, response.data]
                    let foundGroup = false;
                    const updatedMessages = prevMessagesGroup.map((g) => {
                        if (g.date === message.sendDate) {
                            foundGroup = true;
                            return {
                                date: g.date,
                                messages: [...g.messages, message],
                            };
                        } else return g;
                    });

                    const final = foundGroup
                        ? updatedMessages
                        : [
                              ...prevMessagesGroup,
                              {
                                  date: message.sendDate,
                                  messages: [message],
                              },
                          ];
                    // Return the updated messages array to set the state
                    return final;
                });
            } catch (error) {
                console.error("Error fetching message:", error);
            }
        };
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `/api/chats/${chat.id}/messages`
                );
                setMessages(response.data.messages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        const handleChannelHere = (users, setFunc) => {
            setFunc((prevUsers) => {
                const mergedUsers = [...prevUsers, ...users];
                const uniqueUsers = Array.from(
                    new Set(mergedUsers.map((user) => user.id))
                ).map((id) => {
                    return mergedUsers.find((user) => user.id === id);
                });
                return uniqueUsers;
            });
        };

        const handleChannelJoining = (user, setFunc) => {
            setFunc((pre) => {
                let alreadyExists = false;
                pre.forEach((u) => {
                    if (u.id === user.id) alreadyExists = true;
                });
                if (!alreadyExists) return [...pre, user];
                return [...pre];
            });
        };
        const handleChannelLeaving = (user, setFunc) => {
            setFunc((pre) => {
                const updatedUsers = pre.filter((u) => u.id !== user.id);
                return updatedUsers;
            });
        };
        // Listen for incoming messages
        const channelName = `chat.${chat.id}`;
        const pChannelName = `presence.user.${chat.users[0].id}`;

        //detect only presence
        //if presence events are triggred it means that user is just presnet
        window.Echo.join(pChannelName)
            .here((users) => {
                console.log("here channel");
                handleChannelHere(users, setPresentUsers);
            })
            .joining((user) => {
                console.log("joining channel");
                handleChannelJoining(user, setPresentUsers);
            })
            .leaving((user) => {
                console.log("leaving channel");
                handleChannelLeaving(user, setPresentUsers);
            })
            .error((error) => {
                console.log(error);
            });

        //detect new messages and presence
        //if presence events are triggred it means, user is presnet and viewing this chat
        window.Echo.join(channelName)
            .here((users) => {
                console.log("here channel");
                handleChannelHere(users, setActiveUsers);
            })
            .joining((user) => {
                console.log("joining channel");
                handleChannelJoining(user, setActiveUsers);
            })
            .leaving((user) => {
                console.log("leaving channel");
                handleChannelLeaving(user, setActiveUsers);
            })
            .listen(".MessageSentEvent", (data) => {
                fetchMessage(data.msg_id);
            })
            .error((error) => {
                console.log(error);
            });

        fetchMessages();

        // Clean up subscription when component unmounts
        return () => {
            // channel.unsubscribe();
            Echo.leave(channelName);
            Echo.leave(pChannelName);
        };
    }, [chat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, unsavedMessages]);

    const scrollToBottom = () => {
        if (lastMsg.current) {
            // console.log("has been called");
            lastMsg.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // NOTE : toggle back if needed
    // const componentDidMount = () => {
    //     this.scrollToBottom();
    // };

    // const componentDidUpdate = () => {
    //     this.scrollToBottom();
    // };

    return (
        <>
            {imageInView && <ImageViewer />}
            <div
                className={`grid grid-cols-1 grid-rows-12 w-full ${className}`}
            >
                {/* Chat Room Info */}
                <div className="row-span-1 px-4 py-4 max-sm:px-1 bg-teal-700 text-teal-50 flex justify-between items-center">
                    <div className="flex justify-start items-center gap-4">
                        <div className="size-10 rounded-full bg-teal-500">
                            <img
                                src="../../assets/images/user/user-02.png"
                                alt="User"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center text-md font-extrabold">
                            <span>
                                {chat &&
                                    (chat.type === "private"
                                        ? chat.users.length > 0
                                            ? chat.users[0].firstname +
                                              " " +
                                              chat.users[0].lastname
                                            : "user-name"
                                        : chat.title || "empty group title")}
                            </span>
                            <span className="text-xs font-light">
                                {chat &&
                                    chat.type === "private" &&
                                    (presentUserExists(chat.users[0].id)
                                        ? `online`
                                        : `last seen : ${
                                              chat.users[0].lastseen
                                                  ? new Date(
                                                        chat.users[0].lastseen
                                                    ).toLocaleString()
                                                  : ""
                                          }`)}
                            </span>
                        </div>
                    </div>
                    <button
                        className="hover:bg-opacity-25 hover:bg-slate-100 p-1 pr-2 py-2 sm:hidden transition-all duration-150 ease-in-out rounded-xl"
                        onClick={(e) => {
                            e.preventDefault();
                            setToggleChatList(!toggleChatList);
                        }}
                    >
                        <ArrowSvg
                            className={`size-5 fill-slate-300 ${
                                (isSmallScreen && toggleChatList) ||
                                "rotate-180"
                            }`}
                        />
                    </button>
                </div>
                {/* Chat Room Content */}
                <div className="row-span-9 w-full overflow-y-auto">
                    <div className="w-full border-r-[1px] border-meta-4 flex flex-col-reverse p-4">
                        {messages
                            .slice()
                            .reverse()
                            .map((dateGroupedMsgs, i) => {
                                const messages_copy = dateGroupedMsgs.messages
                                    .slice()
                                    .reverse();
                                return (
                                    <div className="w-full">
                                        <div className="text-sm text-center text-slate-600 bg-slate-200 font-bold mt-2 mb-1 rounded-lg">
                                            {dateGroupedMsgs.date}
                                        </div>
                                        <div className="w-full flex flex-col-reverse">
                                            {unsavedMessages.map((m, i) => {
                                                if (
                                                    m.sendDate ===
                                                    dateGroupedMsgs.date
                                                )
                                                    return (
                                                        <MessageBubble
                                                            i={i}
                                                            msg={m}
                                                            ref={
                                                                unsavedMessages.length !==
                                                                    0 &&
                                                                unsavedMessages.length -
                                                                    1 ===
                                                                    i
                                                                    ? lastMsg
                                                                    : null
                                                            }
                                                            unsaved={true}
                                                        />
                                                    );
                                            })}

                                            {messages_copy.map((m, j) => {
                                                const applyRef =
                                                    !lastMessageRefIsSet;

                                                const currentSender =
                                                    m.sender_id;
                                                const previousSender =
                                                    j + 1 ===
                                                    messages_copy.length
                                                        ? null
                                                        : messages_copy[j + 1]
                                                              .sender_id;

                                                // Determine if the current message has the same sender as the previous message
                                                const sameSenderAsPrevious =
                                                    currentSender ===
                                                    previousSender;

                                                const showBubbleHeader =
                                                    chat &&
                                                    chat.type === "group" &&
                                                    !sameSenderAsPrevious;

                                                if (!lastMessageRefIsSet) {
                                                    lastMessageRefIsSet = true;
                                                }
                                                totalMsgs++;
                                                return (
                                                    <MessageBubble
                                                        i={i}
                                                        msg={m}
                                                        ref={
                                                            applyRef
                                                                ? lastMsg
                                                                : null
                                                        }
                                                        unsaved={false}
                                                        showHeader={
                                                            showBubbleHeader
                                                        }
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                {/* Message Input */}
                <div className="row-span-2 p-3 flex items-center shadow">
                    <MessageInput
                        chat={chat}
                        user={user}
                        pendMsg={appendMsg}
                        msgSent={messageSent}
                    />
                </div>
            </div>
        </>
    );
}

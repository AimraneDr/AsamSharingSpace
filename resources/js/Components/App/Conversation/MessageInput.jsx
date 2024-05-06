import {
    FaceSmileIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon,
    PaperClipIcon,
    PhotoIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import NewMessageInput from "./NewMessageInput";
import axios from "axios";

export default function MessageInput({conversation}) {
    const [newMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageIsSending, setMessageIsSending] = useState(false);

    const onSendClick = () => {
        if(messageIsSending) return;
        if (newMessage.trim() === "") {
            setInputErrorMessage("can't send an empty message");
            setTimeout(() => {
                setInputErrorMessage("");
            }, 5000);
            return;
        }

        const formData = new FormData();
        formData.append("content", newMessage);
        if (conversation.is_conversation) {
            formData.append("reciever_id", conversation.end_user.id);
        } else if (conversation.is_group) {
            formData.append("group_id", conversation.id);
        }
        formData.append("attachments", []);
        setMessageIsSending(true);
        axios
            .post(route("message.store"), formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    console.log(progress);
                },
            })
            .then((response) => {
                setNewMessage("");
                setMessageIsSending(false);
            })
            .catch((error) => {
                console.log(error);
                setMessageIsSending(false);
            });
    };

    return (
        <div className="flex flex-wrap items-end border-t border-slate-700 py-3">
            <div className="order-2 flex-1 xs:flex-none xs:order-1 p-2">
                <button className="p-1 text-gray-400 hover:text-gray-300 relative">
                    <PaperClipIcon className="w-8" />
                    <input
                        type="file"
                        multiple
                        className="absolute top-0 left-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
                    />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-300 relative">
                    <PhotoIcon className="w-8" />
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute top-0 left-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
                    />
                </button>
            </div>

            <div className="order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative">
                {inputErrorMessage && (
                    <div role="alert" className="alert alert-error text-sm p-2 px-4 rounded-lg">
                        <span className="text-sm">{inputErrorMessage}</span>
                    </div>
                )}
                <div className="flex py-2">
                    <NewMessageInput
                        value={newMessage}
                        onChange={setNewMessage}
                        onSend={onSendClick}
                    />
                    <button
                        className="btn btn-info rounded-l-none"
                        disabled={messageIsSending}
                        onClick={onSendClick}
                    >
                        {messageIsSending ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : (
                            <PaperAirplaneIcon className="w-8" />
                        )}
                    </button>
                </div>
            </div>

            <div className="order-3 p-2 ">
                <button className="p-1 text-gray-400 hover:text-gray-300">
                    <FaceSmileIcon className="w-8" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-300">
                    <HandThumbUpIcon className="w-8" />
                </button>
            </div>
        </div>
    );
}

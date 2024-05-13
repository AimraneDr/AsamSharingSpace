import {
    FaceSmileIcon,
    HandThumbUpIcon,
    PaperAirplaneIcon,
    PaperClipIcon,
    PhotoIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import NewMessageInput from "./NewMessageInput";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { Popover } from "@headlessui/react";
import { isAudio, isImage } from "@/utils";
import AttachmnetPreview from "./AttachmnetPreview";
import AudioPlayer from "./AudioPlayer";

export default function MessageInput({ conversation }) {
    const [newMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageIsSending, setMessageIsSending] = useState(false);
    const [uploadingProgress, setUploadingProgress] = useState(0);
    const [choosenFiles, setChoosenFiles] = useState([]);

    const onFileChange = (e) => {
        const files = e.target.files;

        const updatedFiles = [...files].map((file) => {
            return {
                file: file,
                url: URL.createObjectURL(file),
            };
        });
        e.target.value = null;
        setChoosenFiles((pre) => {
            return [...pre, ...updatedFiles];
        });
    };

    const onSendClick = () => {
        if (messageIsSending) return;
        if (newMessage.trim() === "" && choosenFiles.length === 0) {
            setInputErrorMessage(
                "can't send an empty message (provide a message or upload attachments)"
            );
            setTimeout(() => {
                setInputErrorMessage("");
            }, 5000);
            return;
        }

        const formData = new FormData();
        formData.append("content", newMessage);
        choosenFiles.forEach((file) => {
            formData.append("attachments[]", file.file);
        });
        if (conversation.is_conversation) {
            formData.append("reciever_id", conversation.end_user.id);
        } else if (conversation.is_group) {
            formData.append("group_id", conversation.id);
        }
        setMessageIsSending(true);
        axios
            .post(route("message.store"), formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadingProgress(progress);
                },
            })
            .then((response) => {
                setNewMessage("");
                setMessageIsSending(false);
                setUploadingProgress(0);
                setChoosenFiles([]);
            })
            .catch((error) => {
                setMessageIsSending(false);
                setChoosenFiles([]);
                const msg = error?.response?.data?.message;
                setInputErrorMessage(
                    msg || "an error occurred while sending message."
                );
            });
    };

    const sendThumpsUp = () => {
        if (messageIsSending) return;

        const data = {
            content: "👍",
        };
        if (conversation.is_conversation) {
            data["reciever_id"] = conversation.end_user.id;
        } else if (conversation.is_group) {
            data["group_id"] = conversation.id;
        }
        axios.post(route("message.store"), data);
    };

    return (
        <div className="flex flex-col border-t border-oxford_blue bg-moonstone">
            <div className="">
                {choosenFiles && choosenFiles.length > 0 && (
                    <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
                        {choosenFiles.map((file) => (
                            <div
                                key={file.file.name}
                                className={`relative flex justify-between cursor-pointer ${
                                    !isImage(file.file) ? "w-[240px]" : ""
                                }`}
                            >
                                {isImage(file.file) ? (
                                    <img
                                        src={file.url}
                                        alt=""
                                        className="w-16 h-16 object-cover"
                                    />
                                ) : isAudio(file.file) ? (
                                    <AudioPlayer
                                        file={file}
                                        showVolume={false}
                                    />
                                ) : (
                                    <AttachmnetPreview file={file} />
                                )}
                                <button
                                    onClick={() => [
                                        setChoosenFiles((pre) =>
                                            pre.filter(
                                                (f) =>
                                                    f.file.name !==
                                                    file.file.name
                                            )
                                        ),
                                    ]}
                                    className="absolute w-6 h-6 rounded-full bg-gray-800 -right-2 -top-2 text-gray-300 hover:text-gray-100 z-10"
                                >
                                    <XCircleIcon className="w-6" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-wrap items-center">
                <div className="order-2 flex-1 xs:flex-none xs:order-1 text-oxford_blue">
                    <button className="p-1  hover:text-moonstone-900 relative">
                        <PaperClipIcon className="w-6" />
                        <input
                            type="file"
                            multiple
                            onChange={onFileChange}
                            className="absolute top-0 left-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
                        />
                    </button>
                    <button className="p-1 hover:text-moonstone-900 relative">
                        <PhotoIcon className="w-6" />
                        <input
                            type="file"
                            multiple
                            onChange={onFileChange}
                            accept="image/*"
                            className="absolute top-0 left-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer"
                        />
                    </button>
                </div>
                <div className="order-1 px-3 xs:p-0 min-w-[220px] basis-full xs:basis-0 xs:order-2 flex-1 relative">
                    {!!uploadingProgress && (
                        <progress
                            className="progress progress-info w-full mt-2"
                            value={uploadingProgress}
                            max={100}
                        ></progress>
                    )}
                    {inputErrorMessage && (
                        <div
                            role="alert"
                            className="alert alert-error text-sm p-2 px-4 rounded-lg mt-2"
                        >
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
                            className="bg-oxford_blue p-1 rounded-lg rounded-l-none"
                            disabled={messageIsSending}
                            onClick={onSendClick}
                        >
                            {messageIsSending ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                <PaperAirplaneIcon className="w-6 text-moonstone" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="order-3 flex text-oxford_blue">
                    <Popover className={`relative`}>
                        <Popover.Button
                            className={`p-1 hover:text-moonstone-900`}
                        >
                            <FaceSmileIcon className="w-6" />
                        </Popover.Button>
                        <Popover.Panel
                            className={`absolute z-10 right-0 bottom-full`}
                        >
                            <EmojiPicker
                                theme="dark"
                                className=""
                                onEmojiClick={(ev) =>
                                    setNewMessage((pre) => pre + ev.emoji)
                                }
                            ></EmojiPicker>
                        </Popover.Panel>
                    </Popover>
                    <button
                        className="p-1 hover:text-gray-300"
                        onClick={sendThumpsUp}
                    >
                        <HandThumbUpIcon className="w-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

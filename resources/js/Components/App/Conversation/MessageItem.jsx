import { usePage } from "@inertiajs/react";
import ProfileItem from "./ProfileItem";
import ReactMarkdown from "react-markdown";
import { formatMessageDateLong } from "@/utils";
import MessageAttachments from "./MessageAttachments";

export default function MessageItem({ message, onAttachmentClick }) {
    const user = usePage().props.auth.user;

    return (
        <div
            className={`chat text-oxford_blue ${
                message.sender.id == user.id ? "chat-end" : "chat-start"
            }`}
        >
            <ProfileItem user={message.sender} />
            <div className="chat-header">
                {message.sender.id === user.id
                    ? ""
                    : message.sender.lastname + " " + message.sender.firstname}
                <time className="text-xs opacity-50">
                    {formatMessageDateLong(message.created_at)}
                </time>
            </div>
            <div
                className={`chat-bubble relative text-moonstone-900
                ${message.sender.id === user.id ? "bg-lapis_lazuli" : "bg-gunmetal"}
            `}
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    <MessageAttachments
                        attachments={message.attachments}
                        onAttachmentClick={onAttachmentClick}
                    />
                </div>
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
        </div>
    );
}

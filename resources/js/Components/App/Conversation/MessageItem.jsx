import { usePage } from "@inertiajs/react";
import ProfileItem from "./ProfileItem";
import ReactMarkdown from 'react-markdown';
import { formatMessageDateLong } from "@/utils";

export default function MessageItem({ message }) {
    const user = usePage().props.auth.user;

    return (
        <div
            className={`chat ${
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
                className={`chat-bubble relative
                ${message.sender.id === user.id ? "chat-bubble-warning" : ""}
            `}
            >
                <div className="chat-message">
                    <div className="chat-message-content">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                </div>
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
        </div>
    );
}

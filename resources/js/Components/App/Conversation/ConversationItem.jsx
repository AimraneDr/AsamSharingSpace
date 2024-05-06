import { Link, usePage } from "@inertiajs/react";
import ProfileItem from "./ProfileItem";
import ConversationOptionsDropdown from "./ConversationOptionsDropdown";
import { formatMessageDateShort } from "@/utils";

export default function ConversationItem({
    conversation,
    selectedConversation = null,
    online = null,
}) {
    const page = usePage();
    const user = page.props.auth.user;

    return (
        <Link
            href={
                conversation.is_group
                    ? route("chats.group", conversation.id)
                    : route("chats.conversation", conversation.id)
            }
            preserveState
            className={`conversation-item flex items-center gap-2 p-2 text-gray300 transition-all cursor-pointer border-l-4 hover:bg-black/30 border-transparent ${
                selectedConversation &&
                selectedConversation.is_group === conversation.is_group &&
                selectedConversation.id == conversation.id &&
                "border-blue-500 bg-black/20"
            } ${
                conversation.is_conversation && user.role.name === "admin"
                    ? "pr-2"
                    : "pr-4"
            }`}
        >
            <ProfileItem
                user={conversation.end_user}
                group={conversation.is_group}
                online={online}
            />

            <div
                className={`flex-1 text-sm max-w-full overflow-hidden ${
                    conversation.is_conversation &&
                    conversation.blocked_at &&
                    "opacity-50"
                }`}
            >
                <div className="flex gap-1 justify-between items-center">
                    <h3 className="text-sm font-semibold overflow-hidden text-nowrap text-ellipsis">
                        {conversation.title}
                    </h3>
                    {conversation.last_message_date && (
                        <span className="text-nowrap">
                            {formatMessageDateShort(conversation.last_message_date)}
                        </span>
                    )}
                </div>
                {conversation.last_message && (
                    <span className="text-xs truncate">
                        {conversation.last_message}
                    </span>
                )}
                {conversation.is_conversation && user.role.name === "admin" && (
                    <ConversationOptionsDropdown conversation={conversation} />
                )}
            </div>
        </Link>
    );
}

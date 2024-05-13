import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
import ProfileItem from "./ProfileItem";

export default function ConversationHeader({ conversation }) {
    const user = usePage().props.auth.user;

    return (
        <div className="p-2 flex justify-between items-center border-b border-moonstone-200 bg-moonstone text-moonstone-900">
            {conversation && (
                <div className="flex items-center gap-3">
                    <Link
                        href={route("chats")}
                        className="inline-block sm:hidden"
                    >
                        <ArrowLeftIcon className="w-6" />
                    </Link>
                    <ProfileItem
                        user={
                            conversation.is_conversation
                                ? conversation.end_user
                                : null
                        }
                        group={conversation.is_group ? conversation : null}
                    />
                    <div>
                        <h3>{conversation.title}</h3>
                        {conversation.is_group && (
                            <p className="text-xs text-moonstone-900">
                                {conversation.users.length} Members
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

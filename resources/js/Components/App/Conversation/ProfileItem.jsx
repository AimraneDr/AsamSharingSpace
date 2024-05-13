import { UserCircleIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";

export default function ProfileItem({
    user = null,
    online = null,
    profile = false,
    group = null,
}) {
    return (
        <>
            {group ? (
                <div className="avatar placeholder">
                    <div className="bg-moonstone-900 text-oxford_blue  rounded-full w-8">
                        <span className="text-xl">
                            <UsersIcon className="w-5"/>
                        </span>
                    </div>
                </div>
            ) : user && user.profile ? (
                <div
                    className={`chat-image avatar ${
                        online ? "online" : online === false ? "offline" : ""
                    }`}
                >
                    <div
                        className={`rounded-full ${profile ? "w-40" : "w-8"}`}
                    ></div>
                </div>
            ) : (
                <div
                    className={`chat-image avatar placeholder ${
                        online ? "online" : online === false ? "offline" : ""
                    }`}
                >
                    <div
                        className={`bg-moonstone-900 text-oxford_blue rounded-full ${
                            profile ? "w-40" : "w-8"
                        }`}
                    >
                        <span className="text-lg">
                            {user && user.firstname && user.lastname ? (
                                user.lastname.substring(0, 1) +
                                user.firstname.substring(0, 1)
                            ) : (
                                <UserIcon className="w-6" />
                            )}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

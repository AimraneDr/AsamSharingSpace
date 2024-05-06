import { Menu, Transition } from "@headlessui/react";
import {
    EllipsisVerticalIcon,
    LockClosedIcon,
    LockOpenIcon,
    ShieldCheckIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

export default function ConversationOptionsDropdown() {
    const changeUserRole = () => {
        axios
            .post("user.changeRole", conversation.end_user.id)
            .then((res) => {
                // console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const onBlockUser = () => {
        axios
            .post("users.switchBlocked", conversation.end_user.id)
            .then((res) => {
                // console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <div>
            <Menu className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                        {conversation.is_conversation && (
                            <>
                                <div className="p1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={onBlockUser}
                                                className={`group flex w-full items-center rounded-md p2 text-sm ${
                                                    active
                                                        ? "bg-black/30 text-white"
                                                        : "text-gray-100"
                                                }`}
                                            >
                                                {conversation.end_user
                                                    .blocked_at ? (
                                                    <>
                                                        <LockOpenIcon className="w-4 h-4 mr-2" />
                                                        Unblock User
                                                    </>
                                                ) : (
                                                    <>
                                                        <LockClosedIcon className="w-4 h-4 mr-2" />
                                                        Block User
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="p1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={changeUserRole}
                                                className={`group flex w-full items-center rounded-md p2 text-sm ${
                                                    active
                                                        ? "bg-black/30 text-white"
                                                        : "text-gray-100"
                                                }`}
                                            >
                                                {conversation.end_user.role
                                                    .name === "admin" ? (
                                                    <>
                                                        <UserIcon className="w-4 h-4 mr-2" />
                                                        Make Regular User
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldCheckIcon className="w-4 h-4 mr-2" />
                                                        Make Admin
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </>
                        )}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

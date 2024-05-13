import { isAudio, isImage, isPdf, isPreviwable, isVideo } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PaperClipIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { Fragment, useEffect, useMemo, useState } from "react";

export default function AttachmentsPreview({
    attachments,
    index,
    show = false,
    onClose = () => {},
}) {
    const [curretnIndex, setCurrentIndex] = useState(0);
    const previwableAttachments = useMemo(() => {
        return attachments.filter((a) => true);
    }, [attachments]);
    const attachment = useMemo(() => {
        return previwableAttachments[curretnIndex];
    }, [previwableAttachments, curretnIndex]);
    const close = () => {
        onClose();
    };
    const prev = () => {
        if (curretnIndex === 0) return;
        setCurrentIndex((pre) => pre - 1);
    };
    const next = () => {
        if (curretnIndex === previwableAttachments.length - 1) return;
        setCurrentIndex((pre) => pre + 1);
    };

    useEffect(() => {
        setCurrentIndex(index);
    }, [index]);
    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                id="modal"
                as="div"
                className={`relative z-50`}
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ense-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="w-screen h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ense-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={`flex flex-col w-full h-full transform overflow-hidden bg-slate-800 text-left align-middle shadow-xl transition-all`}
                            >
                                <button
                                    onClick={close}
                                    className="absolute right-3 top-3 w-10 h-10 rounded-full hover:bg-black/10 transition flex items-center justify-center text-gray-100 z-40"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                                <div className="relative group h-full">
                                    {curretnIndex > 0 && (
                                        <div
                                            onClick={prev}
                                            className="absolute opacity-100 text-gray-100 cursor-pointer flex items-center justify-center size-16 left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 z-30"
                                        >
                                            <ChevronLeftIcon className="w-12" />
                                        </div>
                                    )}

                                    {curretnIndex <
                                        previwableAttachments.length - 1 && (
                                        <div
                                            onClick={next}
                                            className="absolute opacity-100 text-gray-100 cursor-pointer flex items-center justify-center size-16 right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 z-30"
                                        >
                                            <ChevronRightIcon className="w-12 text-red-500" />
                                        </div>
                                    )}

                                    {attachment && (
                                        <div className="flex items-center justify-center w-full h-full p-3">
                                            {isImage(attachment) ? (
                                                <img
                                                    src={attachment.url}
                                                    className="max-w-full max-h-full"
                                                />
                                            ) : isVideo(attachment) ? (
                                                <div className="flex items-center h-full">
                                                    <video
                                                        src={attachment.url}
                                                        controls
                                                        autoPlay
                                                        className="max-w-full max-h-full"
                                                    ></video>
                                                </div>
                                            ) : isAudio(attachment) ? (
                                                <div className="relative flex justify-center items-center">
                                                    <audio
                                                        src={attachment.url}
                                                        controls
                                                        autoPlay
                                                    ></audio>
                                                </div>
                                            ) : isPdf(attachment) ? (
                                                <iframe
                                                    src={attachment.url}
                                                    className="w-full h-full"
                                                ></iframe>
                                            ) : (
                                                !isPreviwable(attachment) && (
                                                    <div className="p-32 flex flex-col justify-center items-center text-gray-100">
                                                        <PaperClipIcon className="size-10 mb-3" />
                                                        <small>
                                                            {attachment.name}
                                                        </small>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

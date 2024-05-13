import { isAudio, isImage, isPdf, isPreviwable, isVideo } from "@/utils";
import { ArrowDownTrayIcon, PaperClipIcon, PlayCircleIcon } from "@heroicons/react/24/solid";

export default function MessageAttachments({ attachments, onAttachmentClick }) {
    return (
        <>
            {attachments.length > 0 && (
                <div
                    className={`mt-2 grid justify-center items-center gap-1 ${
                        attachments.length === 1
                            ? "grid-cols-1 grid-rows-1"
                            : attachments.length === 2
                            ? "grid-cols-2"
                            : "grid-cols-2 grid-rows-2"
                    }`}
                >
                    {attachments.map((attachment, i = 0) =>
                        attachments.length > 4 && i > 3 ? (
                            <></>
                        ) : attachments.length > 4 && i === 3 ? (
                            <div
                                onClick={(e) =>
                                    onAttachmentClick(attachments, i)
                                }
                                key={attachment.id}
                                className="w-full h-full relative"
                            >
                                <div className="absolute top-0 left-0 w-full h-full">
                                    {isImage(attachment) && (
                                        <img
                                            src={attachment.url}
                                            className="object-contain aspect-square "
                                        />
                                    )}
                                    {isVideo(attachment) && (
                                        <div className="relative flex justify-center items-center rounded-md w-full h-full">
                                            <PlayCircleIcon className="z-20 absolute w-16 h-16 text-white opacity-70" />
                                            <div className="absolute left-0 top-0 w-full h-full rounded-md bg-black/50 \-10" />
                                            <video
                                                src={attachment.url}
                                                className="rounded-md h-full"
                                            ></video>
                                        </div>
                                    )}
                                    {isAudio(attachment) && (
                                        <div className="relative flex justify-center items-center">
                                            <audio
                                                src={attachment.url}
                                                controls
                                            ></audio>
                                        </div>
                                    )}
                                    {isPdf(attachment) && (
                                        <div className="relative flex justify-center items-center w-full h-full">
                                            <div className="absolute left-0 top-0 right-0 bottom-0"></div>
                                            <iframe
                                                src={attachment.url}
                                                className="w-full h-full rounded-md"
                                            ></iframe>
                                        </div>
                                    )}
                                    {!isPreviwable(attachment) && (
                                        <a
                                            href={attachment.url}
                                            onClick={(e) => e.stopPropagation()}
                                            download
                                            className="flex flex-col justify-center items-center"
                                        >
                                            <PaperClipIcon className="w-10 h-10 mb-3" />
                                            <small className="text-center">
                                                {attachment.name}
                                            </small>
                                        </a>
                                    )}
                                </div>

                                <div className="absolute top-0 left-0 w-full h-full bg-transparent/50 flex justify-center items-center text-xl">
                                    +{attachments.length - 3}
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={(e) =>
                                    onAttachmentClick(attachments, i)
                                }
                                key={attachment.id}
                                className={`group flex flex-col items-center justify-center text-gray-500 relative cursor-pointer rounded-md ${
                                    isAudio(attachment)
                                        ? "w-84"
                                        : "w-32 h-32 aspect-square bg-blue-100"
                                } ${
                                    attachments.length === 3 &&
                                    i === 2 &&
                                    "col-span-2 w-full"
                                }`}
                            >
                                {!isAudio(attachment) && (
                                    <a
                                        onClick={(e) => e.stopPropagation()}
                                        download
                                        href={attachment.url}
                                        className="z-20 opacity-100 group-hover:opacity-100 transition-all w-8 h-8 flex items-center justify-center text-gray-100 bg-gray-700 rounded absolute right-0 top-0 cursor-pointer hover:bg-gray-800"
                                    >
                                        <ArrowDownTrayIcon className="w-4 h-4" />
                                    </a>
                                )}
                                {isImage(attachment) && (
                                    <img
                                        src={attachment.url}
                                        className="object-contain aspect-square "
                                    />
                                )}
                                {isVideo(attachment) && (
                                    <div className="relative flex justify-center items-center rounded-md w-full h-full">
                                        <PlayCircleIcon className="z-20 absolute w-16 h-16 text-white opacity-70" />
                                        <div className="absolute left-0 top-0 w-full h-full rounded-md bg-black/50 \-10" />
                                        <video
                                            src={attachment.url}
                                            className="rounded-md h-full"
                                        ></video>
                                    </div>
                                )}
                                {isAudio(attachment) && (
                                    <div className="relative flex justify-center items-center">
                                        <audio
                                            src={attachment.url}
                                            controls
                                        ></audio>
                                    </div>
                                )}
                                {isPdf(attachment) && (
                                    <div className="relative flex justify-center items-center w-full h-full">
                                        <div className="absolute left-0 top-0 right-0 bottom-0"></div>
                                        <iframe
                                            src={attachment.url}
                                            className="w-full h-full rounded-md"
                                        ></iframe>
                                    </div>
                                )}
                                {!isPreviwable(attachment) && (
                                    <a
                                        href={attachment.url}
                                        onClick={(e) => e.stopPropagation()}
                                        download
                                        className="flex flex-col justify-center items-center"
                                    >
                                        <PaperClipIcon className="w-10 h-10 mb-3" />
                                        <small className="text-center">
                                            {attachment.name}
                                        </small>
                                    </a>
                                )}
                            </div>
                        )
                    )}
                </div>
            )}
        </>
    );
}

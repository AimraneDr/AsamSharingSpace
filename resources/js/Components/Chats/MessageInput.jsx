import { useRef, useState } from "react";
import axios from "axios";
import CloseSvg from "../svgs/CloseSvg";
import PdfSvg from "../svgs/PdfSvg";

export default function MessageInput({ chat, user, pendMsg, msgSent }) {
    //for the form
    const [formData, setFormData] = useState({
        message: "",
        attachments: [],
    });
    const [filePreviews, setFilePreviews] = useState([]); // State to hold file previews
    const fileInputRef = useRef(null);

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectFile = () => {
        fileInputRef.current.click(); // Trigger click event on the hidden file input
    };

    const handleRemoveFile = (index) => {
        // Remove file preview and corresponding file from formData
        setFilePreviews((prevPreviews) =>
            prevPreviews.filter((preview, idx) => idx !== index)
        );
        setFormData((prevFormData) => {
            const updatedFiles = prevFormData.attachments.filter(
                (file, idx) => idx !== index
            );
            return { ...prevFormData, attachments: updatedFiles };
        });
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);

        // // Display file previews for selected files
        // const previews = files.map((file) => ({
        //     file,
        //     preview: file.type.startsWith("image/")
        //         ? URL.createObjectURL(file)
        //         : null,
        // }));

        const previews = [];

        for (const file of files) {
            if (file.type.startsWith("image/")) {
                previews.push({
                    file,
                    preview: URL.createObjectURL(file),
                });
            } else if (file.type === "application/pdf") {
                // Generate a thumbnail for the first page of the PDF
                const pdfUrl = URL.createObjectURL(file);
                previews.push({
                    file,
                    preview: pdfUrl,
                });
            } else {
                // Unsupported file type - handle accordingly
                console.warn(`Unsupported file type: ${file.type}`);
            }
        }

        setFormData({ ...formData, attachments: files });
        setFilePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!chat || !user) return;

        const msg = {
            content: formData.message,
            chat_id: chat.id,
            sender_id: user.id,
            status: "sending",
            sendDate: formattedDate,
            sendTime: formattedTime,
        };

        try {
            const formDataObj = new FormData();
            formDataObj.append("content", formData.message);
            formDataObj.append("chat_id", chat.id);
            formDataObj.append("sender_id", user.id);
            formData.attachments.forEach((file) => {
                formDataObj.append("attachments[]", file);
            });

            const response = await axios.post(
                `/api/chats/${chat.id}/messages/send`,
                formDataObj,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            pendMsg(msg);

            // Reset form fields after submission
            setFilePreviews([]);
            setFormData({
                message: "",
            });
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            msgSent(msg.id);
        }
    };

    const renderFilePreview = (preview, index) => {
        if (preview.file.type.startsWith("image/")) {
            return (
                <div key={index} className="relative">
                    <img
                        src={preview.preview}
                        alt={`File Preview ${index}`}
                        className="w-32 h-32 object-cover rounded-lg"
                    />
                    <span
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full cursor-pointer"
                        onClick={() => handleRemoveFile(index)}
                    >
                        <CloseSvg />
                    </span>
                </div>
            );
        } else if (preview.file.type === "application/pdf") {
            return (
                <div key={index} className="relative">
                    <div className="max-w-32 h-32 flex items-center justify-center bg-gray-200 rounded-lg flex-col">
                        <PdfSvg className={`fill-red-400 size-20`} />
                        <span className="text-sm w-full truncate">{preview.file.name}</span>
                    </div>
                    <span
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full cursor-pointer"
                        onClick={() => handleRemoveFile(index)}
                    >
                        <CloseSvg />
                    </span>
                </div>
            );
        }
        return null;
    };

    return (
        <form action="" className="flex w-full gap-4">
            {/* Textarea */}
            <div className="relative w-full">
                {filePreviews.length > 0 && (
                    <div className="absolute max-w-full bottom-full p-2 bg-slate-300 rounded-lg flex flex-row items-center overflow-hidden overflow-x-auto gap-2">
                        {filePreviews.map((preview, index) =>
                            renderFilePreview(preview, index)
                        )}
                    </div>
                )}

                <textarea
                    id="hs-textarea-ex-2"
                    className="w-full p-4 pb-5 bg-teal-50 border-gray-200 rounded-lg text-lg focus:border-teal-500 focus:ring-teal-500"
                    placeholder="type your message..."
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                ></textarea>

                {/* Toolbar */}
                <div className="absolute bottom-px inset-x-px p-3 rounded-b-md bg-gray-100">
                    <div className="flex justify-between items-center">
                        {/* Button Group */}
                        <div className="flex items-center">
                            {/* Attach Button */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                                accept="image/*, .pdf, .doc, .docx"
                                multiple
                            />
                            <button
                                type="button"
                                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-teal-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                onClick={handleSelectFile}
                            >
                                <svg
                                    className="flex-shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                </svg>
                            </button>
                            {/* End Attach Button */}
                        </div>
                        {/* End Button Group */}

                        {/* Button Group */}
                        <div className="flex items-center gap-x-1">
                            {/* Send Button */}
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-teal-500 hover:bg-teal-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <svg
                                    className="flex-shrink-0 size-3.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path>
                                </svg>
                            </button>
                            {/* End Send Button */}
                        </div>
                        {/* End Button Group */}
                    </div>
                </div>
                {/* End Toolbar */}
            </div>
            {/* End Textarea */}
        </form>
    );
}

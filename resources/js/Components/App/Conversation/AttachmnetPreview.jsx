import { formatBytes, isPdf, isPreviwable } from "@/utils";
import { PaperClipIcon } from "@heroicons/react/24/solid";

export default function AttachmnetPreview({ file }) {
    return (
        <div className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-slate-800">
            <div>
                {isPdf(file.file) && <img src="/img/pdf.png" className="w-8" />}
                {!isPreviwable(file.file) && (
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-700 rounded">
                        <PaperClipIcon className="w-6" />
                    </div>
                )}
            </div>
            <dir className="flex-1 text-gray-400 text-nowrap text-ellipsis overflow-hidden">
                <h3>{file.file.name}</h3>
                <p className="text-sm">{formatBytes(file.file.size)}</p>
            </dir>
        </div>
    );
}

import { useChat } from "@/Contexts/ChatContext";
import CloseSvg from "../svgs/CloseSvg";
import ArrowSvg from "../svgs/ArrowSvg";
import ImageSlider from "./ImageSlader";

export default function ImageViewer({ className }) {
    const { chat, imageInView, setImageInView } = useChat();
    return (
        <div className={`absolute z-9 h-full w-full bg-teal-900 flex`}>
            <div className="h-full w-full grid grid-rows-12 ">
                <div className="row-span-1 px-4 py-4 max-sm:px-1 bg-teal-700 text-teal-50 flex justify-between items-center">
                    <div className="flex justify-start items-center gap-4">
                        <div className="size-10 rounded-full bg-teal-500">
                            <img
                                src="../../assets/images/user/user-02.png"
                                alt="User"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center text-md font-extrabold">
                            <span>
                                {chat &&
                                    (chat.type === "private"
                                        ? chat.users.length > 0
                                            ? chat.users[0].firstname +
                                              " " +
                                              chat.users[0].lastname
                                            : "user-name"
                                        : chat.title || "empty group title")}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row-span-9 flex justify-center items-center relative">
                    <div className="z-1 absolute top-0 right-0 w-fit h-fit flex flex-col p-1">
                        <CloseSvg
                            className={`hover:bg-slate-700 w-8 h-8 p-2 rounded-full cursor-pointer`}
                            onClick={(e) => {
                                e.preventDefault();
                                setImageInView(null);
                            }}
                        />
                        
                    </div>
                    <div
                        className="z-0 absolute w-full h-full"
                        onClick={(e) => {
                            e.preventDefault();
                            setImageInView(null);
                        }}
                    ></div>
                    <img
                        className="z-1 max-w-[90%] max-h-[90%]"
                        src={imageInView.imgPath}
                    />
                </div>
                <div className="row-span-2 flex justify-around items-center p-2 bg-teal-950">
                    <button className="w-10 h-full  hover:bg-teal-900 rounded-l-lg group">
                        <ArrowSvg
                            className={`w-full h-full fill-teal-600 group-hover:fill-teal-500 rotate-180`}
                        />
                    </button>
                    <div className="w-[80%] h-full ">
                        <ImageSlider />
                    </div>
                    <button className="w-10 h-full  hover:bg-teal-900 rounded-r-lg group">
                        <ArrowSvg
                            className={`w-full h-full fill-teal-600 group-hover:fill-teal-500`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

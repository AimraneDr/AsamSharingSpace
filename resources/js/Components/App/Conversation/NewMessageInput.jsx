import { useEffect, useRef } from "react";

export default function NewMessageInput({ value, onChange, onSend }) {
    const inputRef = useRef(null);

    const onInoutKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend(value);
        }
    };

    const onChangeEvent = (e) => {
        setTimeout(() => {
            adjustHeight();
        }, 10);
        onChange(e.target.value ? e.target.value : "");
    };

    const adjustHeight = () => {
        setTimeout(() => {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height =
                inputRef.current.scrollHeight + 1 + "px";
        }, 100);
    };

    useEffect(() => {
        adjustHeight();
    }, [value]);

    return (
            <textarea
                ref={inputRef}
                value={value}
                rows={1}
                onChange={(e) => onChangeEvent(e)}
                onKeyDown={onInoutKeyDown}
                placeholder="Type a message..."
                className="input input-bordered rounded-r-none resize-none overflow-y-auto max-h-40 w-full h-auto"
            ></textarea>
    );
}

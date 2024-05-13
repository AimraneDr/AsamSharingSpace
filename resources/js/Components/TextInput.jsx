import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "border-transparent/50 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm bg-transparent/10 hover:bg-transparent/20 focus:bg-transparent/30 " +
                className
            }
            ref={input}
        />
    );
});

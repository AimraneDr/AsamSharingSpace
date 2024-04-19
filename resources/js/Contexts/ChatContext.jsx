import { createContext, useState, useContext } from "react";

// Create a new context
const ChatContext = createContext();

// AuthProvider component to wrap the application and provide authentication context
export const ChatProvider = ({ chatRef, children }) => {
    const [chat, setChat] = useState(chatRef); // State to hold authenticated user information

    // Function to set chat
    const open = (chatData) => {
        setChat(chatData);
    };

    // Function to close chat
    const close = () => {
        setChat(null);
    };

    return (
        <ChatContext.Provider value={{ chat, open, close }}>
            {children}
        </ChatContext.Provider>
    );
};

// Custom hook to access the authentication context
export const useChat = () => {
    return useContext(ChatContext);
};

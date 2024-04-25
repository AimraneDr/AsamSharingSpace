import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

// Create a new context
const AuthContext = createContext();

// AuthProvider component to wrap the application and provide authentication context
export const AuthProvider = ({ userRef, children }) => {
    const [user, setUser] = useState(userRef); // State to hold authenticated user information

    // Function to set the authenticated user
    const login = (userData) => {
        setUser(userData);
    };

    // Function to clear the authenticated user (logout)
    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        const channelName = `user.${user.id}.updated`;
        window.Echo.private(channelName).listen(
            `UserPropsUpdatedEvent`,
            async (data) => {
                
                try {
                    debugger;
                    const response = await axios.get("api/user" + user.id);
                    const NewUser = response.data;
                    setUser(NewUser);
                } catch (err) {
                    console.log("could not update the user");
                }
            }
        );

        return () => {
            window.Echo.leave(channelName);
        };
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};

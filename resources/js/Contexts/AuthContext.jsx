import { createContext, useState, useContext } from "react";

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

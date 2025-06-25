import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [showLogin, setShowLogin] = useState(true); // Default to true for testing
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    return (
        <AppContext.Provider value={{ showLogin, setShowLogin, token, setToken, user, setUser, backendUrl }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider; // Add default export
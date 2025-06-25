import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);

    // Fallback for backendUrl if env variable is undefined
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    return (
        <AppContext.Provider value={{ showLogin, setShowLogin, token, setToken, user, setUser, backendUrl }}>
            {children}
        </AppContext.Provider>
    );
};
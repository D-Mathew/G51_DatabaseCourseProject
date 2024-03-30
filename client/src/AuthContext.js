import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userEmail'));
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

    const login = (email) => {
        localStorage.setItem('userEmail', email);
        setIsLoggedIn(true);
        setUserEmail(email);
    };

    const logout = () => {
        localStorage.removeItem('userEmail'); // Remove the email from local storage
        setIsLoggedIn(false);
        setUserEmail('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

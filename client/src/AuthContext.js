import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState(null); // New state for user role

    // Consider retrieving initial auth state from localStorage or another persistence layer here
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const role = localStorage.getItem('userRole');
        if (email && role) {
            setIsLoggedIn(true);
            setUserEmail(email);
            setUserRole(role);
        }
    }, []);

    const login = (email, role) => {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role); // Persist role
        setIsLoggedIn(true);
        setUserEmail(email);
        setUserRole(role); // Set user role
    };

    const logout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole'); // Clear persisted role
        setIsLoggedIn(false);
        setUserEmail('');
        setUserRole(null); // Reset role
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userEmail, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

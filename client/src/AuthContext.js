import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState(null);
    const [customerID, setCustomerID] = useState(null); // Add customerID state

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        const role = localStorage.getItem('userRole');
        const id = localStorage.getItem('customerID'); // Get customerID from local storage
        if (email && role && id) {
            setIsLoggedIn(true);
            setUserEmail(email);
            setUserRole(role);
            setCustomerID(id); // Set customerID state
        }
    }, []);

    const login = (email, role, id) => {
        console.log(`Logging in with email: ${email}, role: ${role}, id: ${id}`);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);
        localStorage.setItem('customerID', id); // Persist customerID
        // window.location.reload();
        setIsLoggedIn(true);
        setUserEmail(email);
        setUserRole(role);
        setCustomerID(id); // Set customerID state
        console.log(`Updated states - isLoggedIn: ${isLoggedIn}, userEmail: ${userEmail}, userRole: ${userRole}, customerID: ${customerID}`);
    };

    const logout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('customerID'); // Clear customerID
        setIsLoggedIn(false);
        setUserEmail('');
        setUserRole(null);
        setCustomerID(null); // Reset customerID
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userEmail, userRole, customerID, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

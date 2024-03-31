import React, { createContext, useContext, useState, useEffect } from 'react';

const DateContext = createContext();

export const useDates = () => useContext(DateContext);

export const DateProvider = ({ children }) => {
    const [dates, setDates] = useState(() => {
        // Load saved dates from localStorage
        const savedDates = localStorage.getItem('dates');
        return savedDates ? JSON.parse(savedDates) : { startDate: '', endDate: '' };
    });

    useEffect(() => {
        // Save dates to localStorage whenever they change
        localStorage.setItem('dates', JSON.stringify(dates));
    }, [dates]);

    return (
        <DateContext.Provider value={{ dates, setDates }}>
            {children}
        </DateContext.Provider>
    );
};

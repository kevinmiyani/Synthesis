import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [locationAccess, setLocationAccess] = useState(false);

    return (
        <LocationContext.Provider value={{ location, setLocation, locationAccess, setLocationAccess }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
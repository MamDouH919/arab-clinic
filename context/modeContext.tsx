"use client";
import React, { createContext, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { getCookie, setCookie } from "cookies-next";

interface ModeContextProps {
    darkMode: boolean;
    changeMode?: () => void;
}

export const ModeContext = createContext<ModeContextProps>({
    darkMode: false,
    changeMode: () => {},
});

const ModeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {    
    const themeMode = getCookie("themeMode");

    const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)');

    const [darkMode, setDarkMode] = useState<boolean>(
        themeMode
            ? themeMode === 'dark'
                ? true
                : false
            : isDarkModeEnabled
    );

    const changeMode = () => {        
        darkMode
            ? setCookie("themeMode", 'light')
            : setCookie("themeMode", 'dark');
        setDarkMode(!darkMode);
    };

    return (
        <ModeContext.Provider value={{ darkMode, changeMode }}>
            {children}
        </ModeContext.Provider>
    );
}

export default ModeContextProvider;

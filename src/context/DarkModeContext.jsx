import {createContext, useContext, useEffect} from "react";
import {useLocalStorageState} from "../hooks/useLocalStorageState.js";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia("(prefers-color-scheme: dark-mode)").matches,
        'isDarkMode');

    useEffect(function(){
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        }else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    },[isDarkMode]);

    function toggleDarkMode() {
        setIsDarkMode(isDark => !isDark);
    }

    return (
        <DarkModeContext.Provider value={{isDarkMode,toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('DarkModeProvider must be used within a dark mode');
    }
    return context;
}

export { DarkModeProvider, useDarkMode };
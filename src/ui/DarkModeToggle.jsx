import ButtonIcon from "./ButtonIcon.jsx";
import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi2";
import {useContext} from "react";
import {useDarkMode} from "../context/DarkModeContext.jsx";

export function DarkModeToggle() {
    const {isDarkMode,toggleDarkMode} = useDarkMode();

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    )
}
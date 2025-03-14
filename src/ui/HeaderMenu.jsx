import styled from "styled-components";
import Logout from "../features/authentication/Logout.jsx";
import ButtonIcon from "./ButtonIcon.jsx";
import {useNavigate} from "react-router-dom";
import {HiOutlineUser} from "react-icons/hi2";
import {DarkModeToggle} from "./DarkModeToggle.jsx";

const StyledHeaderMenu = styled.ul`
display: flex;
gap: 0.4rem;
`;
export function HeaderMenu() {
    const navigate = useNavigate();
    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate("/account")}>
                <HiOutlineUser />
            </ButtonIcon>
            </li>
            <li><DarkModeToggle /></li>
            <li><Logout/></li>
        </StyledHeaderMenu>
    )
}
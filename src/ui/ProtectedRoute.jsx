import {useUser} from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export function ProtectedRoute({children}) {
    const navigate = useNavigate();
    //1. Load the authenticated user
    const {isAuthenticated ,isPending}  = useUser();

    useEffect(() => {
        if(!isAuthenticated && !isPending) navigate("/login");
    }, [isAuthenticated,isPending,navigate]);

    if(isPending) return (
        <FullPage>
            <Spinner />
        </FullPage>
    );

    if(isAuthenticated) return children;
}


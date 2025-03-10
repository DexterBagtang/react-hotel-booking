import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logout as logoutApi} from "../../services/apiAuth.js";

export function useLogout(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate:logout, isPending} =  useMutation({
        mutationFn: logoutApi,
        onSuccess:()=> {
            queryClient.removeQueries();
            navigate("/login",{replace:true});
        },
    });
    return {logout,isPending};
}
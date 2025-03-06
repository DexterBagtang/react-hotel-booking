import {useMutation} from "@tanstack/react-query";
import {signup as signupApi} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useSignup(){
    const {mutate:signup,isPending} =  useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success('Account signup successfully. Please verify the new account from the users email address');
        }
    })

    return {signup,isPending}
}
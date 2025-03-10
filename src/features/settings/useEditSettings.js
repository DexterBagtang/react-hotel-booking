import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateSetting as updateSettingApi} from "../../services/apiSettings.js";

export function useEditSettings(){
    const queryClient = useQueryClient();

    const {mutate:updateSetting, isLoading:isUpdating} = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries({
                queryKey: ['settings']
            });
        },
        onError: (error) => toast.error(error.message),
    })

    return {updateSetting,isUpdating}
}
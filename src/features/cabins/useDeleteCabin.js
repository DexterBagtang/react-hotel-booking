import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    //gets the queryClient
    const queryClient = useQueryClient();

    //logic that implements mutation in deleting the cabin
    const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
        mutationFn: (id) => deleteCabinApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
            toast.success("Cabin successfully deleted!");

        },
        onError: (err) => toast.error(err.message)
    });

    return {isDeleting, deleteCabin};
}


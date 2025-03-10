import {useQuery} from "@tanstack/react-query";
import {getCabins} from "../../services/apiCabins.js";

export function useCabins() {
    //Fetches the cabins in the database using React Query useQuery hook
    const {
        isLoading,
        data:cabins,
        error
    }
        = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins
    })

    return {isLoading, cabins,error};
}
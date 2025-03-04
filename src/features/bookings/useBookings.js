import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";

export function useBookings() {
    //Fetches the cabins in the database using React Query useQuery hook
    const {
        isLoading,
        data:bookings,
        error
    }
        = useQuery({
        queryKey: ["bookings"],
        queryFn: getBookings,
    })

    return {isLoading, bookings,error};
}
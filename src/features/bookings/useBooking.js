import {useQuery} from "@tanstack/react-query";
import {getBooking} from "../../services/apiBookings.js";
import {useParams} from "react-router-dom";

export function useBooking() {
    const {bookingId} = useParams();
    //Fetches the cabins in the database using React Query useQuery hook
    const {
        isLoading,
        data:booking,
        error
    }
        = useQuery({
        queryKey: ["booking",bookingId],
        queryFn: () => getBooking(bookingId),
        retry:false,
    })

    return {isLoading, booking,error};
}
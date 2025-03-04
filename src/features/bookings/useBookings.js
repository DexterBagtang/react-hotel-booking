import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();
    const filterValue = searchParams.get('status')
    const filter = !filterValue || filterValue === 'all' ? null : {field:'status',value:filterValue};

    //Fetches the bookings in the database using React Query useQuery hook
    const {
        isLoading,
        data:bookings,
        error
    }
        = useQuery({
        queryKey: ["bookings",filter],
        queryFn:()=> getBookings({filter}),
    })

    return {isLoading, bookings,error};
}
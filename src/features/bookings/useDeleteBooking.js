import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export function useDeleteBooking() {
    //gets the queryClient
    const queryClient = useQueryClient();

    //logic that implements mutation in deleting the cabin
    const {isLoading: isDeleting, mutate: deleteBooking} = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['bookings']
            })
            toast.success("Booking successfully deleted!");


        },
        onError: (err) => toast.error(err.message)
    });

    return {isDeleting, deleteBooking};
}


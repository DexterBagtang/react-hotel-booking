import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: checkout, isPending:isCheckingOut} = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId,{
            status: 'checked-out',
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out.`);
            queryClient.invalidateQueries({active:true});
            // navigate(-1)
        },

        onError: () => {
            toast.error(`There was an error while checking out`);
        }
    });

    return {checkout,isCheckingOut};
}
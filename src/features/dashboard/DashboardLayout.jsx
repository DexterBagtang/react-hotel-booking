import styled from "styled-components";
import {useRecentBookings} from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useRecentStays} from "./useRecentStays.js";
import {Stats} from "./Stats.jsx";
import {useCabins} from "../cabins/useCabins.js";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout(){
    const {bookings,isLoading} = useRecentBookings();
    const {stays,isLoading:isLoading2,confirmedStays,numDays} = useRecentStays();
    const {cabins,isLoading:isLoading3} = useCabins();

    if(isLoading||isLoading2||isLoading3) return <Spinner />;

    console.log(bookings);

    return (
        <StyledDashboardLayout>
            <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
        </StyledDashboardLayout>
    )
}

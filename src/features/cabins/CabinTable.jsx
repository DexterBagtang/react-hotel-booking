import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import {useCabins} from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";

function CabinTable() {
    //Custom hook to fetch the cabins
    const {isLoading, cabins, error} = useCabins();

    const [searchParams] = useSearchParams();

    //display spinner if still loading
    if (isLoading) return <Spinner/>;

    const filterValue = searchParams.get("discount") || 'all';

    let filteredCabins;
    if (filterValue === 'all') filteredCabins = cabins;
    if( filterValue === 'no-discount') filteredCabins = cabins.filter((cabin)=>
        cabin.discount === 0);
    if( filterValue === 'with-discount') filteredCabins = cabins.filter((cabin)=>
        cabin.discount > 0);




    console.log(filterValue);
    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header role="row">
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    // data={cabins}
                    data={filteredCabins}
                    render={(cabin) => <CabinRow key={cabin.id} cabin={cabin}/>}
                />
            </Table>
        </Menus>

    )
}

export default CabinTable;

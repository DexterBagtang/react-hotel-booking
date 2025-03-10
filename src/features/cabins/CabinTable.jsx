import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import {useCabins} from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";
import Empty from "../../ui/Empty.jsx";

function CabinTable() {
    //Custom hook to fetch the cabins
    const {isLoading, cabins, error} = useCabins();

    const [searchParams] = useSearchParams();

    //display spinner if still loading
    if (isLoading) return <Spinner/>;

    if (!cabins.length) return <Empty resourceName="cabins" />;


    const filterValue = searchParams.get("discount") || 'all';

    let filteredCabins;
    if (filterValue === 'all') filteredCabins = cabins;
    if( filterValue === 'no-discount') filteredCabins = cabins.filter((cabin)=>
        cabin.discount === 0);
    if( filterValue === 'with-discount') filteredCabins = cabins.filter((cabin)=>
        cabin.discount > 0);


    const sortBy = searchParams.get("sortBy") || 'startDate-asc';

    const [field,direction] = sortBy.split('-')
    const modifier = direction === 'asc' ? 1 : -1;
    const sortedCabins = filteredCabins.sort((a,b) =>
    (a[field] - b[field]) * modifier) ;

    console.log(sortedCabins);

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
                    // data={filteredCabins}
                    data={sortedCabins}
                    render={(cabin) => <CabinRow key={cabin.id} cabin={cabin}/>}
                />
            </Table>
        </Menus>

    )
}

export default CabinTable;

import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";
import CabinTable from "./CabinTable.jsx";


// export default function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//
//     return (
//         <>
//             <Button onClick={() => setIsOpenModal(show => !show)}>Add new cabin</Button>
//             {isOpenModal &&
//                 <Modal onClose={()=>setIsOpenModal(false)}>
//                     <CreateCabinForm onCloseModal={()=>setIsOpenModal(false)}/>
//                 </Modal>}
//         </>
//     )
// }

function AddCabin() {
    return (
        <>
            <Modal>
                <Modal.Open opens='cabin-form'>
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name='cabin-form'>
                    <CreateCabinForm/>
                </Modal.Window>
            </Modal>

            <Modal>
                <Modal.Open opens='cabin-table'>
                    <Button>Show Cabin</Button>
                </Modal.Open>
                <Modal.Window name='cabin-table'>
                    <CabinTable/>
                </Modal.Window>
            </Modal>


        </>
    )
}

export default AddCabin;
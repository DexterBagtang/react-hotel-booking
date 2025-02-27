import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";

//this component receives the cabinToEdit prop from the CabinRow component
function CreateCabinForm({cabinToEdit = {},onCloseModal}) {
    //destructuring the received prop
    const {id: editId, ...editValues} = cabinToEdit;

    //return true if editId has value
    const isEditSession = Boolean(editId);

    //Form Hook that needed when submitting the form and applying default values in the form
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        getValues,
    } = useForm({
        defaultValues: isEditSession ? editValues : {}
    });


    //Mutation for Creating Cabin
    const {isCreating, createCabin} = useCreateCabin()


    //Mutation for Editing Cabin
    const {isEditing, editCabin} = useEditCabin();

    //Combine both Loading
    const isWorking = isCreating || isEditing;


    function onSubmit(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0];
        if (isEditSession) editCabin({newCabinData: {...data, image}, id: editId},
            {
                onSuccess: () => {
                    reset();
                    onCloseModal?.()
                }
            })
        else createCabin({...data, image: data.image[0]},
            {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                }
            });
        // console.log(data);
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal': 'regular'}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input type="text" id="name"
                       {...register("name"
                           , {required: "This field is required.",}
                       )}
                />
            </FormRow>

            <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
                <Input type="number" id="maxCapacity"
                       {...register("maxCapacity",
                           {
                               required: "This field is required.",
                               min: {
                                   value: 1,
                                   message: "Capacity must be greater than 0"
                               }
                           })}
                />
            </FormRow>

            <FormRow label="Regular Price" error={errors?.regularPrice?.message}>

                <Input type="number" id="regularPrice"
                       {...register("regularPrice", {
                           required: "This field is required.",
                           min: {
                               value: 1,
                               message: "Capacity must be greater than 0"
                           }
                       })} />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input type="number" id="discount" defaultValue={0}
                       {...register("discount", {
                           required: "This field is required.",
                           validate: (value) =>
                               value <= getValues().regularPrice ||
                               'Discount should be less than the regular price',
                       })} />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea type="number" id="description" defaultValue=""
                          {...register("description", {required: "This field is required.",})} />
            </FormRow>

            <FormRow label="Cabin Photo">
                <FileInput id="image" accept="image/*"
                           {...register("image",
                               {required: isEditSession ? false : "This field is required.",})} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset" onClick={()=> onCloseModal?.()}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Create new cabin'}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;

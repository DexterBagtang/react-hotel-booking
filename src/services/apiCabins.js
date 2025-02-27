import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins(){

    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if(error){
        console.error(error)
        throw new Error('Could not find cabins')
    }

    return data
}

export async function createEditCabin(newCabin,id){
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`
        .replaceAll('/','');
    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    //base query of create and update
    let query = supabase.from('cabins')

    //if no id then create operation
    if (!id){
        query = query.insert([{...newCabin,image: imagePath},])
    }
    //if there's an id then edit operation
    if(id){
        query = query.update({...newCabin,image: imagePath}).eq("id",id)
    }


    const { data, error } = await query.select().single()

    if(error){
        console.error(error)
        throw new Error('Could not create cabin')
    }

    if(hasImagePath) return data;


    //2.
    const {  error:storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    if(storageError){
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)

        throw new Error('Cabin image can not be uploaded ')
    }
    return data
}

export async function deleteCabin(id){

    const { data,error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if(error){
        console.error(error)
        throw new Error('Could not delete cabins')
    }

    return data

}
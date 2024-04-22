import supabase from "./supabaseClient";

const taskOwner = async (user_id: string | undefined, todo_id: number) => {
    const { data, error } = await supabase
        .from('Todo')
        .select('*')
        .eq('id', todo_id)
        .eq('user_id', user_id)
    if (error) {
        throw error;
    }

    if (data.length === 0) {
        return false;
    } else {
        return true;
    }
}

export default taskOwner;
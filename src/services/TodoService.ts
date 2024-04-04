import supabase from "@/utils/supabaseClient";

interface Todo {
    id: number;
    user_id?: number;
    name?: string;
    created_at: Date;
}

class TodoService {
    async getTodos(): Promise<Todo[]> {
        try {
            const { data, error } = await supabase.from("Todo").select("*");
            if (error) {
                throw error;
            }
            return data || [];
        } catch (error) {
            throw error;
        }
    }
}

export default new TodoService();
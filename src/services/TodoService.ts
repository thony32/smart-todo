import supabase from "@/utils/supabaseClient";

interface Todo {
    id: number;
    user_id?: string;
    name?: string;
    created_at: Date;
    email?: string;
}

class TodoService {
    async getTodos(): Promise<Todo[]> {
        try {
            const { data: Todos, error } = await supabase.rpc('get_todos');
            if (error) {
                throw error;
            }
            return Todos || [];
        } catch (error) {
            throw error;
        }
    }
}

export default new TodoService();
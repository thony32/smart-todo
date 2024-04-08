import supabase from "@/utils/supabaseClient";
import Todo from "@/models/Todo";

class TodoService {
    async getTodos({ front_user_id, search = '', page_size = 15}: { front_user_id: string | undefined; search?: string; page_size?: number; page_number?: number }): Promise<Todo[]> {
        try {
            const { data: Todos, error } = await supabase.rpc('get_todos', { front_user_id, search, page_size });
            if (error) {
                throw error;
            }
            return Todos || [];
        } catch (error) {
            throw error;
        }
    }
    async createTodo(todo: Todo) {
        try {
            const { data, error } = await supabase.from('Todo').insert(todo);
            if (error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default new TodoService();
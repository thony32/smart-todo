import supabase from "@/utils/supabaseClient";
import Todo from "@/models/Todo";

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
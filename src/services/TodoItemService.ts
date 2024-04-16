import TodoItem from "@/models/TodoItem";
import supabase from "@/utils/supabaseClient";

class TodoItemService {
    async find(todo_id: number): Promise<TodoItem[]> {
        try {
            const { data, error } = await supabase.from('TodoItems').select().filter('todo_id', 'eq', todo_id);
            if (error) {
                throw error;
            }
            return data || [];
        } catch (error) {
            throw error;
        }
    }
    async create(TodoItem: TodoItem) {
        try {
            const { data, error } = await supabase.from('TodoItems').insert(TodoItem);
            if (error) {
                throw error;
            }
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default new TodoItemService();
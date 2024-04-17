import supabase from "@/utils/supabaseClient";
import Todo from "@/models/Todo";

class TodoService {
    async getTodosItems(front_user_id: number, page_size: number, search: string = '') {
        try {
            const { data, error } = await supabase
                .from('Todo')
                .select(`*, TodoItems(*)`)
                .eq('user_id', front_user_id)
                .ilike('name', '%' + search + '%')
                .order('id', { ascending: false })
                .limit(page_size);
            if (error) {
                throw error;
            }
            return data || [];
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
import TodoItem from "@/models/TodoItem";
import supabase from "@/utils/supabaseClient";

class TodoItemService {
    async find(todo_id: number, limit?: number): Promise<TodoItem[]> {
        try {
            const { data, error } = await supabase.from('TodoItems')
                .select()
                .filter('todo_id', 'eq', todo_id)
                .eq('state', 'pending')
                .order('number', { ascending: true })
                .limit(limit as number);
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
    async rearrange(arrangeData: TodoItem[]) {
        try {
            arrangeData.forEach(async (item: any) => {
                const { data, error } = await supabase.from('TodoItems').update({ number: item.key }).eq('id', item.number).select();
                if (error) {
                    throw error;
                }
                return data;
            });
        } catch (error) {
            throw error;
        }
    }

    async removeArrange(id: number) {
        try {
            const { data, error } = await supabase.from('TodoItems').update({ number: null }).eq('todo_id', id).select();
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
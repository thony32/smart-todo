import TodoItem from '@/models/TodoItem';
interface Todo {
    id?: number;
    user_id?: string;
    name?: string;
    description?: string;
    created_at?: Date;
    email?: string;
    TodoItems?: TodoItem[];
}

export default Todo;
interface TodoItem {
    id?: number;
    todo_id?: number;
    description?: string;
    note?: string;
    created_at?: Date;
    finished_at?: Date;
}

export default TodoItem;
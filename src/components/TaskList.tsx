import TodoService from '@/services/TodoService';
import { useQuery } from '@tanstack/react-query'

const getTodos = async () => {
  try {
    return await TodoService.getTodos();
  } catch (error) {
    throw error;
  }
}

const TaskList = () => {
  const { isPending: todoPending, error: todoError, data: todos } = useQuery({
    queryKey: ['todoData'],
    queryFn: getTodos,
  });
  return (
    <div>
      <div>TaskList</div>
      <div>
        {todoPending && <div>Loading...</div>}
        {todoError && <div>Error: {todoError.message}</div>}
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
        {todos?.length === 0 && <div>No todo found</div>}
      </div>
    </div>
  )
}

export default TaskList
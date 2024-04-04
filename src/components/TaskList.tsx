import TodoService from '@/services/TodoService';
import supabase from '@/utils/supabaseClient';
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";

const getTodos = async () => {
  try {
    return await TodoService.getTodos();
  } catch (error) {
    throw error;
  }
}

const TaskList = () => {
  // * fetch data from the server
  const [refetchTodos, setRefetchTodos] = useState(false);
  const { isPending: todoPending, error: todoError, data: todos, refetch: todoRefetch } = useQuery({
    queryKey: ['todoData'],
    queryFn: getTodos,
  });

  // * real-time data
  useEffect(() => {
    const todoListener = supabase.channel('public:Todo').on('postgres_changes', { event: '*', schema: 'public', table: 'Todo' }, (playload: any) => {
      setRefetchTodos(true);
      toast('New event ' + playload.eventType, {
        position: 'bottom-right',
        className: 'text-sm',
      });
    }).subscribe()

    return () => {
      todoListener.unsubscribe();
    };
  }, [])

  useEffect(() => {
    if (refetchTodos) {
      todoRefetch();
      setRefetchTodos(false);
    }
  }, [refetchTodos])

  return (
    <div>
      <div>TaskList</div>
      <div>
        {todoPending && <div>Loading...</div>}
        {todoError && <div>Error: {todoError.message}</div>}
        {todos?.map((todo) => (
          <div key={todo.id}>
            {todo.name} , {todo.description}
          </div>
        ))}
        {todos?.length === 0 && <div>No todo found</div>}
      </div>
    </div>
  )
}

export default TaskList
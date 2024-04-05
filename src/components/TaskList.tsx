import TodoService from '@/services/TodoService';
import supabase from '@/utils/supabaseClient';
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react';
import toast from "react-hot-toast";
import { Input } from './ui/input';
import useKeyboard from '@/utils/useKeyboard';

const getTodos = async () => {
  try {
    return await TodoService.getTodos();
  } catch (error) {
    throw error;
  }
}

const TaskList = () => {
  // * fetch data from the server
  const { isPending: todoPending, error: todoError, data: todos, refetch: todoRefetch } = useQuery({
    queryKey: ['todoData'],
    queryFn: getTodos,
  });

  // * real-time data
  useEffect(() => {
    const todoListener = supabase.channel('public:Todo').on('postgres_changes', { event: '*', schema: 'public', table: 'Todo' }, (playload: any) => {
      toast('New event ' + playload.eventType, {
        position: 'bottom-right',
        className: 'text-sm',
      });
      todoRefetch();
    }).subscribe()

    return () => {
      todoListener.unsubscribe();
    };
  }, [])

  // * keyboard shortcut
  const searchInputRef = useRef<HTMLInputElement>(null);
  useKeyboard('f', () => searchInputRef.current?.focus());

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className="font-semibold first-letter:text-2xl">List TODO</h1>
        </div>
        <div className='flex items-center gap-2 relative'>
          <Input ref={searchInputRef} type="text" placeholder="Search" />
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 opacity-75">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <kbd className="kbd absolute right-4 -bottom-3 text-[8pt] py-1 px-2">Ctrl f</kbd>
        </div>
      </div>
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
import TodoService from "@/services/TodoService"
import supabase from "@/utils/supabaseClient"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { Input } from "./ui/input"
import useKeyboard from "@/utils/useKeyboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import Todo from "@/models/Todo"
import { Link } from "@tanstack/react-router"
import formatDate from "@/utils/dateFormat"
import SkeletonLoader from "./loading/loader"
import FetchingError from "./fetchingError"
import { useAuthStore } from "@/store/session.store"

const getTodos = async (user_id: string) => {
    return TodoService.getTodos(user_id)
}

const TaskList = () => {
    // * fetch data from the server
    const session = useAuthStore(state => state.session);
    const user_id = session?.user.id as string;
    const {
        isPending: todoPending,
        error: todoError,
        data: todos,
        refetch: todoRefetch,
    } = useQuery({
        queryKey: ["todoData", user_id],
        queryFn: ({ queryKey }) => getTodos(queryKey[1]),
        staleTime: 1000 * 60 * 5,
    })

    // * real-time data
    useEffect(() => {
        const todoListener = supabase
            .channel("public:Todo")
            .on("postgres_changes", { event: "*", schema: "public", table: "Todo" }, (playload: any) => {
                toast("New event " + playload.eventType, {
                    position: "bottom-right",
                    className: "text-sm",
                })
                todoRefetch()
            })
            .subscribe()

        return () => {
            todoListener.unsubscribe()
        }
    }, [])

    // * keyboard shortcut
    const searchInputRef = useRef<HTMLInputElement>(null)
    useKeyboard("f", () => searchInputRef.current?.focus())

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-[2%]">
                <div>
                    <h1 className="font-semibold first-letter:text-2xl">List of your todo</h1>
                </div>
                <div className="flex items-center gap-2 relative">
                    <Input ref={searchInputRef} type="text" placeholder="Search" />
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 opacity-75">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                    <kbd className="kbd absolute right-4 -bottom-3 text-[8pt] py-1 px-2 bg-secondary">Ctrl + f</kbd>
                </div>
            </div>
            {/* List of todo */}
            <div className="h-[80dvh] overflow-y-auto relative">
                <div className="grid grid-cols-5 gap-4 px-[2%]">
                    {todoPending && <SkeletonLoader />}
                    {todos?.map((todo: Todo) => (
                        <Link key={todo.id} to="/taskItems">
                            <Card className="cursor-pointer relative h-52 group hover:shadow-[0px_9px_10px_-3px] hover:shadow-success duration-100">
                                <CardHeader>
                                    <CardTitle className="group-hover:-translate-y-2 group-hover:text-success capitalize duration-75">{todo.name}</CardTitle>
                                    <CardDescription className="truncate">{todo.description}</CardDescription>
                                </CardHeader>
                                {/* aperçu anle task fotsn f mila clickena de ao hita dool ny fandeany */}
                                <CardContent>
                                    <div className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
                                        <p className="text-sm font-medium leading-none">Task one</p>
                                    </div>
                                    <div className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-gray-500" />
                                        <p className="text-sm font-medium leading-none">Task one</p>
                                    </div>
                                    <div className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-yellow-500" />
                                        <p className="text-sm font-medium leading-none">Task one</p>
                                    </div>
                                </CardContent>
                                <p className="absolute bottom-1 left-2 text-[8pt]">{formatDate(todo.created_at)}</p>
                                <span className="absolute bottom-0 right-0 text-xs font-bold bg-success rounded-br-xl rounded-tl-md pr-2 p-1">1 / {todo.id}</span>
                            </Card>
                        </Link>
                    ))}
                    {
                        todoError &&
                        <div className="absolute h-[80dvh] w-[95%] flex items-center justify-center">
                            {todoError && <FetchingError />}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskList

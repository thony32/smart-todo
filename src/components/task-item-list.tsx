import { Link, useParams } from "@tanstack/react-router"
import { Button } from "./ui/button"
import TodoItemService from "@/services/TodoItemService"
import { useQuery } from "@tanstack/react-query"
import TodoItem from "@/models/TodoItem"
import formatDate from "@/utils/dateFormat"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import supabase from "@/utils/supabaseClient"
import GeminiService from "@/services/GeminiService"

const findItem = async (id: number) => {
    return TodoItemService.find(id)
}
const TaskListItems = () => {
    const { todo_name, todo_id } = useParams({ strict: false }) as any;

    const [truncatedItems, setTruncatedItems] = useState({}) as any;
    const toggleTruncate = (itemId: any) => {
        setTruncatedItems((prevState: any) => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };

    const {
        isPending: itemPending,
        error: itemError,
        data: items,
        refetch: itemRefetch,
    } = useQuery({
        queryKey: ["todoData"],
        queryFn: () => findItem(todo_id),
        staleTime: 1000 * 60 * 5,
    })

    // * real-time data
    useEffect(() => {
        const todoListener = supabase
            .channel("public:TodoItems")
            .on("postgres_changes", { event: "*", schema: "public", table: "TodoItems" }, (playload: any) => {
                toast("New event " + playload.eventType, {
                    position: "bottom-right",
                    className: "text-sm",
                })
                itemRefetch()
            })
            .subscribe()

        return () => {
            todoListener.unsubscribe()
        }
    }, [])

    const todoItems = [
        {
            number: 1,
            todo: "Dormir",
        },
        {
            number: 2,
            todo: "Jouer au foot",
        },
        {
            number: 3,
            todo: "Ragarde les mails importants",
        },
    ]

    const [todoOrdered, setTodoOrdered] = useState('') as any
    const [isLoading, setIsLoading] = useState(false)
    const sendMerlin = async () => {
        try {
            setIsLoading(true)
            setTodoOrdered('')
            const response = await GeminiService.getMerlinData({ todos: todoItems })
            setTodoOrdered(response?.candidates?.[0]?.content?.parts?.[0]?.text);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center fill-current">
                    <h1 className="font-semibold first-letter:text-2xl">Task Items for {todo_name}</h1>
                    <div onClick={sendMerlin} className="relative group cursor-pointer hover:scale-105 duration-75">
                        <svg className={`w-6 ${isLoading && 'animate-spin'}`} viewBox="0 0 24 24">
                            <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"></path>
                        </svg>
                        <svg className={`w-4 absolute -top-2 -right-3 ${isLoading && 'animate-spin'}`} viewBox="0 0 24 24">
                            <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path><path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path>
                        </svg>
                    </div>
                </div>
                <Link to="/">
                    <Button variant={'ghost'}>Back</Button>
                </Link>
            </div>
            <div className="flex justify-around gap-7">
                {/* PENDING */}
                <div className="w-1/4 space-y-5">
                    <div className="flex items-center gap-2">
                        <label className="text-xl first-letter:text-2xl font-bold text-gray-500">Pending</label>
                        <span className="text-xs bg-gray-500 px-2 py-1 rounded-badge font-bold">{items?.length}</span>
                    </div>
                    {/* Card */}
                    {itemPending && <p>Loading...</p>}
                    {itemError && <p>{itemError.message}</p>}
                    <div className="space-y-1">
                        {
                            items && items.map((item: TodoItem) => (
                                <div key={item.id} className="bg-gray-500/15 px-3 py-2 cursor-grab space-y-5">
                                    <div className="space-y-1">
                                        <p className="font-bold text-sm">{item.description}</p>
                                        <p key={item.id} className={`text-xs font-light ${truncatedItems[item.id || 0] ? 'text-clip' : 'truncate'} cursor-pointer`}
                                            onClick={() => toggleTruncate(item.id)}>
                                            {item.note}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 cursor-pointer hover:scale-105 duration-100">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                        </svg>
                                        <span className="text-xs">{formatDate(item.created_at)}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {items && items.length === 0 && <p>No data</p>}
                </div>
                {/* ON GOING */}
                <div className="w-1/4">
                    <div className="flex items-center gap-2">
                        <label className="text-xl first-letter:text-2xl font-bold text-sky-500">On going...</label>
                        <span className="text-xs bg-sky-500 px-2 py-1 rounded-badge font-bold">2</span>
                    </div>
                </div>
                {/* DONE */}
                <div className="w-1/4">
                    <div className="flex items-center gap-2">
                        <label className="text-xl first-letter:text-2xl font-bold text-success">Finished</label>
                        <span className="text-xs bg-success px-2 py-1 rounded-badge font-bold">2</span>
                    </div>
                </div>
                {/* ARCHIVED */}
                <div className="w-1/4">
                    <div className="flex items-center gap-2">
                        <label className="text-xl first-letter:text-2xl font-bold text-yellow-200">Archived</label>
                        <span className="text-xs bg-yellow-200 text-warning-content px-2 py-1 rounded-badge font-bold">2</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskListItems
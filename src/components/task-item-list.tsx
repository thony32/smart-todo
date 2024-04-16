import { Link, useParams } from "@tanstack/react-router"
import { Button } from "./ui/button"
import TodoItemService from "@/services/TodoItemService"
import { useQuery } from "@tanstack/react-query"
import TodoItem from "@/models/TodoItem"
import formatDate from "@/utils/dateFormat"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import supabase from "@/utils/supabaseClient"

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold first-letter:text-2xl">Task Items for {todo_name}</h1>
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
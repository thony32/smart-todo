import TodoService from "@/services/TodoService"
import supabase from "@/utils/supabaseClient"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import toast from "react-hot-toast"
import { Input } from "./ui/input"
import useKeyboard from "@/utils/useKeyboard"
import SkeletonLoader from "./loading/loader"
import { Checkbox } from "./ui/checkbox"

const getTodos = async () => {
    return TodoService.getTodos()
}

const TaskList = () => {
    // * fetch data from the server
    const {
        isPending: todoPending,
        error: todoError,
        data: todos,
        refetch: todoRefetch,
    } = useQuery({
        queryKey: ["todoData"],
        queryFn: getTodos,
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
            <div className="flex justify-between items-center px-[10%]">
                <div>
                    <h1 className="font-semibold first-letter:text-2xl">Drag and drop your task</h1>
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
            <div>
                <div className="grid grid-cols-3 gap-4 max-sm:overflow-x-scroll">
                    <div className="flex flex-col gap-4 items-center p-8">
                        <div className="text-center p-2 rounded-xl bg-destructive/50 w-2/3 first-letter:text-2xl first-letter:font-extrabold font-bold uppercase">Todo</div>
                        {todoPending && <SkeletonLoader />}
                        {todoError && <div className="p-8 bg-red-600 w-2/3 rounded-md">Error: {todoError.message}</div>}
                        {/* Card */}
                        {todos?.map((todo: any) => (
                            <div
                                className="w-2/3 px-8 py-4 rounded-lg bg-secondary border border-destructive/50 flex flex-col justify-center gap-4"
                                key={todo.id}
                            >
                                <div className="flex items-center gap-12">
                                    <Checkbox />
                                    <p className="font-bold text-sm">{todo.name}</p>
                                </div>
                                <p className="text-xs font-light">{todo.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 items-center p-8">
                        <div className="text-center p-2 rounded-xl bg-warning/50 w-2/3 first-letter:text-2xl first-letter:font-extrabold font-bold uppercase">On going...</div>
                        <div className="w-2/3 px-8 py-4 rounded-lg bg-secondary border border-warning/50 flex flex-col justify-center gap-4">
                            <div className="flex items-center gap-12">
                                <Checkbox />
                                <p className="font-bold text-sm">To do title</p>
                            </div>
                            <p className="text-xs font-light">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quibusdam a aut provident quia, error earum, sint
                                qui odit dolorum tenetur ex vitae ipsam accusamus consequuntur repellat cupiditate pariatur itaque?
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center p-8">
                        <div className="text-center p-2 rounded-xl bg-success/50 w-2/3 first-letter:text-2xl first-letter:font-extrabold font-bold uppercase">Done</div>
                        <div className="w-2/3 px-8 py-4 rounded-lg bg-secondary border border-success/50 flex flex-col justify-center gap-4">
                            <div className="flex items-center gap-12">
                                <Checkbox checked />
                                <p className="font-bold text-sm line-through">To do title</p>
                            </div>
                            <p className="text-xs line-through font-light">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quibusdam a aut provident quia, error earum, sint
                                qui odit dolorum tenetur ex vitae ipsam accusamus consequuntur repellat cupiditate pariatur itaque?
                            </p>
                        </div>
                    </div>
                </div>
                {todos?.length === 0 && <div>No todo found</div>}
            </div>
        </div>
    )
}

export default TaskList

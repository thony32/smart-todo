import { Checkbox } from "@radix-ui/react-checkbox"
import { Link, useParams } from "@tanstack/react-router"
import { Button } from "./ui/button"

const TaskListItems = () => {
    const { todo_name } = useParams({ strict: false }) as any
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold first-letter:text-2xl">Task Items for {todo_name}</h1>
                <Link to="/">
                    <Button variant={'ghost'}>Back</Button>
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 max-sm:overflow-x-scroll">
                <div className="flex flex-col gap-4 items-center p-8">
                    <div className="text-center p-2 rounded-xl bg-destructive/50 w-2/3 first-letter:text-2xl first-letter:font-extrabold font-bold uppercase">Todo</div>
                    {/* Card */}
                    <div className="w-2/3 px-8 py-4 rounded-lg bg-secondary border border-destructive/50 flex flex-col justify-center gap-4">
                        <div className="flex items-center gap-12">
                            <Checkbox />
                            <p className="font-bold text-sm">Todo item 1</p>
                        </div>
                        <p className="text-xs font-light">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus consequatur tempore id, mollitia nostrum et dolor aperiam labore! Voluptatibus est libero nobis repudiandae rerum vero aliquam, suscipit similique provident hic.
                        </p>
                    </div>
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
        </div>
    )
}

export default TaskListItems
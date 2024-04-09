import { useParams } from "@tanstack/react-router"


const AddTaskItemForm = () => {
    const { todo_id } = useParams({ strict: false }) as any
    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-semibold first-letter:text-2xl">Form for Adding {todo_id}</h1>
            </div>
            <div>
                form here
            </div>
        </div>
    )
}

export default AddTaskItemForm
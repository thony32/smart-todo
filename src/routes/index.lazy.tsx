import AddTaskForm from "@/components/forms/task-form"
import TaskList from "@/components/task-list"
import { createLazyFileRoute } from "@tanstack/react-router"

const Index = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className="col-span-2 p-3">
                <AddTaskForm />
            </div>
            <div className="col-span-10 p-3">
                <TaskList />
            </div>
        </div>
    )
}

export const Route = createLazyFileRoute('/')({
    component: Index,
})


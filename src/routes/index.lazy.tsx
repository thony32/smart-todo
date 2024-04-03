import AddTaskForm from "@/components/AddTaskForm"
import TaskList from "@/components/TaskList"
import { createLazyFileRoute } from "@tanstack/react-router"

const Index = () => {
    return (
        <div className="grid grid-cols-12">
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


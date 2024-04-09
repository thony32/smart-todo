import TaskListItems from '@/components/TaskListItems'
import { createFileRoute } from '@tanstack/react-router'

const TaskItems = () => {
  const { todo_id, todo_name } = Route.useParams()
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 p-3">
        Form ajout items ngb {todo_id}
      </div>
      <div className="col-span-10 p-3">
        {todo_name}
        <TaskListItems />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/taskItems/$todo_id/$todo_name')({
  component: TaskItems
})
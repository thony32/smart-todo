import TaskListItems from '@/components/TaskListItems'
import { createFileRoute } from '@tanstack/react-router'

const TaskItems = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 p-3">
        Form ajout items ngb
      </div>
      <div className="col-span-10 p-3">
        <TaskListItems />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/taskItems')({
  component: TaskItems
})
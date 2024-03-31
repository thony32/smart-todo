import { createLazyFileRoute } from "@tanstack/react-router"

const Index = () => {
    return (
        <div className="p-2">
            <h3>Do it better</h3>
        </div>
    )
}

export const Route = createLazyFileRoute('/')({
    component: Index,
})


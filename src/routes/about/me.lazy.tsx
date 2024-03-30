import { createLazyFileRoute } from "@tanstack/react-router"

const Me = () => {
    return (
        <div className="p-2 h-full flex justify-center items-center bg-red-200">ABout me!</div>
    )
}

export const Route = createLazyFileRoute("/about/me")({
    component: Me,
})


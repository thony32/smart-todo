import { Outlet, createLazyFileRoute } from "@tanstack/react-router"

const About = () => {
    return (
        <div className="p-2">
            <div>Hello from About!</div>
            <Outlet />
        </div>
    )
}

export const Route = createLazyFileRoute("/about")({
    component: About,
})

import ThemeHandler from "../components/ThemeHandler";
import Navbar from "../components/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const Route = createRootRoute({
    component: () => (
        <ThemeHandler defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="p-3">
                <Navbar />
            </div>
            <main className="px-[1%]">
                <Outlet />
            </main>
            <TanStackRouterDevtools />
        </ThemeHandler>
    ),
})

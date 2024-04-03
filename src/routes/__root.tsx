/* eslint-disable react-hooks/rules-of-hooks */
import ThemeHandler from "../components/ThemeHandler";
import Navbar from "../components/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuthStore } from "@/store/session.store";
import Login from "@/components/Login";


export const Route = createRootRoute({
    component: () => {
        const session = useAuthStore(state => state.session);
        return (
            <AuthProvider>
                <ThemeHandler defaultTheme="dark" storageKey="vite-ui-theme">
                    {
                        !session
                            ?
                            <div className="h-screen flex justify-center items-center">
                                <Login />
                            </div>
                            :
                            <>
                                <div className="p-3">
                                    <Navbar />
                                </div>
                                <main className="px-[1%]">
                                    <Outlet />
                                </main>
                                <TanStackRouterDevtools />
                            </>
                    }
                </ThemeHandler>
            </AuthProvider>
        );
    },
})

/* eslint-disable react-hooks/rules-of-hooks */
import ThemeHandler from "../components/theming/theme-handler";
import Navbar from "../components/layout/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuthStore } from "@/store/session.store";
import Login from "@/components/auth/login";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MadeWith from "@/components/layout/tech";


export const Route = createRootRoute({
    component: () => {
        const session = useAuthStore(state => state.session);
        const queryClient = new QueryClient();
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
                            <div className="md:h-screen h-full w-screen">
                                <div className="p-3">
                                    <Navbar />
                                </div>
                                <main className="px-[1%]">
                                    <QueryClientProvider client={queryClient}>
                                        <Outlet />
                                    </QueryClientProvider>
                                </main>
                                <TanStackRouterDevtools />
                            </div>
                    }
                    <div className="fixed bottom-2 right-2">
                        <MadeWith />
                    </div>
                </ThemeHandler>
                <Toaster />
            </AuthProvider>
        );
    },
})

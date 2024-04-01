/* eslint-disable react-hooks/rules-of-hooks */
import ThemeHandler from "../components/ThemeHandler";
import Navbar from "../components/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from "@/utils/supabaseClient";
// import { AuthProvider } from "@/contexts/AuthContext";
import { useAuthStore } from "@/store/session.store";


export const Route = createRootRoute({
    component: () => {
        const session = useAuthStore(state => state.session);

        return (
            <ThemeHandler defaultTheme="dark" storageKey="vite-ui-theme">
                {
                    !session
                        ?
                        <div className="h-screen flex justify-center items-center">
                            <div className="space-y-4">
                                <h1 className="text-center text-2xl font-bold">Smart TODO</h1>
                                <Auth supabaseClient={supabase} providers={["google", "github"]} socialLayout="horizontal" appearance={{ theme: ThemeSupa }} />
                            </div>
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
        );
    },
})

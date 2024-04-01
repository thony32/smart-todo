import ThemeHandler from "../components/ThemeHandler";
import Navbar from "../components/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from "react";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import supabase from "@/utils/supabaseClient";

export const Route = createRootRoute({
    component: () => {
        const [session, setSession] = useState<Session | null>(null)

        useEffect(() => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session)
            })

            const {
                data: { subscription },
            } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session)
            })

            return () => subscription.unsubscribe()
        }, [])

        return (
            <>
                {
                    !session
                        ?
                        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
                        :
                        <ThemeHandler defaultTheme="dark" storageKey="vite-ui-theme" >
                            <div className="p-3">
                                <Navbar />
                            </div>
                            <main className="px-[1%]">
                                <Outlet />
                            </main>
                            <TanStackRouterDevtools />
                        </ThemeHandler >

                }
            </>
        );
    },
})

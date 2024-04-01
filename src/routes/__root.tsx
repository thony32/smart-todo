import ThemeHandler from "../components/ThemeHandler";
import Navbar from "../components/Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from "react";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://hiwtdeuhsiufypdquwon.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpd3RkZXVoc2l1ZnlwZHF1d29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5NDg4MzksImV4cCI6MjAyNzUyNDgzOX0.Iquugqk2__nfFhpkGLRVaZjWGRp9uaavZgfCA7dzcFs')

export const Route = createRootRoute({
    component: () => {
        const [session, setSession] = useState(null) as any

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

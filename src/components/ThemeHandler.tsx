import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeHandlerProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

type ThemeHandlerState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeHandlerState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeHandlerContext = createContext<ThemeHandlerState>(initialState)

const ThemeHandler = ({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }: ThemeHandlerProps) => {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }
    return (
        <ThemeHandlerContext.Provider {...props} value={value}>
            {children}
        </ThemeHandlerContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeHandlerContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}

export default ThemeHandler
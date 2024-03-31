import { ThemeToggle } from "./ThemeToggle"

const Navbar = () => {
    return (
        <div className="flex justify-between">
            <div>
                <h1>Smart todo</h1>
            </div>
            <div>
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Navbar
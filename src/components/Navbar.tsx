import { ThemeToggle } from "./ThemeToggle"
import Logout from "./Logout"

const Navbar = () => {
    return (
        <div className="flex justify-between">
            <div>
                <h1>Smart todo</h1>
            </div>
            <div className="flex items-center gap-5">
                <ThemeToggle />
                <Logout />
            </div>
        </div>
    )
}

export default Navbar
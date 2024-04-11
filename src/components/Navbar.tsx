import { ThemeToggle } from "./ThemeToggle"
import Logout from "./Logout"
import UserInfos from "./UserInfos"

const Navbar = () => {
    return (
        <div className="flex justify-between">
            <div>
                <h1 className="text-lg sm:text-2xl first-letter:text-3xl font-bold text-success font-rusted-bevel">Smart TODO</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-5">
                <UserInfos />
                <ThemeToggle />
                <Logout />
            </div>
        </div>
    )
}

export default Navbar
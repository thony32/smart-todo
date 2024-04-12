import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import AuthService from "@/services/AuthService";

const Logout = () => {
    const handleLogout = async () => {
        await AuthService.signOut();
    };
    return (
        <Button onClick={() => handleLogout()} variant="outline" size="icon">
            <LogOutIcon className="h-5 w-5" />
        </Button>
    )
}

export default Logout
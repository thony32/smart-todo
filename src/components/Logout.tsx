import supabase from "@/utils/supabaseClient"
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const Logout = () => {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
    };
    return (
        <Button onClick={() => handleLogout()} variant="outline" size="icon">
            <LogOutIcon className="h-5 w-5" />
        </Button>
    )
}

export default Logout
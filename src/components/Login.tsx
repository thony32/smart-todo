import supabase from "@/utils/supabaseClient";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = async (event: any) => {
        event.preventDefault();
        
        await setIsLogin(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        await setIsLogin(false);

        if (error) {
            console.error(error);
        }
    };

    const handleSocialLogin = async (provider: any) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
        });
        if (error) {
            console.error(error);
        }
    };
    return (
        <div className="space-y-8">
            <div>
                <h1>This is the custom login for smart TODO</h1>
            </div>
            <div>
                <form className="space-y-5" onSubmit={handleLogin}>
                    <div className="space-y-3">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Log in {isLogin && 'Loading'}</Button>
                        </div>
                    </div>
                    <hr />
                    <div className="flex gap-3">
                        <Button type="button" onClick={() => handleSocialLogin('google')}>
                            Log in with Google
                        </Button>
                        <Button type="button" onClick={() => handleSocialLogin('github')}>
                            Log in with Github
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
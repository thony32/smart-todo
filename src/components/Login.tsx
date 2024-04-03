import supabase from "@/utils/supabaseClient";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await setIsLogin(true);

            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });
            if (error) {
                console.error(error);
            }
            
            await setIsLogin(false);
        }
    });

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
                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div className="space-y-3">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <div className="flex justify-between">
                                <Label htmlFor="email">Email</Label>
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-xs text-error">{formik.errors.email}</div>
                                )}
                            </div>
                            <Input type="email" id="email" placeholder="Email" {...formik.getFieldProps('email')} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <div className="flex justify-between">
                                <Label htmlFor="password">Password</Label>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-xs text-error">{formik.errors.password}</div>
                                )}
                            </div>
                            <Input type="password" id="password" placeholder="Password" {...formik.getFieldProps('password')} />
                        </div>
                        <div className="flex justify-end">
                            <Button className="flex items-center gap-2" type="submit">
                                Log in
                                {isLogin && <span className="loading loading-dots loading-md"></span>}
                            </Button>
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
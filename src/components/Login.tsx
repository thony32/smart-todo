import supabase from "@/utils/supabaseClient";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from "react-hot-toast";

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
                toast.error(error.message, {
                    duration: 3000,
                    position: 'bottom-center',
                    className: 'bg-error text-white',
                });
            } else {
                toast.success('Welcome to Smart TODO', {
                    duration: 5000,
                    position: 'bottom-center',
                    className: 'bg-success text-white',
                });
            }

            await setIsLogin(false);
        }
    });

    const handleSocialLogin = async (provider: any) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
        });
        if (error) {
            toast.error(error.message, {
                duration: 3000,
                position: 'bottom-center',
                className: 'bg-error text-white',
            });
        } else {
            toast.success('Welcome to Smart TODO', {
                duration: 5000,
                position: 'bottom-center',
                className: 'bg-success text-white',
            });
        }
    };
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl first-letter:text-5xl font-bold text-success">Smart TODO</h1>
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
                            <Input className={`${formik.touched.email && formik.errors.email ? 'border-error focus-visible:ring-error' : ''}`} type="email" id="email" placeholder="Email" {...formik.getFieldProps('email')} />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <div className="flex justify-between">
                                <Label htmlFor="password">Password</Label>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-xs text-error">{formik.errors.password}</div>
                                )}
                            </div>
                            <Input className={`${formik.touched.password && formik.errors.password ? 'border-error focus-visible:ring-error' : ''}`} type="password" id="password" placeholder="Password" {...formik.getFieldProps('password')} />
                        </div>
                        <div className="flex justify-end">
                            <Button className="flex items-center gap-2 bg-success hover:bg-success/75 text-success-content" type="submit">
                                Log in
                                {isLogin && <span className="loading loading-dots loading-md"></span>}
                            </Button>
                        </div>
                    </div>
                    <div className="divider divider-success">OR</div>
                    <div className="flex justify-between items-center">
                        <div>
                            <label className="text-base font-semibold">Log with your</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg onClick={() => handleSocialLogin('github')} className="w-10 fill-current cursor-pointer hover:scale-110 duration-100" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path>
                            </svg>
                            <svg onClick={() => handleSocialLogin('google')} className="w-12 fill-current cursor-pointer hover:scale-110 duration-100" viewBox="0 0 32 32" fill="none">
                                <path
                                    d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z"
                                    fill="#EA4335" />
                                <path
                                    d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z"
                                    fill="#FBBC05" />
                                <path d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z"
                                    fill="#34A853" />
                                <path d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z" fill="#C5221F" />
                                <path d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z"
                                    fill="#C5221F" />
                                <path d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z" fill="#C5221F" />
                                <path d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z"
                                    fill="#4285F4" />
                            </svg>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
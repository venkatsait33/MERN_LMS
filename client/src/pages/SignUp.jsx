import { useLoginUserMutation, useRegisterUserMutation } from "@/api/authApi"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const SignUp = () => {
    const [signupInput, setSignupInput] = useState({
        name: '',
        email: "",
        password: "",
    });
    const [loginInput, setLoginInput] = useState({ email: "", password: "" });

    const [registerUser, { data: registerData,
        error: registerError,
        isLoading: registerIsLoading,
        isSuccess: registerIsSuccess }] = useRegisterUserMutation();
    const [loginUser, {
        data: loginData,
        error: loginError,
        isLoading: loginIsLoading,
        isSuccess: loginIsSuccess
    }] = useLoginUserMutation()

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value });
        } else {
            setLoginInput({ ...loginInput, [name]: value });
        }
    };


    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupInput : loginInput;
        const action = type === "signup" ? registerUser : loginUser;
        await action(inputData);
    }

    useEffect(() => {
        if (registerData && registerIsSuccess) {
            toast.success(registerData.message || "Registration Successful");
        }

        if (loginData && loginIsSuccess) {
            toast.success(loginData.message || "Login Successful");
        }

        if (registerError) {
            toast.error(registerError.data.message || "Registration Failed");
        }

        if (loginError) {
            toast.error(loginError.data.message || "Login Failed");
        }

    }, [registerData, loginData, loginIsSuccess, loginError, registerError, registerIsSuccess])

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <div>
                <Tabs defaultValue="signin" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Signin</TabsTrigger>
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                        <Card>
                            <CardHeader>
                                <CardTitle >signin</CardTitle>

                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">email</Label>
                                    <Input id="email"
                                        name="email"
                                        value={setLoginInput.email} type="email"
                                        onChange={(e) => changeInputHandler(e, 'signin')}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">password</Label>
                                    <Input id="password"
                                        type='password'
                                        name="password"
                                        value={setLoginInput.password} onChange={(e) => changeInputHandler(e, 'signin')} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    disabled={loginIsLoading}
                                    onClick={() => handleRegistration("signin")} >{
                                        loginIsLoading ? <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> please wait
                                        </> : "Login"
                                    }</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>signup</CardTitle>
                                <CardDescription>Create a new account and click signup when you&apos;re done.</CardDescription>

                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="username">username </Label>
                                    <Input id="username"
                                        name="name"
                                        value={signupInput.name}
                                        onChange={(e) => changeInputHandler(e, 'signup')}
                                        type="text" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">email </Label>
                                    <Input id="email" name="email"
                                        value={signupInput.email} type="email" onChange={(e) => changeInputHandler(e, 'signup')} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password"> password</Label>
                                    <Input id="password" type="password" name="password"
                                        value={signupInput.password} onChange={(e) => changeInputHandler(e, 'signup')} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>{
                                    registerIsLoading ? <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> please wait
                                    </> : "Sign Up"
                                }</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

            </div></div>
    )
}

export default SignUp
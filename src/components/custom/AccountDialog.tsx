"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import LoginCard from "@/components/custom/LoginCard";
import SignupCard from "@/components/custom/SignupCard";
import { useActionState, useEffect, useState } from "react";
import { FormState, loginAction as login, signupAction as signup, signInWithProvider } from "@/utils/actions/account";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function AccountDialog() {
    const [tab, setTab] = useState("login");
    const [loginState, loginAction, isLoadingForLogin] = useActionState<FormState | undefined, FormData>(login, undefined);
    const [signupState, signupAction, isLoadingForSignup] = useActionState(signup, undefined)
    const router = useRouter();
    const searchParams = useSearchParams();
    const open = searchParams.get('isLoginPage') == "true";

    useEffect(() => {
        if (loginState?.statusText == "success") toast.success("Success", { description: loginState.message });
        else if (signupState?.statusText == "success") toast.success("Success", { description: signupState.message })
        else if (loginState?.statusText == "supabaseerror") toast.error("Error", { description: loginState.message })
        else if (signupState?.statusText == "supabaseerror") toast.error("Error", { description: signupState.message })
    }, [loginState?.statusText, signupState?.statusText]);

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && router.push('/')}>
            <DialogTrigger asChild>
                <Button style={{ cursor: 'pointer' }} onClick={() => router.push('/?isLoginPage=true')}>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle style={{ textAlign: 'center' }}>Authentication Form</DialogTitle>
                </DialogHeader>
                <Button onClick={() => signInWithProvider('google')} disabled={isLoadingForLogin || isLoadingForSignup} style={{ cursor: 'pointer' }}><Image src={'/google.svg'} alt="Google Logo" width={28} height={28} /> Sign in with Google</Button>
                <Separator />
                <Tabs defaultValue={tab} onValueChange={(value) => setTab(value)}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginCard isLoading={isLoadingForLogin} state={loginState} action={loginAction} />
                    </TabsContent>
                    <TabsContent value="signup">
                        <SignupCard isLoading={isLoadingForSignup} state={signupState} action={signupAction} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
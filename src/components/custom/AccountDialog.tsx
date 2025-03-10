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
import { useActionState } from "react";
import { accountAction, FormState, signInWithProvider } from "@/utils/actions/account";
import { useRouter, useSearchParams } from "next/navigation";

export function AccountDialog() {
    const [state, action, isLoading] = useActionState<FormState | undefined, FormData>(accountAction, undefined);
    const router = useRouter()
    const searchParams = useSearchParams();
    const open = searchParams.get('isLoginPage') == "true";
    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && router.push('/')}>
            <DialogTrigger asChild>
                <Button style={{ cursor: 'pointer' }} onClick={() => router.push('/?isLoginPage=true')}>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle style={{ textAlign: 'center' }}>Authentication Form</DialogTitle>
                </DialogHeader>
                <Button onClick={() => signInWithProvider('google')} disabled={isLoading} style={{ cursor: 'pointer' }}><Image src={'/google.svg'} alt="Google Logo" width={28} height={28} /> Sign in with Google</Button>
                <Separator />
                <Tabs defaultValue="login">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Signup</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginCard isLoading={isLoading} state={state} action={action} />
                    </TabsContent>
                    <TabsContent value="signup">
                        <SignupCard isLoading={isLoading} state={state} action={action} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
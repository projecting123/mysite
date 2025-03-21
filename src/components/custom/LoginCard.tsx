import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
interface LoginCardProps {
    isLoading: boolean,
    state: any,
    action: (data: FormData) => void
}
export default function LoginCard({ isLoading, state, action }: LoginCardProps) {
    const MotionCard = motion.create(Card);
    return (
        <>
            <form action={action}>
                <MotionCard layout initial={{ y: "50%" }} animate={{ y: 0 }} transition={{ duration: 0.2 }}>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input readOnly={isLoading} defaultValue={state?.email} name="email" id="email" type="email" placeholder="Enter your email" autoComplete="off" />
                            {state?.emailErrorMessage && <span className="text-xs text-red-500">{state.emailErrorMessage}</span>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input readOnly={isLoading} name="password" id="password" type="password" placeholder="Confirm your password" autoComplete="off" />
                            {state?.passwordErrorMessage && <span className="text-xs text-red-500">{state.passwordErrorMessage}</span>}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button disabled={isLoading} type="submit" className="mt-3" style={{ cursor: 'pointer' }}>Login</Button>
                    </CardFooter>
                </MotionCard>
            </form>

        </>
    )
}

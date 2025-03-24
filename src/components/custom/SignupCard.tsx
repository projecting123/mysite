import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
interface SignupCardProps {
    isLoading: boolean,
    state: any,
    action: (data: FormData) => void
}

export default function SignupCard({ isLoading, state, action }: SignupCardProps) {
    const MotionCard = motion.create(Card);
    return (
        <>
            <form action={action}>
                <MotionCard layout initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.2}}>
                    <CardContent className="space-y-2">
                        <motion.div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input readOnly={isLoading} defaultValue={state?.name} name="name" id="name" type="text" placeholder="Enter your name" autoComplete="off" />
                            {state?.nameErrorMessage && <span className="text-xs text-red-500">{state.nameErrorMessage}</span>}
                        </motion.div>

                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input readOnly={isLoading} defaultValue={state?.email} name="email" id="email" type="email" placeholder="Enter your email" autoComplete="off" />
                            {state?.emailErrorMessage && <span className="text-xs text-red-500">{state.emailErrorMessage}</span>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input readOnly={isLoading} name="password" id="password" type="password" placeholder="Create a password" autoComplete="off" />
                            {state?.passwordErrorMessage && <span className="text-xs text-red-500">{state.passwordErrorMessage}</span>}
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <Button disabled={isLoading} style={{ cursor: 'pointer' }} type="submit" className="mt-3 justify-end">Signup</Button>
                    </CardFooter>
                </MotionCard>
            </form>

        </>
    )
}

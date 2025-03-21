"use client";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AuthContext } from "@/utils/providers/auth";
import { Flex, Text } from "@radix-ui/themes";
import { useContext } from "react";
import { ArrowUpRight } from "lucide-react";
import { HTMLMotionProps, motion } from "motion/react";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
    const user = useContext(AuthContext);
    const router = useRouter();
    const iconAnimation: HTMLMotionProps<"div"> = {
        initial: {
            y: 0,
            rotate: 0,
            opacity: 0,
        },
        animate: {
            y: 0,
            rotate: 360,
            opacity: 1,
        },
        transition: {
            delay: 0.4
        }
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Hello, {user?.user_metadata.name}</CardTitle>
                    <CardDescription>Welcome to Concept Research</CardDescription>
                </CardHeader>
                <CardContent>
                    <Flex direction={"column"}>
                        <Text>Completed Questions: </Text>
                        <Text>Left Questions: </Text>
                        <Text>Corrected Questions : </Text>
                    </Flex>
                </CardContent>
                <CardFooter>
                    <Button style={{ cursor: "pointer" }} size={"sm"} onClick={() => router.push("/dashboard/profile")}>
                        Edit Profile <motion.div {...iconAnimation}><ArrowUpRight /></motion.div>
                    </Button>
                </CardFooter>
            </Card>

            <motion.svg>

                <motion.line
                    x1={0} y1={0}
                    x2={100} y2={100} 
                    stroke={"red"} 
                    initial={ { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1}}
                />
            </motion.svg>
        </>
    )
}
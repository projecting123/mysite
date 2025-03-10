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
import {ArrowUpRight} from "lucide-react"
export default function DashboardPage() {
    const user = useContext(AuthContext);
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
                    <Button size={"sm"}>Edit Profile <ArrowUpRight /></Button>
                </CardFooter>
            </Card>
        </>
    )
}

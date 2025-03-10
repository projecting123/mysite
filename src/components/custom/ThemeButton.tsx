"use client";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function ThemeButton() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if(!mounted) return <Skeleton className="h-[36px] w-[105.828px] rounded-sm"/>
    else return (
        <>
            <Select defaultValue={theme} onValueChange={(value) => setTheme(value)}>
                <SelectTrigger>
                    <SelectValue placeholder={theme}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light"><Sun/>Light</SelectItem>
                    <SelectItem value="dark"><Moon/>Dark</SelectItem>
                    <SelectItem value="system"><Monitor />System</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}

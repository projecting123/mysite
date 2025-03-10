"use client";

import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { logoutAction } from "@/utils/actions/account";
import {Bell, Settings, LogOut, User as UserIcon} from "lucide-react"
export default function AccountDropdown({ user }: { user: User }) {
    const initials = user?.user_metadata.name.split(' ')[0].charAt(0)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'outline'} style={{ cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px' }}>
                        {initials}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild style={{ cursor: 'pointer' }}>
                        <Link href={'/dashboard/profile'}><UserIcon /> Profile</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild style={{ cursor: 'pointer' }}>
                        <Link href={'/dashboard/notifications'}><Bell /> Notifications</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => logoutAction()} style={{ cursor: 'pointer' }}>
                        <LogOut/> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

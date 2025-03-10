"use client";

import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { logoutAction } from "@/utils/actions/account";
import { Bell, LogOut, User as UserIcon } from "lucide-react"
import Image from "next/image";
export default function AccountDropdown({ user }: { user: User }) {
    const initials = user?.user_metadata?.name?.split(' ')[0].charAt(0);
    const avatar = user?.user_metadata?.avatar_url;

    const buttonStyle = { cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px' };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {
                        avatar ? <Image src={avatar} alt="Profile picture" width={40} height={40} style={{ borderRadius: '50%' }} />
                               : <Button variant={'outline'} style={buttonStyle}>{initials}</Button>
                    }
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
                        <LogOut /> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

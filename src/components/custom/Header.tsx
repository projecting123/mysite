'use client';

import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "@/components/custom/ThemeButton";
import { AccountDialog } from "@/components/custom/AccountDialog";
import AccountDropdown from "./AccountDropdown";
import { User } from "@supabase/supabase-js";


export default function Header({ user }: { user: User | null }) {
    return (
        <>
            <Flex flexGrow={'1'} align={'center'} gap={'2'}>
                <Flex flexGrow={'1'} align={'center'} gap={{ initial: '3', sm: '5' }}>
                    <Link href={user ? '/dashboard' : '/'}><Image src={'/logo.png'} alt="logo" width={32} height={32} style={{ minWidth: '32px', minHeight: '32px' }} /></Link>
                </Flex>
                <Flex gap={'3'}>
                    <ThemeButton />
                    {!user ? <AccountDialog /> : <AccountDropdown user={user} />}
                </Flex>
            </Flex>
        </>
    )
}


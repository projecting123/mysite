"use client";
import { User } from "@supabase/supabase-js";
import { Book, FileQuestion, NotebookPen, User2, LayoutDashboard } from "lucide-react";
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenuItem,
    SidebarMenu,
    SidebarSeparator,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import { Badge } from "../ui/badge";

const AppSidebar = ({ user }: { user: User }) => {
    const links = [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: <LayoutDashboard />
        },
        {
            name: "Courses",
            url: "/dashboard/courses",
            icon: <Book />
        },
        {
            name: "Quizes",
            url: "/dashboard/quizes",
            icon: <FileQuestion />
        },
        {
            name: "Notes",
            url: "/dashboard/notes",
            icon: <NotebookPen />
        }
    ];

    const pathName = usePathname();
    const isActive = (url: string) => pathName === url;
    return (
        <Sidebar side={"left"}>
            <SidebarHeader className="flex gap-2" style={{ padding: '0.6rem' }}>
                <Flex justify={'between'}>
                    <Text>Sidebar</Text> <Image src={'/logo.png'} alt="Profile picture" width={28} height={22} style={{ borderRadius: '50%' }} />
                </Flex>
            </SidebarHeader>
            <SidebarSeparator/>
            <SidebarContent>
                <SidebarMenu>
                    {links.map((link, index) => (
                        <SidebarMenuItem key={index}>
                            <Link href={link.url} className={`w-full ${isActive(link.url) ? 'active' : 'dark:text-gray-400'}`}>
                                <SidebarMenuButton
                                    className="w-full transition-colors duration-200"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Flex justify={'between'} align={'center'}>
                            <Flex align={'center'}>
                                <User2 />
                                <Text>{user.user_metadata.name}</Text>
                            </Flex>
                            <Badge>Pro</Badge>
                        </Flex>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
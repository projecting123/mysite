import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Progressbar } from "@/components/custom/Topprogressbar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter, SidebarTrigger, SidebarGroupLabel, SidebarGroupContent, SidebarMenuItem, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarSeparator } from "@/components/ui/sidebar";
import AuthUserProvider from "@/utils/providers/auth";
import { createClient } from "@/utils/supabase/server";
import { Flex } from "@radix-ui/themes";
import { User } from "@supabase/supabase-js";
import { Book, FileQuestion, NotebookPen, Pencil } from 'lucide-react';
import Link from "next/link";
export default async function AppShell({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return (
        <>
            <Flex direction={"column"} p={"4"}>
                <Header user={null} />
                <main>
                    {children}
                </main>
            </Flex>
        </>
    )
    else return (
        <>
            <SidebarProvider>
                <AppSidebar user={user} />
                <Flex direction={"column"} className="p-4" style={{ flex: 1 }}>
                    <Flex align={"center"} gap={'2'} mb={"2"}>
                        <SidebarTrigger style={{ cursor: 'pointer' }} />
                        <Separator orientation="vertical" />
                        <Header user={user} />
                    </Flex>
                    <Progressbar>
                        <AuthUserProvider user={user}>
                            <main>
                                {children}
                            </main>
                        </AuthUserProvider>
                    </Progressbar>
                    <Footer />
                </Flex>

            </SidebarProvider>
        </>
    )
}


const AppSidebar = ({ user }: { user: User }) => {
    const links = [
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
    ]
    return (
        <>
            <Sidebar>
                <SidebarHeader>Sidebar</SidebarHeader>
                <SidebarSeparator />
                <SidebarContent>
                    <SidebarMenu>
                        {links.map((link, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild>
                                    <Link href={link.url}>
                                        {link.icon}
                                        {link.name}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                    <SidebarSeparator />
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>{user.user_metadata.name}</SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </SidebarContent>
            </Sidebar>
        </>
    )
}
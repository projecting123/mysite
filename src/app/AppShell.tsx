import AppSidebar from "@/components/custom/AppSidebar";
import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { Progressbar } from "@/components/custom/Topprogressbar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AuthUserProvider from "@/utils/providers/auth";
import { createClient } from "@/utils/supabase/server";
import { Flex } from "@radix-ui/themes";
export default async function AppShell({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return (
        <>
            <Flex direction={"column"} p={"4"}>
                <Header user={null} />
                {children}
                <Footer/>
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



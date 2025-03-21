import PageTransition from "@/components/custom/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <PageTransition>{children}</PageTransition>
    )
}
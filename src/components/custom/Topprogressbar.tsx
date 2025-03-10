"use client";
import { AppProgressProvider } from "@bprogress/next";

export const Progressbar = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppProgressProvider options={{ showSpinner: false }} color="#3b82f6">
            {children}
        </AppProgressProvider>
    )
}
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Toaster } from "sonner";
import { Theme } from "@radix-ui/themes";
import AppShell from "./AppShell";
export const metadata: Metadata = {
  title: "My Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <ThemeProvider attribute={'class'} defaultTheme="system">
          <Theme>
              <AppShell>
                {children}
              </AppShell>
          </Theme>
        </ThemeProvider>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  );
}

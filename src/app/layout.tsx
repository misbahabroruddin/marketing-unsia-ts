import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { metadataConfig } from "@/config/metadata";
import { SidebarProvider } from "@/lib/hooks/use-sidebar";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...metadataConfig,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className} suppressHydrationWarning={true}>
        <SidebarProvider>{children}</SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}

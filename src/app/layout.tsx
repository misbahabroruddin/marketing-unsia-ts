import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { getServerSession } from "next-auth";
import "./globals.css";

import { metadataConfig } from "@/config/metadata";
import { SidebarProvider } from "@/lib/hooks/use-sidebar";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/lib/providers/query-provider";
import { AuthProvider } from "@/lib/providers/auth-provider";
import { authOptions } from "@/config/auth";
import { QueryParamsTautanProvider } from "@/lib/hooks/use-query-params-tautan";
import { QueryParamsDataLeadsProvider } from "@/lib/hooks/use-query-params-data-leads";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...metadataConfig,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={montserrat.className} suppressHydrationWarning={true}>
        <AuthProvider session={session!}>
          <QueryProvider>
            <QueryParamsTautanProvider>
              <QueryParamsDataLeadsProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </QueryParamsDataLeadsProvider>
            </QueryParamsTautanProvider>
            <Toaster />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

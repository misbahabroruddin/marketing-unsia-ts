"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { BreadCrumb } from "@/components/ui/breadcrumb";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSidebarExpand } = useSidebar();

  return (
    <>
      <Sidebar />
      <Navbar />
      <main
        className={cn(
          "px-6 py-4 transition-all duration-300",
          isSidebarExpand ? "ml-64" : "ml-[72px]",
        )}
      >
        <BreadCrumb />
        {children}
      </main>
    </>
  );
}

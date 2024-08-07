"use client";

import { signOut, useSession } from "next-auth/react";

import { ExlamationCircleIcon } from "@/components/svgs/exlamation-circle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "./components/card";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated")
    signOut({ redirect: false }).then(() => {
      window.location.href = "https://sso.dev-unsia.id/home";
    });

  return (
    <div className="mt-2 flex gap-5 rounded border border-[#F1F1F1] px-[19px] py-4">
      <div className="flex w-full gap-[20px]">
        <Card />
        <Card type="sekolah" />
        <Card type="kerjasama" />
      </div>
    </div>
  );
}

"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { UnsiaLogoWithText } from "@/components/svgs/unsia-logo-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { SignOutIcon } from "./svgs/sign-out";

export const Navbar = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const { data } = useSession();

  return (
    <header className="fixed z-[11] flex h-16 w-full items-center border-b border-[#F1F1F1] bg-white p-3">
      <div className="flex w-full justify-between">
        <div className="flex w-60 justify-center">
          <UnsiaLogoWithText />
        </div>
        <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
          <PopoverTrigger asChild className="cursor-pointer">
            <div className="mr-[55px] flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={data?.user?.avatar!} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm font-[500]">{data?.user?.name}</p>
              {isOpenPopover ? (
                <ChevronDown size={20} className="rotate-180 transition-all" />
              ) : (
                <ChevronDown size={20} className="transition-all" />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-2 p-2">
            <div
              onClick={() =>
                signOut({ redirect: false }).then(() => {
                  window.location.href = "https://sso.dev-unsia.id/home";
                })
              }
              className="flex items-center gap-2 rounded px-2 py-1 hover:bg-blue-05/10"
              role="button"
            >
              <SignOutIcon />
              <p className="text-sm font-[500]">Menu</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

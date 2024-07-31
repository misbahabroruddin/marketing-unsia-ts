"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import Image from "next/image";

import { UnsiaLogoWithText } from "./svgs/unsia-logo-text";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "./svgs/chevron-left";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { UnsiaLogoSquare } from "./svgs/unsia-logo-square";
import { sidebarMenu } from "@/lib/constant/sidebar-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Sidebar = () => {
  const [isHover, setIsHover] = useState(false);
  const { isSidebarExpand, toggleSidebar } = useSidebar();

  const pathname = usePathname();
  const page = useSelectedLayoutSegments();

  return (
    <aside
      className={cn(
        "fixed left-0 z-10 flex h-dvh w-64 flex-col items-center bg-blue-05 transition-all duration-300",
        isSidebarExpand ? "w-64" : "w-[72px]",
      )}
    >
      <div className="relative mt-20 flex w-full flex-col items-center justify-center px-3">
        <button
          className={cn(
            "absolute -right-5 bottom-10 grid h-10 w-10 place-items-center rounded-full border-[2px] border-blue-05 bg-white",
            isHover && "border-white bg-blue-05",
          )}
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={toggleSidebar}
        >
          <ChevronLeftIcon
            color={isHover ? "white" : "#10487A"}
            className={cn(
              "transition-all",
              isSidebarExpand ? "rotate-0" : "rotate-180",
            )}
          />
        </button>
        <div className="flex w-full flex-col gap-2">
          <ul
            className={cn(
              "flex flex-col gap-2 transition-all duration-500",
              !isSidebarExpand && "items-center",
            )}
          >
            {sidebarMenu.map((menu) => (
              <TooltipProvider key={menu.link}>
                <Tooltip>
                  <TooltipTrigger>
                    <li className="transition-transform">
                      <Link
                        href={menu.link}
                        className={`flex items-center gap-2 rounded-lg p-2 text-white hover:bg-sky-03 ${
                          page.includes(menu.link?.slice(1)) ||
                          pathname === menu.link
                            ? "bg-sky-03"
                            : null
                        }`}
                      >
                        <Image
                          src={menu.icon}
                          width={24}
                          height={24}
                          alt={menu.label}
                          style={{ width: "auto", height: "auto" }}
                        />
                        {isSidebarExpand ? (
                          <p className="text-sm font-[500]">{menu.label}</p>
                        ) : (
                          <TooltipContent
                            side="right"
                            sideOffset={6}
                            className="font-semibold"
                          >
                            {menu.label}
                          </TooltipContent>
                        )}
                      </Link>
                    </li>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

"use client";

import { ExlamationCircleIcon } from "@/components/svgs/exlamation-circle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Card = ({ type }: { type?: "sekolah" | "kerjasama" }) => {
  const [gradientColorClass, setGradientColorClass] = useState(
    "bg-gradient-to-r from-[#46A8FF] to-[#10487A]",
  );

  useEffect(() => {
    if (type === "sekolah") {
      setGradientColorClass("bg-gradient-to-r from-[#6BFF83] to-[#0DCF09]");
    } else if (type === "kerjasama") {
      setGradientColorClass("bg-gradient-to-r from-[#D1B109] to-[#E27A01]");
    }
  }, [type]);

  return (
    <div
      className={cn(
        "relative grid w-1/3 place-items-center rounded-2xl py-4 text-white",
        gradientColorClass,
      )}
    >
      <p className="text-[20px] font-[500]">Kerjasama</p>
      <p className="text-[64.8px] font-semibold">20</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="absolute right-3 top-3">
            <ExlamationCircleIcon />
          </TooltipTrigger>
          <TooltipContent>
            <p>Data Kerjasama</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

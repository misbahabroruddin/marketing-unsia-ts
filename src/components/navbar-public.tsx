"use client";

import Link from "next/link";

import { UnsiaLogoWithText } from "@/components/svgs/unsia-logo-text";
import { Button } from "@/components/ui/button";
import { LanguageIcon } from "@/components/svgs/language";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";

export const NavbarPublic: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 z-[999] flex h-[70px] w-screen items-center justify-center bg-blue-05 lg:h-[94px]">
        <div className="flex w-full max-w-[1440px] items-center justify-center py-5 text-white lg:w-screen lg:justify-between lg:px-[70px]">
          <Link
            href="https://unsia.ac.id"
            target="_blank"
            className="rounded-lg bg-white p-1"
          >
            <UnsiaLogoWithText />
          </Link>
          <ul className="hidden w-[366px] items-center justify-between lg:flex">
            <li>
              <Button variant="ghost" size="sm">
                Beranda
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm">
                PMB
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm">
                Kontak
              </Button>
            </li>
          </ul>
          <div className="items-center">
            <div className="hidden gap-[5px] lg:flex">
              <p className="text-lg">ID</p>
              <LanguageIcon />
            </div>
          </div>
        </div>
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {isOpen ? (
          <SheetClose className="z-[9999] cursor-pointer">Close</SheetClose>
        ) : (
          <SheetTrigger className="z-[9999] content-end">Open</SheetTrigger>
        )}

        <SheetContent
          side="top"
          className="h-[198px] border-blue-05 bg-blue-05 pt-[94px] ring-offset-blue-05"
        >
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

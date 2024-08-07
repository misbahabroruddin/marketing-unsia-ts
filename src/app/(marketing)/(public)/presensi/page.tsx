"use client";

import { NavbarPublic } from "@/components/navbar-public";
import { HeroSection } from "./components/hero";
import { FormAbsensi } from "./components/form-absensi";
import { CardProgram } from "./components/card-program";
import { Footer } from "./components/footer";

export default function PresensiPage() {
  return (
    <>
      <header className="bg-blue-05 lg:w-screen">
        <NavbarPublic />
        <HeroSection />
      </header>
      <main className="w-screen bg-white pb-11 lg:bg-[#EBF5FE]">
        <FormAbsensi />
        <div className="mx-auto grid w-screen max-w-[1440px] place-items-center pt-[42px]">
          <div className="flex flex-col gap-7">
            <h3 className="text-center text-2xl font-[500] leading-[44px] tracking-[-0.76px]">
              Program Pendaftaran
            </h3>
            <div className="flex w-full max-w-[1300px] flex-wrap items-center justify-center gap-[27px] rounded-lg bg-white lg:h-[714px] lg:flex-nowrap lg:shadow-[0_2px_4px_0_rgba(0,0,0,0.10)] xl:min-w-[1300px]">
              <CardProgram />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

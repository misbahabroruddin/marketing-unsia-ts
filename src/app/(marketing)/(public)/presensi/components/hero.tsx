"use client";

import Image from "next/image";
import Link from "next/link";

import { BookIcon } from "@/components/svgs/book";
import { UserGraduateIcon } from "@/components/svgs/user-graduate";
import { Button } from "@/components/ui/button";

export const HeroSection: React.FC = () => {
  return (
    <div className="mx-auto mt-[40px] flex h-[240px] w-screen max-w-[1440px] items-center justify-center gap-4 bg-blue-05 pb-[45px] pt-5 lg:mt-[94px] lg:h-[600px] lg:flex-wrap lg:gap-[179px] lg:pb-[51px] lg:pt-[49px] xl:justify-start">
      <div className="prder-2 flex flex-col items-center justify-center lg:block lg:pl-[85px]">
        <div className="mb-[49px] flex w-[288px] flex-col gap-4 text-white lg:mb-8 lg:w-[476px]">
          <div className="flex flex-col">
            <h2 className="text-center text-2xl font-[500] leading-[140%] lg:text-start lg:text-[32px]">
              Universitas Siber Asia
            </h2>
            <h3 className="text-center text-base lg:text-start lg:text-xl">
              Universitas Full Online
            </h3>
          </div>
          <p className="hidden text-[14px] font-normal leading-[140%] lg:block">
            Universitas Siber Asia merupakan salah satu perguruan tinggi yang
            berkonsentrasi pada pembelajaran Berbasis{" "}
            <span className="text-[16px] font-semibold leading-[140%]">
              FULL ONLINE
            </span>{" "}
            yang menghasilkan lulusan dengan daya saing pasar internasional.
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="https://pmb.unsia.ac.id" target="_blank">
            <Button className="w-40 rounded bg-[#6FD943] px-8 py-3 hover:bg-green-500">
              <UserGraduateIcon className="mr-2" />
              Daftar
            </Button>
          </Link>
          <Link href="https://pmb.unsia.ac.id" target="_blank">
            <Button className="w-40 rounded bg-[#FFA21D] px-8 py-3 hover:bg-orange-500">
              <BookIcon className="mr-2" />
              Panduan
            </Button>
          </Link>
        </div>
      </div>
      <Image
        src="/hero.png"
        alt="PMB Unsia"
        width={500}
        height={500}
        className="order-1 hidden lg:block lg:h-[300px] lg:w-[300px] xl:block xl:h-[500px] xl:w-[500px]"
      />
    </div>
  );
};

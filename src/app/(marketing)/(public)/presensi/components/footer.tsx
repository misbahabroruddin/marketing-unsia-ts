import { ChevronLeftIcon } from "@/components/svgs/chevron-left";
import { PhoneAltIcon } from "@/components/svgs/phone-alt";
import { MailBulkIcon } from "@/components/svgs/mail-bulk";
import { FacebookRoundIcon } from "@/components/svgs/facebook";
import { InstagramIcon } from "@/components/svgs/instagram";
import { MapMarkerIcon } from "@/components/svgs/map-marker";
import Link from "next/link";
import { UnsiaLogoWithText } from "@/components/svgs/unsia-logo-text";

export const Footer: React.FC = () => {
  return (
    <footer className="w-screen bg-blue-05">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-center gap-[27px] p-[44px] lg:w-screen lg:flex-nowrap lg:justify-around lg:gap-[96px] lg:px-[102px] lg:pb-[115px] lg:pt-[95px]">
        <Link
          href="https://unsia.ac.id"
          target="_blank"
          className="w-[171px] rounded-lg bg-white p-1"
        >
          <UnsiaLogoWithText width="175" height="40" />
        </Link>
        <div className="flex flex-col gap-5 text-white">
          <p className="text-center text-xl font-[500] lg:text-start">
            Program Studi :
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-2">
              <ChevronLeftIcon className="rotate-180" color="white" />
              <p>Manajemen PJJ S1</p>
            </li>
            <li className="flex gap-2">
              <ChevronLeftIcon className="rotate-180" color="white" />
              <p>Akuntansi PJJ S1</p>
            </li>
            <li className="flex gap-2">
              <ChevronLeftIcon className="rotate-180" color="white" />
              <p>Sistem Informasi PJJ S1</p>
            </li>
            <li className="flex gap-2">
              <ChevronLeftIcon className="rotate-180" color="white" />
              <p>Informatika PJJ S1</p>
            </li>
            <li className="flex gap-2">
              <ChevronLeftIcon className="rotate-180" color="white" />
              <p>Komunikasi PJJ S1</p>
            </li>
          </ul>
        </div>
        <div className="flex w-full flex-col gap-4 text-white lg:w-[423px] lg:gap-5">
          <p className="text-center text-xl font-[500] lg:text-start">
            Kontak Kami :
          </p>
          <ul className="flex flex-row justify-center gap-4 lg:flex-col lg:justify-start">
            <li className="flex gap-2">
              <PhoneAltIcon />
              <p className="hidden lg:block">
                0812 1898 7353 / 0812 9554 4717 / (021) 27806189
              </p>
            </li>
            <li className="flex gap-2">
              <MailBulkIcon />
              <p className="hidden lg:block">admission@acu.ac.id</p>
            </li>
            <li className="flex gap-2">
              <FacebookRoundIcon />
              <p className="hidden lg:block">Universitas Siber Asia</p>
            </li>
            <li className="flex gap-2">
              <InstagramIcon />
              <p className="hidden lg:block">@univsiberasia</p>
            </li>
            <li className="flex gap-2">
              <MapMarkerIcon />
              <p className="hidden w-[391px] lg:block">
                Jl. Harsono RM No.1, RT.9/RW.4, Ragunan, Kec. Ps. Minggu, Kota
                Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12550
              </p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

import Image from "next/image";
import Link from "next/link";

import { StreamIcon } from "@/components/svgs/stream";
import { CalenderIcon } from "@/components/svgs/calender";
import { ClockIcon } from "@/components/svgs/clock";
import { UserGraduateIcon } from "@/components/svgs/user-graduate";
import { WpFormIcon } from "@/components/svgs/wp-forms";
import { BookIcon } from "@/components/svgs/book";

export const CardProgram: React.FC = () => {
  const data = [
    {
      program: "Reguler",
      image: "/reguler-1.png",
      gelombang: "Gelombang 1",
      periode: "Ganjil 2023/2024",
      date: "10 - 12 November 2022",
      metode: "Online",
      price: "Berbayar",
    },
    {
      program: "Beasiswa",
      image: "/beasiswa.png",
      gelombang: "Gelombang 1",
      periode: "Ganjil 2023/2024",
      date: "10 - 12 November 2022",
      metode: "Online",
      price: "Berbayar",
    },
    {
      program: "Reguler",
      image: "/reguler-2.png",
      gelombang: "Gelombang 1",
      periode: "Ganjil 2023/2024",
      date: "10 - 12 November 2022",
      metode: "Online",
      price: "Berbayar",
    },
  ];
  return data.map((item, index) => (
    <div
      className="flex w-[290px] flex-col overflow-hidden rounded-lg bg-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.10)] lg:h-[604px] lg:w-[312px]"
      key={index}
    >
      <p className="w-full bg-blue-05 px-[10px] py-2 text-center text-lg text-white lg:mt-8">
        {item.program}
      </p>
      <div className="flex flex-col gap-[29.56px] p-5">
        <div className="overflow-hidden rounded-lg border-b">
          <Image src={item.image} alt="Thumbnail" width={272} height={197} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="hidden w-[213px] flex-col gap-[17px] lg:flex">
            <div className="flex gap-1">
              <StreamIcon />
              <p className="text-base font-normal leading-[22.4px]">
                {item.gelombang}
              </p>
            </div>
            <div className="flex gap-1">
              <CalenderIcon color="#333333" />
              <p className="text-base font-normal leading-[22.4px]">
                {item.periode}
              </p>
            </div>
            <div className="flex gap-1">
              <ClockIcon />
              <p className="text-base font-normal leading-[22.4px]">
                {item.date}
              </p>
            </div>
            <div className="flex gap-1">
              <UserGraduateIcon color="#333333" />
              <p className="text-base font-normal leading-[22.4px]">Online</p>
            </div>
            <div className="flex gap-1">
              <WpFormIcon />
              <p className="text-base font-normal leading-[22.4px]">
                {item.price}
              </p>
            </div>
          </div>
          <Link
            href="https://pmb.unsia.ac.id"
            className="flex items-center justify-center"
          >
            <button className="flex w-full items-center justify-center gap-2 rounded bg-[#FFA21D] px-4 py-2 text-white hover:bg-orange-500">
              <BookIcon />
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  ));
};

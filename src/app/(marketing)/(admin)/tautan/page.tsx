"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ShortDownIcon } from "@/components/svgs/short-down";
import { Input } from "@/components/ui/input";
import { SelectWithIcon } from "@/components/ui/select";
import { ModalAddTautan } from "./components/modal-add-tautan";
import { DataTable } from "@/components/ui/data-table";
import { useColumnTable } from "./components/column-defintion";
import { useState } from "react";

export default function TautanPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { columns } = useColumnTable();

  const options: SelectOption[] = [
    {
      label: "Sekolah",
      value: "sekolah",
    },
    {
      label: "Kerjasama",
      value: "kerjasama",
    },
  ];

  const data = [
    {
      id: 1,
      nama: "nama",
      tanggal_dibuat: "22-07-2024",
      tanggal_selesai: "22-07-2024",
      program: "Sekolah",
      status: "aktif",
    },
    {
      id: 232,
      nama: "nama 2",
      tanggal_dibuat: "23-07-2024",
      tanggal_selesai: "26-07-2024",
      program: "Kerjasama",
      status: "nonaktif",
    },
  ];

  return (
    <div className="mt-2 rounded-lg border border-[#F1F1F1] px-6 py-4">
      <div className="flex flex-col gap-2">
        <BasePageTitle title="Daftar Tautan Program" />
        <div className="flex justify-between">
          <div className="flex gap-1">
            <SelectWithIcon
              options={options}
              selectPlaceholder="Short By"
              icon={<ShortDownIcon />}
            />
            <Input placeholder="Search" className="w-64" />
          </div>
          <ModalAddTautan />
        </div>
        <DataTable
          columns={columns}
          data={data}
          total={data?.length}
          pageCount={1}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
}

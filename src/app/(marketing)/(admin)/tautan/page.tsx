"use client";

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

import { BasePageTitle } from "@/components/base-page-title";
import { ShortDownIcon } from "@/components/svgs/short-down";
import { Input } from "@/components/ui/input";
import { SelectWithIcon } from "@/components/ui/select";
import { DataTable } from "@/components/ui/data-table";
import { useGetAllDataTautan } from "@/handlers/tautan/get-all-data";
import { useQueryParamsTautan } from "@/lib/hooks/use-query-params-tautan";
import { ModalAddTautan } from "./components/modal-add-tautan";
import { useColumnTable } from "./components/column-defintion";

export default function TautanPage() {
  const { queryParams, setSortbyProgramId, setNamaKegiatan, setPage } =
    useQueryParamsTautan();

  const { columns } = useColumnTable();

  const handleSelectChange = (e: "asc" | "desc" | string | null) => {
    setSortbyProgramId(e);
  };

  const handleSearch = useDebouncedCallback((value) => {
    setNamaKegiatan(value);
    setPage(1);
  }, 1000);

  const options: SelectOption[] = [
    {
      label: "Sekolah",
      value: "asc",
    },
    {
      label: "Kerjasama",
      value: "desc",
    },
  ];

  const { data: dataTautan, isLoading } = useGetAllDataTautan(queryParams);

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
              onValueChange={handleSelectChange}
            />
            <Input
              placeholder="Search"
              className="w-64"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <ModalAddTautan />
        </div>
        <DataTable
          columns={columns}
          data={dataTautan?.data}
          total={dataTautan?.data?.total}
          pageCount={dataTautan?.data?.last_page}
          pagination={queryParams}
          setPagination={setPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

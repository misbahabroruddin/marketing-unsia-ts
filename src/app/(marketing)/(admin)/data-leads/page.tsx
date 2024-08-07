"use client";

import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import FileSaver from "file-saver";

import { BasePageTitle } from "@/components/base-page-title";
import { ExportIcon } from "@/components/svgs/export";
import { ImportIcon } from "@/components/svgs/import";
import { PaperPlanIcon } from "@/components/svgs/paper-plane";
import { ShortDownIcon } from "@/components/svgs/short-down";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { SelectWithIcon } from "@/components/ui/select";
import { useColumnTable } from "./components/column-defintions";
import { useQueryParamsDataLeads } from "@/lib/hooks/use-query-params-data-leads";
import { useGetAllDataLeads } from "@/handlers/data-leads/get-all-data";
import { useExportDataLeads } from "@/handlers/data-leads/expot-data";
import { Spinner } from "@/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function DashboardPage() {
  const { queryParams, setNama, setPage } = useQueryParamsDataLeads();

  const { columns } = useColumnTable();

  const queryClient = useQueryClient();

  const handleSearch = useDebouncedCallback((value) => {
    setNama(value);
  }, 1000);

  const { data: dataLeads, isLoading } = useGetAllDataLeads(queryParams);

  const {
    data: dataExport,
    isLoading: isLoadingExportData,
    isSuccess: isSuccessExportData,
    refetch: refetchExport,
  } = useExportDataLeads();

  const handleExport = async () => {
    await refetchExport();
  };

  useEffect(() => {
    if (isSuccessExportData) {
      FileSaver.saveAs(dataExport, "data-leads.xlsx");
      queryClient.removeQueries({
        queryKey: ["export-data-leads"],
      });
    }
  }, [dataExport]);

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

  return (
    <div className="mt-2 rounded-lg border border-[#F1F1F1] px-6 py-4">
      <div className="flex flex-col gap-2">
        <BasePageTitle title="Daftar Data Leads" />
        <div className="flex justify-between">
          <div className="flex gap-1">
            {/* <SelectWithIcon
              options={options}
              selectPlaceholder="Short By"
              icon={<ShortDownIcon />}
            /> */}
            <Input
              placeholder="Search"
              className="w-64"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {/* <Button className="h-10 rounded bg-green-05 py-[9.5]">
              <PaperPlanIcon color="white" />
              Broadcast
            </Button> */}
            {/* <Button className="h-10 rounded bg-blue-05 py-[9.5]">
              <ImportIcon />
              Import
            </Button> */}
            <Button
              className="h-10 rounded bg-sky-05 py-[9.5]"
              onClick={handleExport}
            >
              {isLoadingExportData ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <ExportIcon />
              )}
              Export
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={dataLeads?.data}
          total={dataLeads?.data?.total}
          pageCount={dataLeads?.data?.last_page}
          pagination={queryParams}
          setPagination={setPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

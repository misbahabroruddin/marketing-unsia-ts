"use client";

import { EditIcon } from "@/components/svgs/edit";
import { EyeIcon } from "@/components/svgs/eye";
import { LinkIcon } from "@/components/svgs/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { DownloadIcon } from "@/components/svgs/download";
import { PaperPlanIcon } from "@/components/svgs/paper-plane";
import { ModalDetailDataLeads } from "./modal-detail";
import { useQueryParamsDataLeads } from "@/lib/hooks/use-query-params-data-leads";

export const useColumnTable = () => {
  const { toast } = useToast();

  const { setSortbyNama, setSortbyEmail, setSortbyNomor } =
    useQueryParamsDataLeads();

  const columns: ColumnDef<DataLeads>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "nama",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <button
              className="flex gap-1"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
                setSortbyNama(column.getIsSorted() as string);
              }}
            >
              Nama
              {column.getIsSorted() === "asc" && (
                <ArrowUp className="ml-2 h-4 w-4" />
              )}
              {column.getIsSorted() === "desc" && (
                <ArrowDown className="ml-2 h-4 w-4" />
              )}
              {column.getIsSorted() === false && (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("nama")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <button
              className="flex gap-1"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
                setSortbyEmail(column.getIsSorted() as string);
              }}
            >
              Email
              {column.getIsSorted() === "asc" && (
                <ArrowUp className="ml-2 h-4 w-4" />
              )}
              {column.getIsSorted() === "desc" && (
                <ArrowDown className="ml-2 h-4 w-4" />
              )}
              {column.getIsSorted() === false && (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "nomor_hp",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <button
              className="flex gap-1"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
                setSortbyNomor(column.getIsSorted() as string);
              }}
            >
              Nomor Hp
              {column.getIsSorted() === "asc" && (
                <ArrowUp className="ml-2 h-4 w-4" />
              )}
              {column.getIsSorted() === "desc" && (
                <ArrowDown className="ml-2 h-4 w-4" />
              )}
              {column.getIsSorted() === false && (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("nomor_hp")}</div>
      ),
    },
    {
      accessorKey: "program",
      header: () => {
        return <p className="text-center">Program</p>;
      },
      cell: ({ row }) => (
        <div className="text-center">{row.original.tautan.program.nama}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <ModalDetailDataLeads dataLeadId={row.original.id} isDetail />
          {/* <button onClick={() => alert(row.original.id)} title="Ubah">
            <EditIcon />
          </button> */}
          {/* <button onClick={() => alert(row.original.id)} title="Unduh">
            <PaperPlanIcon />
          </button> */}
        </div>
      ),
    },
  ];

  return { columns };
};

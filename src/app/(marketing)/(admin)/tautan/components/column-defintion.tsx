"use client";

import { EditIcon } from "@/components/svgs/edit";
import { EyeIcon } from "@/components/svgs/eye";
import { LinkIcon } from "@/components/svgs/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { ModalDetailTautan } from "./modal-detail";
import { DownloadIcon } from "@/components/svgs/download";

type Link = {
  id: string;
  nama: string;
  tanggal_dibuat: Date;
  tanggal_selesai: Date;
  program: "sekolah" | "kerjasama";
  status: "aktif" | "nonaktif";
};

export const useColumnTable = () => {
  const { toast } = useToast();

  const columns: ColumnDef<Link>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-center">No</div>,
      cell: ({ row, table }) => {
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
              }}
            >
              Nama Program
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
      accessorKey: "tanggal_dibuat",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <button
              className="flex gap-1"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Tanggal Dibuat
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
        <div className="text-center">{row.getValue("tanggal_dibuat")}</div>
      ),
    },
    {
      accessorKey: "tanggal_selesai",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <button
              className="flex gap-1"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Tanggal Selesai
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
        <div className="text-center">{row.getValue("tanggal_selesai")}</div>
      ),
    },
    {
      accessorKey: "program",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <button
              className="flex gap-1"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Program
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
        <div className="text-center">{row.getValue("program")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <div className="grid place-items-center">
            <Button
              className={cn(
                "px-4 py-1 text-center disabled:opacity-100",
                status === "aktif"
                  ? "bg-[#0BD72C] disabled:bg-[#0BD72C]"
                  : "bg-[#D14646] disabled:bg-[#D14646]",
              )}
              size={"sm"}
              disabled
            >
              {row.getValue("status")}
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <button onClick={() => alert(row.original.id)} title="Ubah">
            <EditIcon />
          </button>
          <ModalDetailTautan />
          <button
            onClick={() => {
              toast({
                description: "Berhasil disalin",
              });
              navigator.clipboard.writeText(row.original.id);
            }}
            title="Salin"
          >
            <LinkIcon />
          </button>
          <button onClick={() => alert(row.original.id)} title="Unduh">
            <DownloadIcon />
          </button>
        </div>
      ),
    },
  ];

  return { columns };
};

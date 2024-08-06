"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

export interface QueryParamsTautanContextType {
  queryParams: QueryParamsTautan;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setNamaKegiatan: (nama_kegiatan: string) => void;
  setSortbyProgramId: (
    sortby_program_id: "asc" | "desc" | string | null,
  ) => void;
  setSortbyNamaKegiatan: (
    sortby_nama_kegiatan: "asc" | "desc" | string | null,
  ) => void;
  setSortbyTanggalMulai: (
    sortby_tanggal_mulai: "asc" | "desc" | string | null,
  ) => void;
  setSortbyTanggalBerakhir: (
    sortby_tanggal_berakhir: "asc" | "desc" | string | null,
  ) => void;
}

// Create a Context for the query parameters
const QueryParamsTautanContext = createContext<
  QueryParamsTautanContextType | undefined
>(undefined);

// Provider component that uses the context
export const QueryParamsTautanProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [queryParams, setQueryParams] = useState<QueryParamsTautan>({
    page: 1,
    limit: 10,
    nama_kegiatan: "",
    sortby_program_id: null,
    sortby_nama_kegiatan: null,
    sortby_tanggal_mulai: null,
    sortby_tanggal_berakhir: null,
  });

  const setPage = (page: number) =>
    setQueryParams((prev) => ({ ...prev, page }));
  const setLimit = (limit: number) =>
    setQueryParams((prev) => ({ ...prev, limit }));
  const setNamaKegiatan = (nama_kegiatan: string) =>
    setQueryParams((prev) => ({ ...prev, nama_kegiatan }));
  const setSortbyProgramId = (
    sortby_program_id: "asc" | "desc" | string | null,
  ) => setQueryParams((prev) => ({ ...prev, sortby_program_id }));
  const setSortbyNamaKegiatan = (
    sortby_nama_kegiatan: "asc" | "desc" | string | null,
  ) => setQueryParams((prev) => ({ ...prev, sortby_nama_kegiatan }));
  const setSortbyTanggalMulai = (
    sortby_tanggal_mulai: "asc" | "desc" | string | null,
  ) => setQueryParams((prev) => ({ ...prev, sortby_tanggal_mulai }));
  const setSortbyTanggalBerakhir = (
    sortby_tanggal_berakhir: "asc" | "desc" | string | null,
  ) => setQueryParams((prev) => ({ ...prev, sortby_tanggal_berakhir }));

  return (
    <QueryParamsTautanContext.Provider
      value={{
        queryParams,
        setPage,
        setLimit,
        setNamaKegiatan,
        setSortbyProgramId,
        setSortbyNamaKegiatan,
        setSortbyTanggalMulai,
        setSortbyTanggalBerakhir,
      }}
    >
      {children}
    </QueryParamsTautanContext.Provider>
  );
};

// Custom hook to use the QueryParams context
export const useQueryParamsTautan = (): QueryParamsTautanContextType => {
  const context = useContext(QueryParamsTautanContext);
  if (context === undefined) {
    throw new Error(
      "useQueryParamsTautan must be used within a QueryParamsTautanProvider",
    );
  }
  return context;
};

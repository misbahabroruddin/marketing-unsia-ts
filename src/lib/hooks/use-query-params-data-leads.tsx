"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

export interface QueryParamsDataLeadsContextType {
  queryParams: QueryParamsDataLeads;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setNama: (nama: string) => void;
  setSortbyEmail: (sortby_email: "asc" | "desc" | string | null) => void;
  setSortbyNama: (sortby_nama: "asc" | "desc" | string | null) => void;
  setSortbyNomor: (sortby_nomor: "asc" | "desc" | string | null) => void;
}

// Create a Context for the query parameters
const QueryParamsDataLeadsContext = createContext<
  QueryParamsDataLeadsContextType | undefined
>(undefined);

// Provider component that uses the context
export const QueryParamsDataLeadsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [queryParams, setQueryParams] = useState<QueryParamsDataLeads>({
    pageIndex: 0,
    pageSize: 10,
    nama: "",
    sortby_email: "",
    sortby_nama: "",
    sortby_nomor_hp: "",
  });

  const setPage = (pageIndex: number) => {
    setQueryParams({ ...queryParams, pageIndex });
  };

  const setLimit = (pageSize: number) =>
    setQueryParams((prev) => ({ ...prev, pageSize }));

  const setNama = (nama: string) =>
    setQueryParams((prev) => ({ ...prev, nama, pageIndex: 0 }));

  const setSortbyEmail = (sortby_email: "asc" | "desc" | string | null) =>
    setQueryParams((prev) => ({ ...prev, sortby_email }));

  const setSortbyNama = (sortby_nama: "asc" | "desc" | string | null) =>
    setQueryParams((prev) => ({ ...prev, sortby_nama }));

  const setSortbyNomor = (sortby_nama: "asc" | "desc" | string | null) =>
    setQueryParams((prev) => ({ ...prev, sortby_nama }));

  return (
    <QueryParamsDataLeadsContext.Provider
      value={{
        queryParams,
        setPage,
        setLimit,
        setNama,
        setSortbyEmail,
        setSortbyNama,
        setSortbyNomor,
      }}
    >
      {children}
    </QueryParamsDataLeadsContext.Provider>
  );
};

// Custom hook to use the QueryParams context
export const useQueryParamsDataLeads = (): QueryParamsDataLeadsContextType => {
  const context = useContext(QueryParamsDataLeadsContext);
  if (context === undefined) {
    throw new Error(
      "useQueryParamsDataLeads must be used within a QueryParamsDataLeadsProvider",
    );
  }
  return context;
};

"use client";

import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";
import { useAxios } from "@/lib/hooks/use-axios";

export const useGetAllDataTautan = (queryParams?: QueryParamsTautan) => {
  const axios = useAxios();
  const { toast } = useToast();

  let params: any = {
    page: queryParams?.pageIndex,
    limit: queryParams?.pageSize,
  };

  if (queryParams?.nama_kegiatan) {
    params = {
      ...params,
      nama_kegiatan: queryParams.nama_kegiatan,
    };
  }

  if (queryParams?.program_id) {
    params = {
      ...params,
      program_id: queryParams.program_id,
    };
  }

  if (queryParams?.sortby_nama_kegiatan) {
    params = {
      ...params,
      sortby_nama_kegiatan: queryParams.sortby_nama_kegiatan,
    };
  }

  if (queryParams?.sortby_program_id) {
    params = {
      ...params,
      sortby_program_id: queryParams.sortby_program_id,
    };
  }

  if (queryParams?.sortby_tanggal_mulai) {
    params = {
      ...params,
      sortby_tanggal_mulai: queryParams.sortby_tanggal_mulai,
    };
  }

  if (queryParams?.sortby_tanggal_berakhir) {
    params = {
      ...params,
      sortby_tanggal_berakhir: queryParams.sortby_tanggal_berakhir,
    };
  }

  const getAllDataTautan = async () => {
    try {
      const { data } = await axios.get(`/tautans`, {
        params,
      });
      return data;
    } catch (error: any) {
      if (error.response.status === 401) {
        signOut({ redirect: false }).then(() => {
          window.location.href = "https://sso.dev-unsia.id/home";
        });
      } else if (error.response.status === 500) {
        toast({
          description: "Internal Server Error",
          variant: "destructive",
        });
      }
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-tautan",
      params.page,
      params.limit,
      params.nama_kegiatan,
      params.program_id,
      params.sortby_nama_kegiatan,
      params.sortby_program_id,
      params.sortby_tanggal_mulai,
      params.sortby_tanggal_berakhir,
    ],
    queryFn: getAllDataTautan,
  });

  return { ...query };
};

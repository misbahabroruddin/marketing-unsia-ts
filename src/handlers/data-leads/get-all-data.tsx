"use client";

import { useToast } from "@/components/ui/use-toast";
import { useAxios } from "@/lib/hooks/use-axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllDataLeads = (queryParams: QueryParamsDataLeads) => {
  const axios = useAxios();
  const { toast } = useToast();

  let params: any = {
    page: queryParams?.pageIndex + 1,
    limit: queryParams?.pageSize,
  };

  if (queryParams?.nama) {
    params = {
      ...params,
      nama: queryParams.nama,
      // page: 1,
    };
  }

  if (queryParams?.sortby_email) {
    params = {
      ...params,
      sortby_email: queryParams.sortby_email,
    };
  }

  if (queryParams?.sortby_nama) {
    params = {
      ...params,
      sortby_nama: queryParams.sortby_nama,
    };
  }

  if (queryParams?.sortby_nomor_hp) {
    params = {
      ...params,
      sortby_nomor_hp: queryParams.sortby_nomor_hp,
    };
  }

  const getAllDataLeads = async () => {
    try {
      const { data } = await axios.get(`/leads`, {
        params,
      });
      return data;
    } catch (error: any) {
      toast({
        description: "Internal Server Error",
        variant: "destructive",
      });
    }
  };

  const query = useQuery({
    queryKey: [
      "get-all-data-leads",
      params.page,
      params.limit,
      params.nama,
      params.sortby_nama,
      params.sortby_email,
      params.sortby_nomor_hp,
    ],
    queryFn: getAllDataLeads,
  });

  return { ...query };
};

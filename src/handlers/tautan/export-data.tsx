"use client";

import { useQuery } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { useAxios } from "@/lib/hooks/use-axios";

export const useExportTautan = () => {
  const axios = useAxios();
  const { toast } = useToast();

  const exportData = async () => {
    try {
      const { data } = await axios.get("/tautans/export", {
        responseType: "blob",
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
    queryKey: ["export-tautan"],
    queryFn: exportData,
    enabled: false,
  });

  return { ...query };
};

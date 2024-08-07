"use client";

import { useQuery } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { useAxios } from "@/lib/hooks/use-axios";

export const useGetDetailDataLeads = (dataLeadId: string) => {
  const axios = useAxios();
  const { toast } = useToast();

  const getDetailDataLeads = async () => {
    try {
      const { data } = await axios.get(`/leads/${dataLeadId}`);
      return data;
    } catch (error: any) {
      toast({
        description: "Internal Server Error",
        variant: "destructive",
      });
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-data-leads", dataLeadId],
    queryFn: getDetailDataLeads,
    enabled: false,
  });

  return { ...query };
};

"use client";

import { useQuery } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { useAxios } from "@/lib/hooks/use-axios";

export const useGetDetailTautan = (tautanId: string) => {
  const axios = useAxios();
  const { toast } = useToast();

  const getDetailTautan = async () => {
    try {
      const { data } = await axios.get(`/tautans/${tautanId}`);
      return data;
    } catch (error: any) {
      toast({
        description: "Internal Server Error",
        variant: "destructive",
      });
    }
  };

  const query = useQuery({
    queryKey: ["get-detail-tautan", tautanId],
    queryFn: getDetailTautan,
    enabled: false,
  });

  return { ...query };
};

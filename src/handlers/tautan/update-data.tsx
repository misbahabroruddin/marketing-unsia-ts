"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { useAxios } from "@/lib/hooks/use-axios";
import { convertDateFormatForm } from "@/lib/utils/convert-date";

export const useUpdateTautan = (tautanId: string | any) => {
  const axios = useAxios();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onEditTautan = async (form: FormTautan) => {
    const reqBody = {
      program_id: form.program_id,
      nama_kegiatan: form.nama_kegiatan,
      nama_instansi: form.nama_instansi,
      alamat: form.alamat,
      nama_pic: form.nama_pic,
      nama_pic_instansi: form.nama_pic_instansi,
      tanggal_mulai: convertDateFormatForm(form.tanggal_mulai),
      tanggal_berakhir: convertDateFormatForm(form.tanggal_berakhir),
    };
    try {
      const { data } = await axios.put(`/tautans/${tautanId}`, reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-tautan"],
      });
      queryClient.removeQueries({
        queryKey: ["get-detail-tautan"],
      });

      return data;
    } catch (error: any) {
      toast({
        description: "Internal Server Error",
        variant: "destructive",
      });
    }
  };

  const mutate = useMutation({
    mutationFn: onEditTautan,
  });

  return { ...mutate };
};

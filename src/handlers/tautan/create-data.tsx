"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";
import { useAxios } from "@/lib/hooks/use-axios";
import { convertDateTimeFormatForm } from "@/lib/utils/convert-date";

export const useCreateTautan = () => {
  const axios = useAxios();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onCreateTautan = async (form: FormTautan) => {
    const reqBody = {
      program_id: form.program_id,
      nama_kegiatan: form.nama_kegiatan,
      nama_instansi: form.nama_instansi,
      alamat: form.alamat,
      nama_pic: form.nama_pic,
      nama_pic_instansi: form.nama_pic_instansi,
      tanggal_mulai: convertDateTimeFormatForm(form.tanggal_mulai),
      tanggal_berakhir: convertDateTimeFormatForm(form.tanggal_berakhir),
    };
    try {
      const { data } = await axios.post("/tautans", reqBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      toast({
        title: "Berhasil",
        description: "Tautan berhasil dibuat",
      });

      queryClient.invalidateQueries({
        queryKey: ["get-all-tautan"],
      });
      queryClient.removeQueries({
        queryKey: ["get-detail-tautan"],
      });

      return data;
    } catch (error: any) {
      if (error.response.data.message.tanggal_mulai) {
        toast({
          description: error.response.data.message.tanggal_mulai[0],
          variant: "destructive",
        });
      } else if (error.response.data.message.tanggal_berakhir) {
        toast({
          description: error.response.data.message.tanggal_berakhir[0],
          variant: "destructive",
        });
      } else if (error.response.status === 401) {
        signOut({ redirect: false }).then(() => {
          window.location.href = "https://sso.dev-unsia.id/home";
        });
      } else {
        toast({
          description: "Internal Server Error",
          variant: "destructive",
        });
      }
    }
  };

  const mutate = useMutation({
    mutationFn: onCreateTautan,
  });

  return { ...mutate };
};

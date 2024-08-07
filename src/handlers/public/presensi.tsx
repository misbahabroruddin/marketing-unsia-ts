"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import { convertDateFormatForm } from "@/lib/utils/convert-date";
import { useToast } from "@/components/ui/use-toast";

export const usePresensi = () => {
  const { toast } = useToast();
  const code = useSearchParams()?.get("code");
  const queryClient = useQueryClient();

  const onSubmitPresensi = async (form: FormPresensi) => {
    const reqBody = {
      nama: form.nama,
      tempat_lahir_id: form.tempat_lahir_id,
      tanggal_lahir: convertDateFormatForm(form.tanggal_lahir),
      email: form.email,
      nomor_hp: form.nomor_hp,
      nama_instansi: form.nama_instansi,
      jurusan: form.jurusan,
    };

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/guest/presensi/${code}`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["get-all-data-leads"],
      });

      return data;
    } catch (error: any) {
      if (error.response.status === 500) {
        toast({
          description: "Internal Server Error",
          variant: "destructive",
        });
      }
      if (error.response.status === 400) {
        toast({
          description: error.response.data.message,
          variant: "destructive",
        });
      }
    }
  };

  const mutate = useMutation({
    mutationFn: onSubmitPresensi,
  });

  return { ...mutate };
};

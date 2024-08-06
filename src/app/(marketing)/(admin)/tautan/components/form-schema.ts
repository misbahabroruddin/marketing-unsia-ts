import { z } from "zod";

export const FormSchema = z.object({
  program_id: z.string({
    required_error: "Harus pilih program",
  }),
  nama_instansi: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus diisi",
    }),
  nama_kegiatan: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus diisi",
    }),
  alamat: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus diisi",
    }),
  nama_pic: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus diisi",
    }),
  nama_pic_instansi: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus diisi",
    }),
  tanggal_mulai: z.date({
    required_error: "Harus diisi",
  }),
  tanggal_berakhir: z.date({
    required_error: "Harus diisi",
  }),
  link: z.string().optional(),
});

import { z } from "zod";

export const FormSchema = z.object({
  program: z.string({
    required_error: "Harus pilih program",
  }),
  instansi: z
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
  nama_pic_pt: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus diisi",
    }),
  tanggal_mulai: z.date({
    required_error: "Harus diisi",
  }),
  tanggal_selesai: z.date({
    required_error: "Harus diisi",
  }),
  link: z.string(),
});

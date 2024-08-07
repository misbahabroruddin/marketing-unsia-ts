import { ZodSchema, z } from "zod";

export const FormSchema = z.object({
  nama: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus pilih program",
    }),
  // alamat: z
  //   .string({
  //     required_error: "Harus diisi",
  //   })
  //   .min(1, {
  //     message: "Harus diisi",
  //   }),
  tempat_lahir_id: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus diisi",
    }),
  tanggal_lahir: z.date({
    required_error: "Harus diisi",
  }),
  email: z
    .string({
      required_error: "Harus diisi",
    })
    .email("Email tidak valid"),
  nomor_hp: z
    .string({
      required_error: "Harus diisi",
    })
    .min(10, {
      message: "Nomor hp tidak valid",
    })
    .max(12, {
      message: "Nomor hp tidak valid",
    })
    .refine((value) => {
      const phoneRegex = new RegExp(/^(\|62|0)8[1-9][0-9]{6,9}$/);

      return phoneRegex.test(String(value));
    }, "Nomor hp tidak valid"),
  nama_instansi: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus diisi",
    }),
  jurusan: z
    .string({
      required_error: "Harus diisi",
    })
    .min(1, {
      message: "Harus diisi",
    }),
});

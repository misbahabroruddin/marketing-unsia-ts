interface Tautan {
  id: string;
  program_id: string;
  nama_kegiatan: string;
  nama_instansi: string;
  alamat: string;
  nama_pic: string;
  nama_pic_instansi: string;
  tanggal_mulai: Date;
  tanggal_berakhir: Date;
  link?: string | null;
  qrcode?: string | null;
  status?: 1 | 0;
  user_id?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  program?: {
    id: number;
    nama: string;
  };
  user?: {
    id: string;
    nama: string;
  };
}

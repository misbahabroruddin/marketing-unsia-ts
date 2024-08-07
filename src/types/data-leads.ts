interface DataLeads {
  id: string;
  tautan_id: string;
  nama: string;
  tempat_lahir_id: string;
  email: string;
  nomor_hp: string;
  nama_instansi: string;
  jurusan: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  tautan: {
    id: string;
    nama_kegiatan: string;
    program_id: string;
    program: {
      id: number;
      nama: string;
    };
  };
  tempat_lahir: {
    id: string;
    nama: string;
  };
}

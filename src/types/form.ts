interface FormTautan {
  program_id: string;
  nama_instansi: string;
  nama_kegiatan: string;
  alamat: string;
  nama_pic: string;
  nama_pic_instansi: string;
  tanggal_mulai: Date;
  tanggal_berakhir: Date;
  link?: string;
}

interface FormPresensi {
  nama: string;
  tempat_lahir_id: string;
  tanggal_lahir: Date | string;
  email: string;
  nomor_hp: string;
  nama_instansi: string;
  jurusan: string;
}

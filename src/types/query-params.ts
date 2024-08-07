interface QueryParams {
  pageSize: number | any;
  pageIndex: number;
}

interface QueryParamsTautan extends QueryParams {
  program_id?: string;
  nama_kegiatan?: string;
  sortby_program_id?: "asc" | "desc" | string | null;
  sortby_nama_kegiatan?: "asc" | "desc" | string | null;
  sortby_tanggal_mulai?: "asc" | "desc" | string | null;
  sortby_tanggal_berakhir?: "asc" | "desc" | string | null;
}

interface QueryParamsDataLeads extends QueryParams {
  nama?: string;
  sortby_nama?: "asc" | "desc" | string | null;
  sortby_email?: "asc" | "desc" | string | null;
  sortby_nomor_hp?: "asc" | "desc" | string | null;
}

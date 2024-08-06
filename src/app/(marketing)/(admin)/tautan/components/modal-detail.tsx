"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSchema } from "./form-schema";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { EyeIcon } from "@/components/svgs/eye";
import { CalenderIcon } from "@/components/svgs/calender";
import { CopyIcon } from "@/components/svgs/copy";
import { useToast } from "@/components/ui/use-toast";
import { useGetDetailTautan } from "@/handlers/tautan/get-detail";
import { EditIcon } from "@/components/svgs/edit";
import { XIcon } from "@/components/svgs/x";
import { Spinner } from "@/components/ui/spinner";
import { SaveIcon } from "@/components/svgs/save";
import { useUpdateTautan } from "@/handlers/tautan/update-data";
import { convertDate } from "@/lib/utils/convert-date";

export const ModalDetailTautan = ({
  tautanId,
  isDetail = true,
}: {
  tautanId: string;
  isDetail?: boolean;
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState<boolean>(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState<boolean>(false);

  const { toast } = useToast();

  const { data, refetch: refetchDetailTautan } = useGetDetailTautan(tautanId);

  const { mutateAsync, isPending } = useUpdateTautan(tautanId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama_kegiatan: "",
      nama_instansi: "",
      alamat: "",
      nama_pic: "",
      nama_pic_instansi: "",
      tanggal_mulai: new Date(),
    },
  });

  const {
    program_id,
    nama_kegiatan,
    alamat,
    nama_pic,
    nama_pic_instansi,
    nama_instansi,
    tanggal_mulai,
    tanggal_berakhir,
  } = form.formState.errors;

  useEffect(() => {
    if (isOpenModal) {
      refetchDetailTautan();
    }
  }, [isOpenModal]);

  useEffect(() => {
    form.setValue("program_id", data?.data?.program_id?.toString());
    form.setValue("nama_kegiatan", data?.data?.nama_kegiatan);
    form.setValue("nama_instansi", data?.data?.nama_instansi);
    form.setValue("alamat", data?.data?.alamat);
    form.setValue("nama_pic", data?.data?.nama_pic);
    form.setValue("nama_pic_instansi", data?.data?.nama_pic_instansi);
    form.setValue("tanggal_mulai", new Date(data?.data?.tanggal_mulai));
    form.setValue("tanggal_berakhir", new Date(data?.data?.tanggal_berakhir));
    form.setValue(
      "link",
      `${process.env.NEXT_PUBLIC_APP_URL}/presensi?code=${data?.data?.id}`,
    );
  }, [data]);

  const tanggalMulai = form.watch("tanggal_mulai");

  const validationErrorClass = "outline outline-1 outline-red-500";

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await mutateAsync(data);
    setIsOpenModal(false);
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <button title={isDetail ? "Detail" : "Ubah"}>
          {isDetail ? <EyeIcon /> : <EditIcon />}
        </button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:max-w-[575px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[#333333]">
            {isDetail ? "Melihat Tautan" : "Mengubah Tautan"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <FormField
              control={form.control}
              name="program_id"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2">Program</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                          program_id && validationErrorClass,
                        )}
                        disabled={isDetail}
                      >
                        <SelectValue placeholder="Pilih program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Sekolah</SelectItem>
                      <SelectItem value="2">Kerjasama</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama_instansi"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="nama_instansi">
                    Nama Instansi
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nama_instansi"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        nama_instansi && validationErrorClass,
                      )}
                      placeholder="Nama Instansi"
                      {...field}
                      disabled={isDetail}
                    />
                  </FormControl>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama_kegiatan"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="nama_kegiatan">
                    Nama Kegiatan
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nama_kegiatan"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        nama_kegiatan && validationErrorClass,
                      )}
                      placeholder="Nama Kegiatan"
                      {...field}
                      disabled={isDetail}
                    />
                  </FormControl>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="alamat">
                    Alamat
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="alamat"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        alamat && validationErrorClass,
                      )}
                      placeholder="Alamat"
                      {...field}
                      disabled={isDetail}
                    />
                  </FormControl>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama_pic"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="nama_pic">
                    Nama PIC
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nama_pic"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        nama_pic && validationErrorClass,
                      )}
                      placeholder="Nama PIC"
                      {...field}
                      disabled={isDetail}
                    />
                  </FormControl>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama_pic_instansi"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="nama_pic_instansi">
                    Nama PIC PT/Instansi
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nama_pic_instansi"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        nama_pic_instansi && validationErrorClass,
                      )}
                      placeholder="Nama PIC"
                      {...field}
                      disabled={isDetail}
                    />
                  </FormControl>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggal_mulai"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2">Tanggal Mulai</FormLabel>
                  <Popover
                    modal
                    open={isStartDateOpen}
                    onOpenChange={setIsStartDateOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "col-span-4 justify-start p-0 text-left font-normal disabled:opacity-100",
                            !field.value && "text-muted-foreground",
                            tanggal_mulai && validationErrorClass,
                          )}
                          disabled={isDetail}
                        >
                          <div className="mr-2 flex h-full items-center justify-center border-r px-2">
                            <CalenderIcon />
                          </div>
                          {field.value ? (
                            <span>{convertDate(field.value)}</span>
                          ) : (
                            <span>Tanggal selesai</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsStartDateOpen(false);
                        }}
                        initialFocus
                        locale={id}
                        fromDate={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tanggal_berakhir"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2">Tanggal Selesai</FormLabel>
                  <Popover
                    modal
                    open={isEndDateOpen}
                    onOpenChange={setIsEndDateOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "col-span-4 justify-start p-0 text-left font-normal disabled:opacity-100",
                            !field.value && "text-muted-foreground",
                            tanggal_berakhir && validationErrorClass,
                          )}
                          disabled={isDetail}
                        >
                          <div className="mr-2 flex h-full items-center justify-center border-r px-2">
                            <CalenderIcon />
                          </div>
                          {field.value ? (
                            <span>{convertDate(field.value)}</span>
                          ) : (
                            <span>{field.value}</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setIsEndDateOpen(false);
                        }}
                        fromDate={tanggalMulai}
                        initialFocus
                        locale={id}
                      />
                    </PopoverContent>
                  </Popover>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="link">
                    Link
                  </FormLabel>
                  <FormControl>
                    <div className="col-span-4 flex rounded-lg border">
                      <Input
                        id="link"
                        className={cn(
                          "col-span-3 rounded-lg border-none disabled:pointer-events-none disabled:opacity-100",
                        )}
                        placeholder="Link Presensi"
                        {...field}
                        disabled
                      />
                      <span
                        className="cursor-pointer border-l p-2"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${process.env.NEXT_PUBLIC_APP_URL}/presensi?code=${data?.data?.id}`,
                          );
                          toast({
                            description: "Berhasil disalin",
                          });
                        }}
                      >
                        <CopyIcon />
                      </span>
                    </div>
                  </FormControl>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            {isDetail ? null : (
              <div className="mt-2 flex justify-center gap-8">
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="w-[200px] bg-red-07 hover:bg-red-07/85"
                  >
                    <XIcon />
                    Batal
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="w-[200px] bg-blue-05"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <>
                      <SaveIcon />
                      Simpan
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
        {isDetail ? (
          <DialogClose asChild>
            <Button className="mx-auto w-52 bg-blue-05">Selesai</Button>
          </DialogClose>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

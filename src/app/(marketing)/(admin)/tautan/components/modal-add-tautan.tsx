"use client";

import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { useState } from "react";
import { CalenderIcon } from "@/components/svgs/calender";
import { DialogClose } from "@radix-ui/react-dialog";
import { XIcon } from "@/components/svgs/x";
import { SaveIcon } from "@/components/svgs/save";
import { validationErrorClass } from "@/lib/constant/error-class";
import { useCreateTautan } from "@/handlers/tautan/create-data";
import { Spinner } from "@/components/ui/spinner";

export const ModalAddTautan = () => {
  const [openModal, setIsOpenModal] = useState(false);
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      program_id: "",
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

  const tanggalMulai = form.watch("tanggal_mulai");

  const { mutateAsync, isPending, isSuccess } = useCreateTautan();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await mutateAsync(data);
    setIsOpenModal(isSuccess);
  }

  return (
    <Dialog open={openModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-black-07">
          <Plus width={16} height={16} className="mr-1" />
          Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:max-w-[575px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[#333333]">
            Tambah Tautan
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-2 py-4"
          >
            <FormField
              control={form.control}
              name="program_id"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="program_id">
                    Program
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "col-span-4 rounded-lg",
                          program_id && validationErrorClass,
                        )}
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
                        "col-span-4 rounded-lg",
                        nama_instansi && validationErrorClass,
                      )}
                      placeholder="Nama Instansi"
                      {...field}
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
                        "col-span-4 rounded-lg",
                        nama_kegiatan && validationErrorClass,
                      )}
                      placeholder="Nama Kegiatan"
                      {...field}
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
                        "col-span-4 rounded-lg",
                        alamat && validationErrorClass,
                      )}
                      placeholder="Alamat"
                      {...field}
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
                        "col-span-4 rounded-lg",
                        nama_pic && validationErrorClass,
                      )}
                      placeholder="Nama PIC"
                      {...field}
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
                        "col-span-4 rounded-lg",
                        nama_pic_instansi && validationErrorClass,
                      )}
                      placeholder="Nama PIC"
                      {...field}
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
                            "col-span-4 justify-start p-0 text-left font-normal",
                            !field.value && "text-muted-foreground",
                            tanggal_mulai && validationErrorClass,
                          )}
                        >
                          <div className="mr-2 flex h-full items-center justify-center border-r px-2">
                            <CalenderIcon />
                          </div>
                          {field.value ? (
                            format(field.value, "dd MMMM yyyy", {
                              locale: id,
                            })
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
                            "col-span-4 justify-start p-0 text-left font-normal",
                            !field.value && "text-muted-foreground",
                            tanggal_berakhir && validationErrorClass,
                          )}
                        >
                          <div className="mr-2 flex h-full items-center justify-center border-r px-2">
                            <CalenderIcon />
                          </div>
                          {field.value ? (
                            format(field.value, "dd MMMM yyyy", {
                              locale: id,
                            })
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
                  <Spinner className="h-4 w-[150px]" />
                ) : (
                  <>
                    <SaveIcon />
                    Simpan
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

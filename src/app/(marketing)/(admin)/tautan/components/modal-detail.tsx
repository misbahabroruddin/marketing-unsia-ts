"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

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

export const ModalDetailTautan = () => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama_kegiatan: "",
      instansi: "",
      alamat: "",
      nama_pic: "",
      nama_pic_pt: "",
      tanggal_mulai: new Date(),
    },
  });

  const {
    program,
    nama_kegiatan,
    alamat,
    nama_pic,
    nama_pic_pt,
    instansi,
    tanggal_mulai,
    tanggal_selesai,
  } = form.formState.errors;

  const tanggalMulai = form.watch("tanggal_mulai");

  const validationErrorClass = "outline outline-1 outline-red-500";

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(JSON.stringify(data));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button title="Detail">
          <EyeIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:max-w-[575px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[#333333]">
            Melihat Tautan
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <FormField
              control={form.control}
              name="program"
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
                          program && validationErrorClass,
                        )}
                        disabled
                      >
                        <SelectValue placeholder="Pilih program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sekolah">Sekolah</SelectItem>
                      <SelectItem value="kerjasama">Kerjasama</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instansi"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="instansi">
                    Nama Instansi
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="instansi"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        instansi && validationErrorClass,
                      )}
                      placeholder="Nama Instansi"
                      {...field}
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
                    />
                  </FormControl>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama_pic_pt"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="nama_pic_pt">
                    Nama PIC PT/Instansi
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nama_pic_pt"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        nama_pic_pt && validationErrorClass,
                      )}
                      placeholder="Nama PIC"
                      {...field}
                      disabled
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
                          disabled
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
              name="tanggal_selesai"
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
                            tanggal_selesai && validationErrorClass,
                          )}
                          disabled
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
                      <button className="border-l p-2">
                        <CopyIcon />
                      </button>
                    </div>
                  </FormControl>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogClose>
          <Button className="mx-auto w-52 bg-blue-05">Selesai</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

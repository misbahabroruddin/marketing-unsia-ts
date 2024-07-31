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

export const ModalAddTautan = () => {
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(JSON.stringify(data));
  }

  return (
    <Dialog>
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
              name="program"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="program">
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
                          program && validationErrorClass,
                        )}
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
                        "col-span-4 rounded-lg",
                        instansi && validationErrorClass,
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
                        "col-span-4 rounded-lg",
                        nama_pic_pt && validationErrorClass,
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
                            "col-span-4 justify-start p-0 text-left font-normal",
                            !field.value && "text-muted-foreground",
                            tanggal_selesai && validationErrorClass,
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
              <DialogClose>
                <Button
                  type="button"
                  className="w-[200px] bg-red-07 hover:bg-red-07/85"
                >
                  <XIcon />
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" className="w-[200px] bg-blue-05">
                <SaveIcon />
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

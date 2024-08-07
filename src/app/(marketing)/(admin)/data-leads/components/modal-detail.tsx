"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeIcon } from "@/components/svgs/eye";
import { FormSchema } from "./form.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { validationErrorClass } from "@/lib/constant/error-class";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalenderIcon } from "@/components/svgs/calender";
import { convertDate } from "@/lib/utils/convert-date";
import { useGetDetailDataLeads } from "@/handlers/data-leads/get-detail";

export const ModalDetailDataLeads = ({
  dataLeadId,
  isDetail = false,
}: {
  dataLeadId: string;
  isDetail?: boolean;
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isTanggalLahirOpen, setIsTanggalLahirOpen] = useState<boolean>(false);

  const { data, refetch: refetchDetailDataLead } =
    useGetDetailDataLeads(dataLeadId);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    nama,
    tempat_lahir_id,
    tanggal_lahir,
    email,
    nomor_hp,
    nama_instansi,
    jurusan,
  } = form.formState.errors;

  useEffect(() => {
    if (isOpenModal) {
      refetchDetailDataLead();
    }
  }, [isOpenModal]);

  useEffect(() => {
    form.setValue("nama", data?.data?.nama);
    form.setValue("tanggal_lahir", new Date(data?.data?.tanggal_lahir));
    form.setValue("email", data?.data?.email);
    form.setValue("nomor_hp", data?.data?.nomor_hp);
    form.setValue("nama_instansi", data?.data?.nama_instansi);
    form.setValue("jurusan", data?.data?.jurusan);
  }, [data]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    alert(JSON.stringify(data));
  }
  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <button title="Detail">
          <EyeIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:max-w-[575px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[#333333]">
            Melihat Peminat
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="nama">
                    Nama Lengkap
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nama"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        nama && validationErrorClass,
                      )}
                      placeholder="Nama Lengkap"
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
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2">Tanggal Mulai</FormLabel>
                  <Popover
                    modal
                    open={isTanggalLahirOpen}
                    onOpenChange={setIsTanggalLahirOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "col-span-4 justify-start p-0 text-left font-normal disabled:opacity-100",
                            !field.value && "text-muted-foreground",
                            tanggal_lahir && validationErrorClass,
                          )}
                          disabled={isDetail}
                        >
                          <div className="mr-2 flex h-full items-center justify-center border-r px-2">
                            <CalenderIcon />
                          </div>
                          {field.value ? (
                            <span>{convertDate(field.value)}</span>
                          ) : (
                            <span>Tanggal lahir</span>
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
                          setIsTanggalLahirOpen(false);
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
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="email">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        email && validationErrorClass,
                      )}
                      placeholder="Email"
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
              name="nomor_hp"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="nomor_hp">
                    Nomor hp
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nomor_hp"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        nomor_hp && validationErrorClass,
                      )}
                      placeholder="Nomor hp"
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
              name="nama_instansi"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="nama_instansi">
                    Nomor hp
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nama_instansi"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        nama_instansi && validationErrorClass,
                      )}
                      placeholder="Nomor hp"
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
              name="jurusan"
              render={({ field }) => (
                <FormItem className="grid grid-cols-6 items-center gap-2">
                  <FormLabel className="col-span-2" htmlFor="jurusan">
                    Jurusan
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="jurusan"
                      className={cn(
                        "col-span-4 rounded-lg disabled:pointer-events-none disabled:opacity-100",
                        jurusan && validationErrorClass,
                      )}
                      placeholder="Jurusan"
                      {...field}
                      disabled={isDetail}
                    />
                  </FormControl>
                  <span className="col-span-2" style={{ marginTop: 0 }}></span>
                  <FormMessage className="col-span-4 mt-0" />
                </FormItem>
              )}
            />
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

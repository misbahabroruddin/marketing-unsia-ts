"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { useState } from "react";
import { id } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { CalenderIcon } from "@/components/svgs/calender";
import { Calendar } from "@/components/ui/calendar";
import { validationErrorClass } from "@/lib/constant/error-class";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSchema } from "./form-schema";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapMarkerIcon } from "@/components/svgs/map-marker";
import { useSearchParams } from "next/navigation";
import { CheckCheckIcon } from "lucide-react";
import { usePresensi } from "@/handlers/public/presensi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";

export const FormAbsensi: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isBirthdayOpen, setIsBirthdayOpen] = useState<boolean>(false);

  const queryParams = useSearchParams();
  const code = queryParams.get("code");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nama: "",
      tempat_lahir_id: "",
      email: "",
      nomor_hp: "",
      nama_instansi: "",
      jurusan: "",
    },
  });

  const {
    mutateAsync: onSubmitPresensi,
    isPending: isLoadingPresensi,
    isSuccess,
    status,
    isError,
  } = usePresensi();

  const {
    nama,
    tempat_lahir_id,
    tanggal_lahir,
    email,
    nomor_hp,
    nama_instansi,
    jurusan,
  } = form.formState.errors;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onSubmitPresensi(data);
    form.reset();
    setIsSubmitted(true);
  };
  return (
    <div className="mx-auto grid w-screen max-w-[1440px] place-items-center pt-[42px]">
      {isSubmitted ? (
        <>
          <div className="grid h-[120px] w-[290px] bg-[url('/headline-form-absensi-mobile.png')] lg:h-[132px] lg:w-[696px] lg:place-items-center lg:bg-[url('/headline-form-absensi.png')]">
            <div className="flex flex-col items-center justify-center">
              <p className="w-[178px] text-center text-base font-semibold leading-8 text-white lg:w-[511px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                Nama Kegiatan
              </p>
              <p className="w-[178px] text-center text-base font-semibold leading-8 text-white lg:w-[511px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                Universitas Siber Asia
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <div className="flex items-center gap-1">
                <MapMarkerIcon />
                <p className="text-xs text-white">SEKOLAH</p>
              </div>
              <div className="flex items-center gap-1">
                <CalenderIcon color="white" />
                <p className="text-xs text-white">SEKOLAH</p>
              </div>
            </div>
          </div>
          <div className="w-[290px] rounded-b-lg border bg-white p-4 lg:w-[696px] lg:rounded-b-2xl lg:border-none lg:pb-[39px] lg:pl-[94px] lg:pr-[77px] lg:pt-6">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-green-400">
              <CheckCheckIcon />
            </div>
            <h1 className="mt-4 text-center text-base font-semibold lg:text-3xl">
              Presensi Berhasil
            </h1>
          </div>
        </>
      ) : null}
      {code && !isSubmitted ? (
        <>
          <div className="grid h-[120px] w-[290px] bg-[url('/headline-form-absensi-mobile.png')] lg:h-[132px] lg:w-[696px] lg:place-items-center lg:bg-[url('/headline-form-absensi.png')]">
            <div className="flex flex-col items-center justify-center">
              <p className="w-[178px] text-center text-base font-semibold leading-8 text-white lg:w-[511px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                Nama Kegiatan
              </p>
              <p className="w-[178px] text-center text-base font-semibold leading-8 text-white lg:w-[511px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                Universitas Siber Asia
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <div className="flex items-center gap-1">
                <MapMarkerIcon />
                <p className="text-xs text-white">SEKOLAH</p>
              </div>
              <div className="flex items-center gap-1">
                <CalenderIcon color="white" />
                <p className="text-xs text-white">SEKOLAH</p>
              </div>
            </div>
          </div>
          <div className="w-[290px] rounded-b-lg border bg-white p-4 lg:w-[696px] lg:rounded-b-2xl lg:border-none lg:pb-[39px] lg:pl-[94px] lg:pr-[77px] lg:pt-6">
            <div className="flex w-full flex-col lg:w-[567px]">
              <Form {...form}>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-2 space-y-0">
                        <FormLabel
                          className="col-span-6 text-xs lg:col-span-2 lg:text-base"
                          htmlFor="nama"
                        >
                          Nama Lengkap
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="nama"
                            className={cn(
                              "col-span-6 rounded-lg lg:col-span-4",
                              nama && validationErrorClass,
                            )}
                            placeholder="Nama Lengkap"
                            {...field}
                          />
                        </FormControl>
                        <span
                          className="hidden lg:col-span-2 lg:block"
                          style={{ marginTop: 0 }}
                        ></span>
                        <FormMessage className="col-span-6 mt-0 lg:col-span-4" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tempat_lahir_id"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-2">
                        <FormLabel
                          className="col-span-2"
                          htmlFor="tempat_lahir_id"
                        >
                          Tempat Lahir
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                "col-span-4 rounded-lg",
                                tempat_lahir_id && validationErrorClass,
                              )}
                            >
                              <SelectValue placeholder="Pilih Tempat Lahir" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="52.01">Lombok Barat</SelectItem>
                            <SelectItem value="52.02">Lombok Utara</SelectItem>
                          </SelectContent>
                        </Select>
                        <span
                          className="col-span-2"
                          style={{ marginTop: 0 }}
                        ></span>
                        <FormMessage className="col-span-4 mt-0" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tanggal_lahir"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-2 space-y-0">
                        <FormLabel className="col-span-6 lg:col-span-2">
                          Tanggal Lahir
                        </FormLabel>
                        <Popover
                          modal
                          open={isBirthdayOpen}
                          onOpenChange={setIsBirthdayOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "col-span-6 justify-start p-0 text-left font-normal lg:col-span-4",
                                  !field.value && "text-muted-foreground",
                                  tanggal_lahir && validationErrorClass,
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
                                setIsBirthdayOpen(false);
                              }}
                              initialFocus
                              locale={id}
                              captionLayout="dropdown"
                              fromYear={1960}
                              toYear={2030}
                            />
                          </PopoverContent>
                        </Popover>
                        <span
                          className="hidden lg:col-span-2 lg:block"
                          style={{ marginTop: 0 }}
                        ></span>
                        <FormMessage className="col-span-6 mt-0 lg:col-span-4" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-2 space-y-0">
                        <FormLabel
                          className="col-span-6 text-xs lg:col-span-2 lg:text-base"
                          htmlFor="email"
                        >
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            className={cn(
                              "col-span-6 rounded-lg lg:col-span-4",
                              email && validationErrorClass,
                            )}
                            placeholder="Email"
                            {...field}
                            type="email"
                          />
                        </FormControl>
                        <span
                          className="hidden lg:col-span-2 lg:block"
                          style={{ marginTop: 0 }}
                        ></span>
                        <FormMessage className="col-span-6 mt-0 lg:col-span-4" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nomor_hp"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-2 space-y-0">
                        <FormLabel
                          className="col-span-6 text-xs lg:col-span-2 lg:text-base"
                          htmlFor="nomor_hp"
                        >
                          Nomor Hp
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="nomor_hp"
                            className={cn(
                              "col-span-6 rounded-lg lg:col-span-4",
                              nomor_hp && validationErrorClass,
                            )}
                            placeholder="Nomor Hp"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <span
                          className="hidden lg:col-span-2 lg:block"
                          style={{ marginTop: 0 }}
                        ></span>
                        <FormMessage className="col-span-6 mt-0 lg:col-span-4" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nama_instansi"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-2 space-y-0">
                        <FormLabel
                          className="col-span-6 text-xs lg:col-span-2 lg:text-base"
                          htmlFor="nama_instansi"
                        >
                          Nama Instansi
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="nama_instansi"
                            className={cn(
                              "col-span-6 rounded-lg lg:col-span-4",
                              nama_instansi && validationErrorClass,
                            )}
                            placeholder="Nama Instansi"
                            {...field}
                          />
                        </FormControl>
                        <span
                          className="hidden lg:col-span-2 lg:block"
                          style={{ marginTop: 0 }}
                        ></span>
                        <FormMessage className="col-span-6 mt-0 lg:col-span-4" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jurusan"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-2 space-y-0">
                        <FormLabel
                          className="col-span-6 text-xs lg:col-span-2 lg:text-base"
                          htmlFor="jurusan"
                        >
                          Jurusan
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="jurusan"
                            className={cn(
                              "col-span-6 rounded-lg lg:col-span-4",
                              jurusan && validationErrorClass,
                            )}
                            placeholder="Jurusan"
                            {...field}
                          />
                        </FormControl>
                        <span
                          className="hidden lg:col-span-2 lg:block"
                          style={{ marginTop: 0 }}
                        ></span>
                        <FormMessage className="col-span-6 mt-0 lg:col-span-4" />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-2 space-y-0">
                        <FormLabel
                          className="col-span-6 text-xs lg:col-span-2 lg:text-base"
                          htmlFor="instagram"
                        >
                          Nama Instagram
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="instagram"
                            className={cn(
                              "col-span-6 rounded-lg lg:col-span-4",
                            )}
                            placeholder="Nama Instagram"
                            {...field}
                          />
                        </FormControl>
                        <span
                          className="hidden lg:col-span-2 lg:block"
                          style={{ marginTop: 0 }}
                        ></span>
                        <FormMessage className="col-span-6 mt-0 lg:col-span-4" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-6 items-center gap-2 space-y-0">
                        <FormLabel
                          className="col-span-6 text-xs lg:col-span-2 lg:text-base"
                          htmlFor="facebook"
                        >
                          Nama Facebook
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="facebook"
                            className={cn(
                              "col-span-6 rounded-lg lg:col-span-4",
                            )}
                            placeholder="Nama Facebook"
                            {...field}
                          />
                        </FormControl>
                        <span
                          className="hidden lg:col-span-2 lg:block"
                          style={{ marginTop: 0 }}
                        ></span>
                        <FormMessage className="col-span-6 mt-0 lg:col-span-4" />
                      </FormItem>
                    )}
                  /> */}
                  <Button
                    type="submit"
                    className="mx-auto mt-3 h-12 w-[120px] bg-blue-05 lg:w-[200px]"
                  >
                    {isLoadingPresensi ? (
                      <Spinner className="h-4 w-4" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

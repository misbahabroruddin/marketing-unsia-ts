import { Metadata } from "next";

export const metadataConfig: Metadata = {
  title: {
    default: "Marketing UNSIA",
    template: "%s | Marketing UNSIA",
  },
  description:
    "Sistem Informasi Penelitian dan Pengabdian Masyarakat (SIPPM) merupakan platform yang digunakan civitas akademik Universitas Siber Asia dalam pengajuan proposal untuk penelitian ataupun pengabdian kepada masyarakat",
  keywords: [
    "Marketing",
    "marketing unsia",
    "unsia",
    "PMB Unsia",
    "Universitas Siber Asia",
    "UNSIA",
    "Universitas Siber Asia",
  ],
  authors: {
    name: "Universitas Siber Asia",
  },
  creator: "Misbah Abroruddin",
  icons: [
    {
      url: "/logo-unsia.svg",
      href: "/logo-unsia.svg",
    },
  ],
  applicationName: "Marketing",
  openGraph: {
    title: "Marketing UNSIA",
    siteName: "Marketing UNSIA",
    locale: "id_Id",
    url: "https://www.unsia.ac.id",
    countryName: "Indonesia",
    type: "website",
    emails: "admission@unsia.ac.id",
    phoneNumbers: "(021) 278-061-89",
  },
  twitter: {
    title: "Marketing UNSIA",
    site: "@univsiberasia",
  },
  metadataBase: new URL("https://www.marketing.unsia.ac.id"),
};

export function generateMetadata() {
  return { title: "Presensi" };
}

export default function PresensiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

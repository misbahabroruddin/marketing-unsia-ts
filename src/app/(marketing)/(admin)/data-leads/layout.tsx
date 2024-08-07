export function generateMetadata() {
  return { title: "Peminat" };
}

export default function PeminatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

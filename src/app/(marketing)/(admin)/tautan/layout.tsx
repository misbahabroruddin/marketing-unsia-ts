export function generateMetadata() {
  return { title: "Link" };
}

export default function TautanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

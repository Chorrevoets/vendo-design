import ServiceLayout from "@/components/service-layout";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceLayout>{children}</ServiceLayout>;
}

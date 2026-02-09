import ServiceLayout from "@/components/service-layout";

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceLayout>{children}</ServiceLayout>;
}

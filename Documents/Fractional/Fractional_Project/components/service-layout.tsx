import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

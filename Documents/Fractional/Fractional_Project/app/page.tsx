import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { Services } from "@/components/sections/services";
import { Experience } from "@/components/sections/experience";
import { Capabilities } from "@/components/sections/capabilities";
import { EngagementModels } from "@/components/sections/engagement-models";
import { Approach } from "@/components/sections/approach";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Trust />
      <Services />
      <Experience />
      <Capabilities />
      <EngagementModels />
      <Approach />
      <Footer />
    </main>
  );
}

"use client";

import { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GetInTouchDialog } from "@/components/get-in-touch-dialog";

export default function ExperimentationGrowthPage() {
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  return (
    <>
      <div className="pt-28 pb-20">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <BackButton />
          
          <div className="mb-8">
            <div className="w-2 h-2 rounded-full bg-accent mb-4" />
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Experimentation & Growth Systems
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Establish north-star metrics, experimentation cadence, and evidence-based decision-making.
            </p>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Data-Driven Product Development</h2>
                <p>
                  Great product decisions are based on evidence, not opinions. I help organisations establish 
                  experimentation systems that enable rapid learning and evidence-based decision-making. This 
                  includes defining north-star metrics, setting up experimentation cadences, and creating 
                  frameworks for interpreting results.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Growth Systems</h2>
                <p>
                  Sustainable growth comes from systems, not one-off campaigns. I work with teams to establish 
                  growth loops, identify key activation and retention moments, and build measurement systems that 
                  track what matters. This includes both product-led growth and traditional growth marketing 
                  integration.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">What I Set Up</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>North-star metrics and measurement framework</li>
                  <li>Experimentation cadence and process</li>
                  <li>A/B testing infrastructure and best practices</li>
                  <li>Growth loop design and implementation</li>
                  <li>Data-driven decision-making culture</li>
                </ul>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-lg text-foreground mb-6">
                Ready to build your experimentation and growth systems?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => setIsGetInTouchOpen(true)}>
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/#services">
                    View all services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GetInTouchDialog open={isGetInTouchOpen} onOpenChange={setIsGetInTouchOpen} />
    </>
  );
}

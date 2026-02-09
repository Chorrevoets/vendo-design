"use client";

import { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GetInTouchDialog } from "@/components/get-in-touch-dialog";

export default function FractionalHeadOfProductPage() {
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  return (
    <>
      <div className="pt-28 pb-20">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <BackButton />
          
          <div className="mb-8">
            <div className="w-2 h-2 rounded-full bg-accent mb-4" />
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Fractional Head of Product / Interim Leadership
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Embedded senior leadership to stabilise teams, align stakeholders, and rebuild momentum.
            </p>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">What I Bring</h2>
                <p>
                  When your product organisation needs experienced leadership but isn't ready for a permanent hire, 
                  I step in as a fractional or interim Head of Product. This is hands-on, embedded leadership—not 
                  advisory from the sidelines. I focus on outcomes, decision quality, and leaving teams stronger 
                  than I found them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">How It Works</h2>
                <p>
                  I integrate directly into your team, working alongside product managers, engineers, and stakeholders 
                  to create clarity, rebuild momentum, and establish sustainable processes. Whether you're navigating a 
                  transition, scaling rapidly, or need to reset direction, I provide the senior product leadership 
                  without the overhead of a full-time executive hire.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Typical Engagements</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Stabilising teams during leadership transitions</li>
                  <li>Rebuilding product momentum after setbacks</li>
                  <li>Aligning stakeholders around product direction</li>
                  <li>Establishing product processes and frameworks</li>
                  <li>Mentoring and developing product talent</li>
                </ul>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-lg text-foreground mb-6">
                Ready to discuss how fractional product leadership can help your organisation?
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

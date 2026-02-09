"use client";

import { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GetInTouchDialog } from "@/components/get-in-touch-dialog";

export default function ProductStrategyPage() {
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  return (
    <>
      <div className="pt-28 pb-20">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <BackButton />
          
          <div className="mb-8">
            <div className="w-2 h-2 rounded-full bg-accent mb-4" />
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Product Strategy & 3-Year Direction
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Define credible product strategy tied to customer value and business outcomes.
            </p>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Strategic Clarity</h2>
                <p>
                  A strong product strategy connects customer problems to business outcomes. I work with founders 
                  and executive teams to define a credible 3-year product direction that balances ambition with 
                  execution reality. This isn't about creating beautiful slide decks—it's about establishing a 
                  strategic framework that guides decision-making and resource allocation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">My Approach</h2>
                <p>
                  I start by understanding your business model, customer segments, and competitive landscape. 
                  Then I work with your team to articulate a product strategy that's grounded in customer value 
                  and tied directly to business metrics. The output is a clear strategic framework that your 
                  product organisation can use to make consistent, aligned decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">What You'll Get</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>A clear product strategy document tied to business outcomes</li>
                  <li>3-year product vision and roadmap framework</li>
                  <li>Strategic decision-making framework for your team</li>
                  <li>Alignment across stakeholders and leadership</li>
                  <li>Clear articulation of product-market fit and positioning</li>
                </ul>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-lg text-foreground mb-6">
                Ready to define your product strategy?
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

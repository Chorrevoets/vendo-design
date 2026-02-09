"use client";

import { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GetInTouchDialog } from "@/components/get-in-touch-dialog";

export default function OpportunityLedDiscoveryPage() {
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  return (
    <>
      <div className="pt-28 pb-20">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <BackButton />
          
          <div className="mb-8">
            <div className="w-2 h-2 rounded-full bg-accent mb-4" />
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Opportunity-Led Discovery
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Reset teams using Opportunity Solution Trees and value-driver analysis to focus on the highest leverage work.
            </p>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Focus on Opportunities, Not Solutions</h2>
                <p>
                  Too many product teams jump to solutions before understanding the underlying opportunities. I help 
                  teams reset their discovery process using Opportunity Solution Trees and value-driver analysis. 
                  This approach ensures you're working on the highest leverage opportunities that drive real customer 
                  and business value.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">The Framework</h2>
                <p>
                  I work with your product teams to map customer outcomes to business outcomes, identify the highest 
                  leverage opportunities, and then explore multiple solution paths. This structured approach prevents 
                  premature solution commitment and ensures you're solving the right problems at the right time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">What This Includes</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Opportunity Solution Tree workshops and training</li>
                  <li>Value-driver analysis and mapping</li>
                  <li>Discovery process design and implementation</li>
                  <li>Team coaching on opportunity-led thinking</li>
                  <li>Integration with your existing product development workflow</li>
                </ul>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-lg text-foreground mb-6">
                Ready to reset your discovery process?
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

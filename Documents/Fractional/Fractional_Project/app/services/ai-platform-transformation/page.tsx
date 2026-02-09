"use client";

import { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { GetInTouchDialog } from "@/components/get-in-touch-dialog";

export default function AIPlatformTransformationPage() {
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  return (
    <>
      <div className="pt-28 pb-20">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          <BackButton />
          
          <div className="mb-8">
            <div className="w-2 h-2 rounded-full bg-accent mb-4" />
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              AI & Platform Transformation
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Identify practical AI opportunities and embed them into products and workflows with appropriate trust and safety.
            </p>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Practical AI Integration</h2>
                <p>
                  AI is transforming how products work, but not every AI opportunity is worth pursuing. I help 
                  organisations identify practical AI opportunities that create real customer value while managing 
                  risk and ensuring appropriate trust and safety measures. This isn't about chasing the latest AI 
                  trend—it's about thoughtful integration that enhances your product.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Platform Thinking</h2>
                <p>
                  Beyond AI, I help organisations think about platform transformation—building products that can 
                  scale, adapt, and create network effects. This includes API strategy, developer ecosystems, and 
                  architectural decisions that enable long-term growth and flexibility.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">What I Help With</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI opportunity assessment and prioritisation</li>
                  <li>Trust and safety framework design</li>
                  <li>Platform strategy and architecture</li>
                  <li>AI product integration planning</li>
                  <li>Risk management and ethical considerations</li>
                </ul>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-lg text-foreground mb-6">
                Ready to explore AI and platform opportunities?
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { CVDownloadDialog } from "@/components/cv-download-dialog";
import { BookingDialog } from "@/components/booking-dialog";

export function Hero() {
  const [isCVDialogOpen, setIsCVDialogOpen] = useState(false);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  return (
    <>
      <section id="hero" className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-28 pb-20 bg-background">
        <div className="max-w-4xl">
          <p className="text-sm font-medium tracking-wide mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-muted-foreground">Coen Horrevoets</span>
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight text-balance">
            Fractional Product Leadership for founders and executive teams
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            I help organisations create clarity, momentum, and commercial rigour in product. I step in when senior product leadership is needed without committing to a permanent hire.
          </p>
          <p className="mt-6 text-sm text-muted-foreground tracking-wide">
            Based in Sydney. Available for fractional, interim, and advisory engagements.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="group"
              onClick={() => setIsBookingDialogOpen(true)}
            >
              Book a short intro call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group bg-transparent"
              onClick={() => setIsCVDialogOpen(true)}
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </div>
        </div>
      </section>
      <CVDownloadDialog open={isCVDialogOpen} onOpenChange={setIsCVDialogOpen} />
      <BookingDialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen} />
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { BookingDialog } from "@/components/booking-dialog";
import { PhoneContactDialog } from "@/components/phone-contact-dialog";

export function Footer() {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);

  return (
    <>
      <footer id="contact" className="px-6 md:px-12 lg:px-24 py-24 border-t border-border bg-primary text-primary-foreground">
        <div className="max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            {"Let's talk."}
          </h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-xl mb-10">
            {"If you're at a product inflection point and want senior product leadership without the overhead, book a short intro call."}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="group mb-16"
            onClick={() => setIsBookingDialogOpen(true)}
          >
            Book a short intro call
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-sm text-primary-foreground/70">
            <a
              href="mailto:coen@productclarity.work"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              coen@productclarity.work
            </a>
            <button
              onClick={() => setIsPhoneDialogOpen(true)}
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors text-left"
            >
              <Phone className="h-4 w-4" />
              +61 450 XXX XXX
            </button>
            <a
              href="/coen-horrevoets.vcf"
              download
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Image
                src="/vcard.svg"
                alt="vCard"
                width={16}
                height={16}
                className="h-4 w-4 invert opacity-70 hover:opacity-100"
              />
              Download vCard
            </a>
            <a
              href="https://www.linkedin.com/in/coen-horrevoets/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Image
                src="/linkedin.webp"
                alt="LinkedIn"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              LinkedIn
            </a>
            <a
              href="https://adplist.org/mentors/coen-horrevoets"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Image
                src="/adplist.webp"
                alt="ADPList"
                width={16}
                height={16}
                className="h-4 w-4"
              />
              ADPList
            </a>
          </div>
        </div>
      </footer>
      <BookingDialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen} />
      <PhoneContactDialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen} />
    </>
  );
}

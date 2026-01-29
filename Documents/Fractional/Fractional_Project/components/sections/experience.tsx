"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { CVDownloadDialog } from "@/components/cv-download-dialog";

const experiences = [
  {
    role: "VP Product & Operations (0–1)",
    company: "Vendo.AI",
    region: "",
    details: "Led 0→1 product and operations for Vendo.AI, partnering closely with founders and senior engineers to design and launch an agentic, AI-powered marketing analytics platform. The product enables business owners and growth teams to ask complex marketing questions in plain English and receive clear, revenue-relevant insights. I shaped the product vision, drove cadence and urgency, and ensured launch readiness."
  },
  {
    role: "Founder & Builder",
    company: "Captain Stillness",
    region: "",
    details: "Conceptualised and built an AI-driven mental health coach combining voice-first journaling, personality insights, and emotional wave tracking. The product delivers a playful yet grounded experience through conversational voice flows built with Vapi and Suno. I engineered the backend using Supabase, Python, and TypeScript, leveraging LLMs for personalised wellbeing insights. The work blends mindfulness, behavioural science, and hands-on AI product development."
  },
  {
    role: "Chief Product Officer",
    company: "Gumtree Group",
    region: "AU",
    details: "Accountable for growth, monetisation, and operational performance across Product, Design, Marketing, and Customer Support for an 8M+ MAU marketplace portfolio. Reset product foundations after organisational disruption, re-establishing strong product culture and execution cadence. Drove product-led growth through SEO, content, and performance marketing, improving CAC efficiency and ROAS while increasing qualified lead flow to dealers. Launched on-platform payments generating $120M+ GMV and strengthened marketplace trust and safety through AI-driven messaging and moderation."
  },
  {
    role: "Director of Product",
    company: "Airtasker",
    region: "AU, UK, US",
    details: "Owned product strategy for a high-volume, two-sided marketplace, driving measurable improvements in growth, reliability, and monetisation. Applied experimentation and machine learning to improve task–tasker matching quality, lift retention, and increase revenue, partnering closely with data and ML teams. Introduced subscription-based revenue for recurring tasks and embedded stronger data-driven decision-making across product teams, raising execution quality at scale."
  },
  {
    role: "Director of Product (Fulfilment, Payments & Fintech)",
    company: "Catawiki",
    region: "Global",
    details: "Founded and led the Fulfilment group spanning Payments, Fintech, Logistics, and Customer Service for a cross-border marketplace with 10M monthly users. Reframed fulfilment as a strategic growth and trust lever by building global payments orchestration, tax and regulatory automation, and integrated shipping capabilities. This reduced cross-border friction, improved transaction reliability and customer confidence, and drove measurable gains in CSAT and retention while enabling global scale."
  },
  {
    role: "Head of Global Product Strategy",
    company: "eBay Classifieds Group",
    region: "Global",
    details: "Set and executed global product strategy across 12+ marketplaces serving 100M+ MAUs, with a strong focus on scaling AI/ML and data science capabilities. Aligned regional product and growth leaders around shared value drivers, North Star Metrics, and a unified experimentation framework to operationalise machine-learning-driven search, relevance, and personalisation. This enabled more consistent activation, trust, and monetisation outcomes across  diverse global markets."
  },
  {
    role: "Head of Product & UX",
    company: "Yolt (ING-backed fintech)",
    region: "UK, NL, IT",
    details: "Led a product pivot from account aggregation to an eWallet and Debit Card proposition in a regulated, multi-market fintech environment, managing and scaling a team of PMs and Designers. Embedded behavioural design and Tiny Habits principles to bridge the gap between saving intentions and repeatable saving behaviours, supported by continuous experimentation. Established clear commercial value drivers and validated a new payments-led growth model across the UK and EU, delivering meaningful retention gains under strict regulatory and compliance constraints."
  },
];

export function Experience() {
  const [isCVDialogOpen, setIsCVDialogOpen] = useState(false);

  return (
    <>
      <section id="experience" className="px-6 md:px-12 lg:px-24 py-20 border-t border-border bg-card">
        <div className="max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-16">
            Experience
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {experiences.map((exp, index) => (
              <AccordionItem key={`${exp.role}-${exp.company}-${index}`} value={`item-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-left">
                    <span className="text-base font-semibold text-foreground">{exp.role}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {exp.company}
                      {exp.region && <span> ({exp.region})</span>}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed pt-2">
                    {exp.details}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-12 text-base font-[420] text-foreground tracking-wide">
            20+ years of product leadership across global platforms, scale-ups, and startups, using product-led growth principles across marketplaces, payments, regulated environments, and AI to build products people love and return to.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="mt-6 group bg-transparent"
            onClick={() => setIsCVDialogOpen(true)}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </div>
      </section>
      <CVDownloadDialog open={isCVDialogOpen} onOpenChange={setIsCVDialogOpen} />
    </>
  );
}

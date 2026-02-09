import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const caseStudies = [
  {
    slug: "from-insight-to-habit",
    title: "From Insight to Habit",
    descriptor:
      "Repositioning a struggling PFM app into a habit-forming savings platform while managing a product pivot during COVID-19 lockdowns",
    learn: "How I led a product pivot from aggregator to habit-forming platform during COVID, using Jobs-to-Be-Done and behavioural science to create primary relationship ownership.",
    outcomes: [
      "Repositioned from PFM to habit-forming platform during COVID market volatility",
      "Introduced JTBD framework targeting underserved Stretched segment",
      "Built activation model around weekly saving challenges and daily habit loops",
      "Launched beta to full rollout in 6 months despite pandemic disruption",
    ],
    tags: ["Behavioural Design", "Product Pivot", "Fintech", "Retention"],
  },
  {
    slug: "one-team-one-narrative",
    title: "When Everyone's Pointing Fingers, Nobody's Shipping",
    descriptor:
      "How to rescue a failing vertical when three teams hate each other and customers hate you more",
    learn: "Picture this: 61% of customer complaints land on one vertical. Three teams that barely speak. A #1 NPS detractor haemorrhaging trust for years. I transformed a €640M marketplace's fulfilment operation from liability into competitive weapon. Here's the playbook.",
    outcomes: [
      "Turned three warring tribes into a unified vertical with shared metrics that actually matter",
      "Built a strategic planning framework that survived pandemic chaos and compliance hell",
      "Shipped Integrated Shipping Services from zero to market in 6 months while delivering UK/EU VAT compliance",
      "Established the shoot for the stars, clear the fence planning approach now used across the organisation",
    ],
    tags: [
      "Product Leadership",
      "Team Transformation",
      "Growth Systems",
      "Crisis Management",
    ],
  },
  {
    slug: "defining-battlegrounds-for-growth",
    title: "Defining Battlegrounds for Growth",
    descriptor:
      "A one-week strategic product engagement in clinician-guided mental health",
    learn: "How to find growth where adoption stalled.",
    outcomes: [
      "Clarified two credible routes to growth.",
      "Identified adoption battlegrounds beyond features.",
    ],
    tags: ["Strategy", "Product-Market Fit", "Mental Health"],
  },
  {
    slug: "the-hard-30-from-signals-to-decisions",
    title: "The Hard 30%: From Signals to Decisions",
    descriptor:
      "Building high-integrity decision support in care-critical, regulated environments",
    learn: "How to design data-driven care platforms that deliver trustworthy decisions, reduce cognitive load, and work in regulated environments.",
    outcomes: [
      "North Star focused on decision confidence, not data volume.",
      "Opportunity mapping before solution ideation in regulated contexts.",
      "Human-in-the-loop by design; compliance as input, not gate.",
    ],
    tags: ["Regulated Products", "Healthcare", "Decision Support"],
  },
];

export const metadata = {
  title: "Case Studies | ProductClarity",
  description:
    "Selected examples of product leadership in complex environments. These cases focus on alignment, momentum, and the conditions required to turn teams and platforms into growth engines.",
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="w-2 h-2 rounded-full bg-accent mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Case Studies
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Selected examples of product leadership in complex environments.
            These cases focus on alignment, momentum, and the conditions
            required to turn teams and platforms into growth engines.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {caseStudies.map((caseStudy) => (
            <Link
              key={caseStudy.slug}
              href={`/case-studies/${caseStudy.slug}`}
              className="group block"
            >
              <Card className="transition-colors hover:border-accent/50">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">
                    {caseStudy.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {caseStudy.descriptor}
                  </CardDescription>
                  <p className="text-sm text-foreground/90 mt-1">
                    {caseStudy.learn}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                    {caseStudy.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">&#8226;</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center text-sm font-medium text-accent group-hover:underline">
                    Read case study
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

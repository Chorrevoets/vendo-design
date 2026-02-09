import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    slug: "fractional-head-of-product",
    title: "Fractional Head of Product / Interim Leadership",
    description:
      "Embedded senior leadership to stabilise teams, align stakeholders, and rebuild momentum.",
  },
  {
    slug: "product-strategy",
    title: "Product Strategy & 3-Year Direction",
    description:
      "Define credible product strategy tied to customer value and business outcomes.",
  },
  {
    slug: "opportunity-led-discovery",
    title: "Opportunity-Led Discovery",
    description:
      "Reset teams using Opportunity Solution Trees and value-driver analysis to focus on the highest leverage work.",
  },
  {
    slug: "ai-platform-transformation",
    title: "AI & Platform Transformation",
    description:
      "Identify practical AI opportunities and embed them into products and workflows with appropriate trust and safety.",
  },
  {
    slug: "experimentation-growth",
    title: "Experimentation & Growth Systems",
    description:
      "Establish north-star metrics, experimentation cadence, and evidence-based decision-making.",
  },
];

export function Services() {
  return (
    <section id="services" className="px-6 md:px-12 lg:px-24 py-20 border-t border-border bg-background">
      <div className="max-w-6xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-16">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {services.map((service) => (
            <div key={service.slug} className="group">
              <div className="w-2 h-2 rounded-full bg-accent mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center text-sm font-medium text-accent hover:underline group-hover:text-accent transition-colors"
              >
                Learn more
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

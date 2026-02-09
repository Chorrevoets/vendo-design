import { ArrowRight } from "lucide-react";

const steps = [
  "Buyer commits",
  "Buyer pays",
  "Seller ships",
  "Delivery confirmed",
  "Seller paid",
];

export function FulfilmentRoundtrip() {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
          North Star Metric
        </h3>
        <p className="text-foreground font-medium">
          Percentage of orders delivered within 14 days of auction end
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {steps.map((step, i) => (
          <span key={step} className="flex items-center gap-2 md:gap-4">
            <span className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground">
              {step}
            </span>
            {i < steps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FulfilmentOgsm() {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 border-b md:border-b-0 md:border-r border-border bg-muted/20">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Objective
          </h3>
          <p className="text-foreground text-sm">
            Make the fulfilment journey so delightful and memorable that people
            come back more often and spread the word.
          </p>
        </div>
        <div className="p-6 border-b md:border-b-0 border-border bg-muted/20">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Goals (2022)
          </h3>
          <ul className="text-foreground text-sm space-y-1">
            <li>Speed: 90% orders within 14 days (from 83.6%)</li>
            <li>Ease of Use: 8% cancellations (from 8.9%)</li>
            <li>Peace of Mind: 0.095 CX questions/LiA (from 0.109)</li>
            <li>Retention: New shared metric</li>
          </ul>
        </div>
        <div className="p-6 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Strategies
          </h3>
          <ul className="text-foreground text-sm space-y-1">
            <li>Reduce shipping, handling, admin effort for sellers</li>
            <li>Better tracking for buyers and sellers</li>
            <li>Smooth buyer payments</li>
            <li>End journey on a positive note</li>
            <li>Fair and transparent landed costs</li>
          </ul>
        </div>
        <div className="p-6 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Measures
          </h3>
          <p className="text-foreground text-sm">
            15+ KPIs tied to each strategy, including valid tracking rate, time
            to pay, CX questions per LiA
          </p>
        </div>
      </div>
    </div>
  );
}

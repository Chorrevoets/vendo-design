export function OgsmSnapshot() {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 border-b md:border-b-0 md:border-r border-border bg-muted/20">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Objective
          </h3>
          <p className="text-foreground font-medium">
            Fulfilment as a growth driver
          </p>
        </div>
        <div className="p-6 border-b md:border-b-0 border-border bg-muted/20">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Goals
          </h3>
          <p className="text-foreground text-sm">
            Speed, Ease of Use, Peace of Mind, Joy/Delight
          </p>
        </div>
        <div className="p-6 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Strategies
          </h3>
          <p className="text-foreground text-sm">
            Payments orchestration, integrated shipping, transparency
          </p>
        </div>
        <div className="p-6 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Measures
          </h3>
          <p className="text-foreground text-sm">
            CES, NPS, payout speed, delivery reliability
          </p>
        </div>
      </div>
    </div>
  );
}

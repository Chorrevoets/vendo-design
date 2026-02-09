const LABELS = [
  "What changed in user behaviour",
  "What changed in team behaviour",
  "What changed in leadership confidence",
] as const;

type OutcomeSignalsProps = {
  items: [string, string, string];
};

export function OutcomeSignals({ items }: OutcomeSignalsProps) {
  return (
    <ul className="space-y-4">
      {items.map((text, i) => (
        <li key={i} className="flex flex-col sm:flex-row sm:gap-4 gap-1">
          <span className="text-sm font-medium text-foreground shrink-0 sm:w-48">
            {LABELS[i]}
          </span>
          <span className="text-sm text-muted-foreground">{text}</span>
        </li>
      ))}
    </ul>
  );
}

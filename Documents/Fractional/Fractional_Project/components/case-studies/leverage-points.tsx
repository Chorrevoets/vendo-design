import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HEADINGS = [
  "The decision that changed direction",
  "The trade-off we made",
  "The mechanism that made it stick",
] as const;

export type LeveragePoint = {
  statement: string;
  explanation: string;
  whyMattered?: string;
};

type LeveragePointsProps = {
  items: [LeveragePoint, LeveragePoint, LeveragePoint];
};

export function LeveragePoints({ items }: LeveragePointsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <Card key={i} className="py-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {HEADINGS[i]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <p className="text-foreground font-medium">{item.statement}</p>
            <p className="text-sm text-muted-foreground">{item.explanation}</p>
            {item.whyMattered && (
              <p className="text-xs text-muted-foreground italic">
                Why this mattered: {item.whyMattered}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { cn } from "@/lib/utils";

type GridCellProps = {
  label: string;
  selected?: boolean;
  className?: string;
};

function GridCell({ label, selected, className }: GridCellProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center p-4 md:p-6 text-center border border-border rounded-lg text-sm font-medium transition-colors",
        selected
          ? "bg-accent/10 border-accent/30 text-foreground"
          : "bg-muted/30 text-muted-foreground",
        className
      )}
    >
      {label}
    </div>
  );
}

export function GrowthOptionsGrid() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[auto_1fr_1fr] gap-3 items-center max-w-md">
        <div />
        <div className="text-xs text-muted-foreground font-medium text-center">
          Current markets
        </div>
        <div className="text-xs text-muted-foreground font-medium text-center">
          New markets
        </div>
        <div className="text-xs text-muted-foreground font-medium">
          Current product
        </div>
        <GridCell label="Chosen path" selected />
        <GridCell label="" />
        <div className="text-xs text-muted-foreground font-medium">
          New product
        </div>
        <GridCell label="" />
        <GridCell label="" />
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        Narrow focus, embed deeply, prove outcomes, then scale.
      </p>
    </div>
  );
}

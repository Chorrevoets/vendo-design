const principles = [
  {
    title: "Clarity first",
    description: "Most teams do not need more output. They need better decisions. I focus early on value drivers, constraints, and alignment."
  },
  {
    title: "Bounded autonomy",
    description: "Teams move fastest when they are clear on the goal, the guardrails, and what \"good\" means."
  },
  {
    title: "Evidence over opinion",
    description: "I bias toward measurable outcomes, experimentation, and learning loops that compound."
  },
  {
    title: "Build capability, then step out",
    description: "The goal is to leave behind a stronger product system, not dependency on an individual."
  },
];

export function Approach() {
  return (
    <section id="approach" className="px-6 md:px-12 lg:px-24 py-20 border-t border-border bg-background">
      <div className="max-w-4xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">
          Approach
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((principle, index) => (
            <div key={principle.title} className="flex items-start gap-4">
              <span className="text-sm text-accent font-mono mt-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h3 className="text-foreground font-medium mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const capabilities = [
  "Marketplaces & platform foundations",
  "Payments, fraud, identity, trust & safety",
  "Product org design & coaching",
  "AI product strategy & agentic workflows",
  "Experimentation & value-driver analysis",
  "Behavioural Design & Behaviour Change",
  "Growth Loops & Product-Led Growth",
];

export function Capabilities() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-20 border-t border-border bg-background">
      <div className="max-w-4xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">
          Capabilities
        </h2>
        <div className="flex flex-wrap gap-3">
          {capabilities.map((cap) => (
            <span
              key={cap}
              className="px-4 py-2 text-sm text-foreground bg-secondary border border-border"
            >
              {cap}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const models = [
  {
    title: "Strategy Sprint",
    duration: "2–4 weeks",
    description: "Senior reset of direction, priorities, and value drivers.",
  },
  {
    title: "Fractional Leadership",
    duration: "1–3 days/week",
    description: "Embedded product leadership without full-time overhead.",
  },
  {
    title: "Interim Product Lead",
    duration: "time-boxed",
    description: "Start–stop leadership during transitions or hiring gaps.",
  },
];

export function EngagementModels() {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-20 border-t border-border bg-card">
      <div className="max-w-6xl">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-16">
          Engagement Models
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {models.map((model) => (
            <div key={model.title} className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground">
                  {model.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {model.duration}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

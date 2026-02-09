import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LeveragePoints } from "@/components/case-studies/leverage-points";
import { OutcomeSignals } from "@/components/case-studies/outcome-signals";
import { SavingsLoopDiagram } from "@/components/case-studies/savings-loop-diagram";
import { Timeline } from "@/components/case-studies/timeline";

export const metadata = {
  title: "From Insight to Habit | Yolt Product Pivot | ProductClarity",
  description:
    "Product strategy lead for Yolt's pivot from Open Banking aggregator to habit-forming savings platform. Jobs-to-Be-Done, behavioural design, and product-market fit during COVID-19.",
};

export default function FromInsightToHabitPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <Link
          href="/case-studies"
          className="mb-8 inline-flex items-center text-sm font-medium text-accent hover:underline transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4 transition-transform" />
          Back to Case Studies
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="w-2 h-2 rounded-full bg-accent mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            From Insight to Habit
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Repositioning a struggling PFM app into a habit-forming savings
            platform while managing a product pivot during COVID-19 lockdowns.
          </p>
          <div className="rounded-xl border border-border bg-muted/20 p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block">Timeline</span>
                <span className="font-medium text-foreground">
                  Q4 2019 to Q4 2020
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Role</span>
                <span className="font-medium text-foreground">
                  Product Strategy Lead
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Market</span>
                <span className="font-medium text-foreground">
                  UK, France, Italy
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Users</span>
                <span className="font-medium text-foreground">1M+</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Outcome focus: repeat engagement, retention loops, behavioural
            activation
          </p>
        </div>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          {/* The Challenge */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The challenge
            </h2>
            <div className="space-y-4">
              <p>
                Yolt had reached 1M users but faced existential challenges. The
                business model was not working. Open Banking connections were
                unstable 15 months post-launch. The product was entirely
                dependent on third parties. There was no owned core. The
                marketplace model was not driving sustainable revenue.
              </p>
              <p>
                The company decided to pivot from aggregator to smart money
                platform in Q4 2019. Then COVID-19 hit during the Q1 2020
                validation phase. Consumer spending behaviour changed
                dramatically overnight. Groceries up, travel down, deliveries
                up. The pivot had to adapt within the pivot.
              </p>
            </div>
          </section>

          {/* The Opportunity */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The opportunity
            </h2>
            <div className="space-y-4">
              <p>
                I identified an underserved segment: the Stretched user. People
                within plus or minus 5% of net neutral cashflow each month. 12M
                in France, 10M in Italy, similar proportions in the UK. Young
                adults and young families. Lacking a savings buffer. Wanting
                financial security but unsure how to achieve it.
              </p>
              <p>
                The pattern was clear. 82% think it is important to save for a
                rainy day. Only 32% have a 3-month buffer. Users said: "I know I
                should save. I know how to save. I just cannot save." This was a
                behaviour change problem, not an information problem. A gap
                between intention and habit.
              </p>
            </div>
          </section>

          {/* The Approach */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              The approach
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  1. Jobs-to-Be-Done framework
                </h3>
                <p>
                  I defined three core jobs: Manage Money, Free Up Money, Reach
                  Big Money Goals. The focus was progress toward goals with less
                  anxiety. Not budgeting. Not tracking. The JTBD lens anchored
                  product decisions and prioritisation.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2. Behavioural science application
                </h3>
                <p>
                  I built habit loops at multiple frequencies. Daily, weekly,
                  monthly, yearly. Small wins, frequent rewards. Lowering
                  effort, increasing motivation, providing timely triggers. The
                  Aha Moment: first meaningful savings success within the first
                  month.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  3. Product strategy shift
                </h3>
                <p>
                  From aggregation-only to owned account plus card for primary
                  relationship. The Yolt account and debit card created
                  ownership. Users could split money into variable spending
                  (Yolt) and fixed expenses (connected accounts). No longer
                  passive aggregation.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  4. Activation design
                </h3>
                <p>
                  Weekly challenges as the core engagement mechanism. Money Jars
                  with boosters: round-ups, cashbacks, windfalls. The product
                  was designed for activation, not just insight.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  5. Real-time adaptation
                </h3>
                <p>
                  I monitored and responded to COVID spending pattern changes.
                  Behaviour can change. Jobs To Be Done remain stable. That
                  principle held. The product had to adapt to new contexts while
                  staying true to the core jobs.
                </p>
              </div>
            </div>
          </section>

          {/* The Solution */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The solution: Yolt 2.0
            </h2>
            <div className="space-y-4">
              <p>
                A habit-forming savings platform. Yolt account and debit card for
                variable daily expenses. Weekly challenges to build saving
                habits. Money Jar concept with multiple boosters. Personalised
                recommendations based on user behaviour and goals. The North
                Star: consistent progress toward user-defined savings goals.
              </p>
              <SavingsLoopDiagram />
            </div>
          </section>

          {/* The Execution */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              The execution
            </h2>
            <p className="mb-6">
              Six months from beta to full launch, despite pandemic disruption.
            </p>
            <Timeline
              items={[
                { period: "Q4 2019", label: "Pivot decision made" },
                { period: "Q1 2020", label: "Concept validation (COVID onset)" },
                { period: "Q2 2020", label: "Built MUP (Minimum Usable Product)" },
                { period: "July 2020", label: "Friends and Family testing (50 users)" },
                { period: "Aug 2020", label: "Closed beta (500 users)" },
                { period: "Sept 2020", label: "iOS launch" },
                { period: "Oct 2020", label: "Android launch" },
                { period: "Nov 2020", label: "France rollout" },
              ]}
            />
          </section>

          {/* External validation */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              External validation
            </h2>
            <div className="space-y-6">
              <p>
                This shift in thinking and tone was reflected externally,
                including how the product was talked about and experienced.
              </p>
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/30">
                <iframe
                  src="https://player.vimeo.com/video/496845765?title=0&byline=0&portrait=0"
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Product and brand repositioning"
                />
              </div>
              <div className="rounded-xl border border-border bg-muted/20 p-6">
                <blockquote className="text-foreground italic mb-4">
                  "Unleashing the lizard brain within to outsmart dubious money
                  decisions."
                </blockquote>
                <a
                  href="https://lbbonline.com/news/yolt-financial-app-unleashes-the-lizard-brain-within-to-outsmart-dubious-money-decisions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:underline"
                >
                  LBB Online
                </a>
              </div>
            </div>
          </section>

          {/* Key insights / What did not work */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Key insights
            </h2>
            <div className="space-y-4">
              <p>
                Behaviour can change, but Jobs To Be Done remain stable. COVID
                validated this. Spending patterns shifted. Travel collapsed.
                Groceries and deliveries surged. The core jobs did not. Users
                still wanted to manage money, free up money, and reach big
                goals. The product had to adapt to new contexts while staying
                true to that frame.
              </p>
              <p>
                Pivoting during a pandemic required clarity on what was fixed
                and what was flexible. The JTBD framework gave that. Features
                and flows could change. The jobs did not.
              </p>
            </div>
          </section>

          {/* The Impact */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The impact
            </h2>
            <div className="space-y-4">
              <p>
                Transformed retention from feature engagement to customer
                success metrics. Established a repeatable framework for
                product-market fit validation. Created primary relationship
                ownership versus passive aggregation. A product that people
                returned to, not just checked once.
              </p>
            </div>
          </section>

          {/* My leverage points */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              My leverage points
            </h2>
            <LeveragePoints
              items={[
                {
                  statement:
                    "I stopped optimising the dashboard and instead optimised the first month experience around small goal wins.",
                  explanation:
                    "The dashboard was useful but not sticky. The first month determined whether people came back. I shifted effort to onboarding, goal-setting, and early wins.",
                  whyMattered:
                    "First meaningful savings success became the Aha Moment we could design for.",
                },
                {
                  statement:
                    "I chose fewer initiatives with clearer behavioural signal, rather than more features with unclear value.",
                  explanation:
                    "The roadmap had many ideas. I cut to the ones that showed up in habit loops and retention curves.",
                  whyMattered:
                    "Focus allowed the team to move fast and learn from real behaviour.",
                },
                {
                  statement:
                    "I defined a North Star that all teams could influence, and used it to prioritise experiments.",
                  explanation:
                    "Consistent progress toward savings goals. Product, design, and marketing could all point to it. Experiments were judged by whether they moved that needle.",
                  whyMattered:
                    "One metric created alignment and reduced parallel work.",
                },
              ]}
            />
          </section>

          {/* Outcome signals */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Outcome signals
            </h2>
            <OutcomeSignals
              items={[
                "People returned to the app for progress, not just to check balances. Daily and weekly rhythms strengthened.",
                "Product, design, and marketing spoke the same language and aligned on outcomes. Experiments were judged by behavioural signal.",
                "Leadership had confidence that the product could drive retention, not just adoption.",
              ]}
            />
          </section>

          {/* Takeaways */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Takeaways
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Strategic product leadership during crisis and uncertainty</li>
              <li>Behavioural science application at scale in fintech</li>
              <li>Rapid execution with validated learning: 6 months from beta to full launch</li>
            </ul>
          </section>

          {/* CTA */}
          <section className="pt-8 border-t border-border">
            <p className="text-foreground mb-2">
              Similar challenge? Let's talk.
            </p>
            <Link
              href="/#contact"
              className="text-sm font-medium text-accent hover:underline"
            >
              Get in touch
            </Link>
          </section>

          {/* Footer note */}
          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              This case has been lightly anonymised and adapted for publication.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
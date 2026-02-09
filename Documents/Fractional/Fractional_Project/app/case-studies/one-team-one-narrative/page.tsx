import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FulfilmentOgsm } from "@/components/case-studies/fulfilment-ogsm";
import { FulfilmentRoundtrip } from "@/components/case-studies/fulfilment-roundtrip";

export const metadata = {
  title:
    "When Everyone's Pointing Fingers, Nobody's Shipping | ProductClarity",
  description:
    "How to rescue a failing vertical when three teams hate each other and customers hate you more. Vertical transformation, team alignment at scale, strategic planning frameworks.",
};

export default function OneTeamOneNarrativePage() {
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
            When Everyone's Pointing Fingers, Nobody's Shipping
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            How to rescue a failing vertical when three teams hate each other
            and customers hate you more
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Picture this: 61% of customer complaints land on one vertical. Three
            teams that barely speak to each other. A #1 NPS detractor that has
            been haemorrhaging trust for years. Most leaders would call it a
            turnaround project. I call it Tuesday. Here is the playbook I used
            to transform a €640M marketplace's fulfilment operation from
            liability into competitive weapon, and why the same approach works
            whether you are Series A or IPO-bound.
          </p>
          <div className="rounded-xl border border-border bg-muted/20 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block">Role</span>
                <span className="font-medium text-foreground">
                  Group Product Manager, Fulfilment Vertical
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Timeline</span>
                <span className="font-medium text-foreground">
                  Q1 2021 to 2022+
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Markets</span>
                <span className="font-medium text-foreground">
                  UK, France, Italy, Germany, Spain, Netherlands, Belgium
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Team</span>
                <span className="font-medium text-foreground">
                  3 teams, 20+ engineers
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          {/* Section 1: The Problem Isn't What You Think It Is */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The problem is not what you think it is
            </h2>
            <p className="mb-4">
              Most product leaders inherit broken things. The metrics are bad.
              The tech is old. The team is underwater. That is table stakes.
            </p>
            <p className="mb-4">
              The real problem is nobody believes it can get better.
            </p>
            <p className="mb-4">
              When I walked into this European marketplace's Fulfilment
              vertical, the numbers told one story: 61% of CX tickets were
              fulfilment-related. Shipping had been the #1 NPS detractor for
              years. Customer Effort Score for shipping: 50% (anything below 70%
              is failing). Three separate teams, three separate roadmaps, zero
              shared vision.
            </p>
            <p className="mb-4">
              But the numbers were not the problem. The problem was what the
              teams had internalised:
            </p>
            <div className="rounded-xl border border-border bg-muted/20 p-6 mb-4">
              <p className="text-foreground italic mb-2">
                "We just do compliance work."
              </p>
              <p className="text-foreground italic mb-2">
                "We keep the lights on."
              </p>
              <p className="text-foreground italic">
                "Strategy is for other people."
              </p>
            </div>
            <p>
              You cannot fix a vertical that is convinced it exists to be yelled
              at.
            </p>
          </section>

          {/* Section 2: The Real Diagnosis */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The real diagnosis
            </h2>
            <p className="mb-4">
              Here is what dying verticals have in common: they have lost the
              plot. Not because people are bad at their jobs. Because when you
              are drowning, you stop asking why are we in the water?
            </p>
            <p className="mb-4">
              I spent the first month doing something most turnaround PMs skip: I
              figured out what game we were actually playing.
            </p>
            <p className="mb-4">
              The data said: "Shipping is slow, payments are confusing, tracking
              is broken." The research said something else entirely:
            </p>
            <div className="rounded-xl border border-border bg-accent/5 p-6 mb-6">
              <p className="text-foreground font-medium">
                People judge experiences by the peak and the end.
              </p>
            </div>
            <p className="mb-4">
              In our case: Peak = "I won the auction!" (Good). End = "Where is
              my item? Why these extra fees? How long is this taking?"
              (Catastrophically bad). We were nailing the moment that did not
              matter and bombing the moment that defined us.
            </p>
            <p className="mb-4">
              The insight: We did not need to fix shipping. We needed to own the
              peak-end. That single reframe changed everything.
            </p>
            <FulfilmentRoundtrip />
          </section>

          {/* Section 3: The Framework */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The framework (or: how to get everyone rowing in the same
              direction)
            </h2>
            <p className="mb-6">
              You cannot unite teams with a roadmap. Roadmaps are just lists
              with dates. You unite teams with a shared enemy and a common dream.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  The enemy: detractors
                </h3>
                <div className="rounded-xl border border-border bg-muted/20 p-6 mb-4">
                  <blockquote className="text-foreground italic">
                    "Frankly, at the moment, we create detractors."
                  </blockquote>
                  <p className="text-sm text-muted-foreground mt-2">
                    From our strategy deck
                  </p>
                </div>
                <p>
                  Nobody wants to be the team customers hate. Once we named it,
                  we could fight it.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  The dream: the BHAG
                </h3>
                <div className="rounded-xl border border-border bg-muted/30 p-6 mb-4">
                  <blockquote className="font-serif text-lg text-foreground italic">
                    Same-day shipping and instant payout. Getting the object to
                    the buyer, and if needed returning it safely to the seller,
                    before this week is out.
                  </blockquote>
                </div>
                <p className="mb-2">
                  Is this realistic? No. Will we get there? Probably not. Does
                  it clarify what "good" looks like? Absolutely.
                </p>
                <p>
                  Every team needs a North Star that is unreachable but
                  directional. "We shoot for the stars and clear the fence."
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  The alignment tool: OGSM
                </h3>
                <p className="mb-4">
                  Here is the dirty secret about OKRs: they do not work when
                  teams are siloed. I introduced OGSM instead (Objectives,
                  Goals, Strategies, Measures):
                </p>
                <FulfilmentOgsm />
                <p className="mt-4">
                  Suddenly, Payments, Logistics, and FinTech were not three
                  teams. They were one vertical with a shared scorecard.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: The Execution */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The execution (or: how to ship when everything is on fire)
            </h2>
            <p className="mb-6">
              Most case studies gloss over this part. "We executed the plan."
              Cool story. Here is what really happens when you are trying to
              transform a vertical: you are doing four impossible things in
              parallel, and two of them have immovable deadlines.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  1. Integrated Shipping Services (ISS)
                </h3>
                <p className="mb-2">
                  The flagship bet. Goal: turn the #1 detractor into a
                  competitive advantage. Timeline: beta in March, public rollout
                  June.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2. Landed Cost Transparency
                </h3>
                <p className="mb-2">
                  The trust builder. Goal: show buyers total cost (shipping,
                  customs, VAT) upfront. Blocker: requires Tax Determination
                  Service integration.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  3. Checkout overhaul and payment methods
                </h3>
                <p className="mb-2">
                  The conversion driver. Goal: stop losing 9% of first-time
                  buyers at checkout. Complexity: SEPA takes 2.5 days, cards
                  take 5 seconds. Guess which one dominates Germany?
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  4. UK/EU VAT compliance
                </h3>
                <p className="mb-2">
                  The non-negotiable. Deadline: January 1 (UK), July 1 (EU), or
                  we leak €150K per month.
                </p>
              </div>
            </div>
            <p className="mb-4">
              Oh, and also: migrate three teams off a legacy platform that
              should have been sunset two years ago.
            </p>
            <div className="rounded-xl border border-border bg-muted/20 p-6">
              <h4 className="font-semibold text-foreground mb-2">
                The crisis moment
              </h4>
              <p className="mb-2">
                March 11, 2022. Two days before ISS beta launch. The money flows
                requirements for ISS suddenly became clear, and they were way more
                complex than anyone thought. Confidence level: 1/5 on invoices,
                2/5 on payment flows.
              </p>
              <p className="mb-2">
                We had a choice: delay the beta (lose 3 months of momentum) or
                rally the entire vertical. We chose rally. Payments, FinTech,
                and Logistics worked around the clock. By March 18, we were
                green.
              </p>
              <p className="text-sm italic">
                Learning: big launches fail when requirements are discovered
                late. Small, incremental go-lives with obsessive documentation
                prevent this. We still shipped the beta on March 14.
              </p>
            </div>
          </section>

          {/* Section 5: The Team Transformation */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The team transformation (the part nobody talks about)
            </h2>
            <p className="mb-4">
              Here is what most leaders miss: culture eats strategy for
              breakfast, and demoralised teams eat both. When I started, these
              teams were not just siloed. They had given up.
            </p>
            <p className="mb-4">
              "We cannot do strategic work, we just keep the lights on." Six
              months later, they were running tiger teams, crushing VAT pivots
              in weeks, and stepping across team boundaries without asking
              permission.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  1. We made "one team vertical" real
                </h3>
                <p>
                  Not a slogan. A practice. Bi-monthly deep dives replaced annual
                  planning theatre. Rolling 12-month roadmaps updated every 2
                  months. Shared metrics dashboards everyone could see. Tiger
                  teams for critical work (cross-functional by default). When ISS
                  money flows hit the wall, Payments, FinTech, and Logistics
                  rallied like it was one team's problem. Because it was.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2. We proved quick wins were possible
                </h3>
                <p>
                  The UK/EU VAT pivots showed what focus could do: faster
                  shipping (weeks vs months), lower switching costs, more
                  rewarding work. Once they felt it, they wanted more.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  3. We made data everyone's job
                </h3>
                <p>
                  Built Value Driver Trees linking initiatives to metrics to
                  P&L. No more "build it and hope." Every idea got rapid impact
                  assessment. Teams learned to think in bets.
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/20 p-6 mt-6">
              <blockquote className="text-foreground italic">
                "We are evolving to a one-team-vertical. Our ways of working
                are maturing. People and teams are helping each other out. The
                transition from legacy platform and internal focus to growth
                mindset and customer focus is going well."
              </blockquote>
              <p className="text-sm text-muted-foreground mt-2">
                Translation: they stopped being order-takers and became owners.
              </p>
            </div>
          </section>

          {/* Section 6: What Did Not Work */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              What did not work (the part that makes this credible)
            </h2>
            <p className="mb-6">
              If I tell you everything went perfectly, you know I am lying. Here
              is what broke:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  1. The 8-month payment provider standoff
                </h3>
                <p>
                  Major digital wallet integration blocked for 8 months due to
                  compliance and commercial alignment issues. Impact: €400 to
                  800K opportunity on hold, Germany expansion delayed. Learning:
                  external dependencies need C-level air cover, not PM
                  persistence.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2. The focus problem
                </h3>
                <p>
                  "Importance of Focus remains. We are facing roadmap delays due
                  to too many parallel initiatives." We shipped too much in
                  parallel. Teams burned out. Quality suffered. Solution: hard
                  rule in Q2 2022. Finish before starting.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  3. The ISS money flows discovery
                </h3>
                <p>
                  Requirements surfaced two weeks before launch. Impact: 3-week
                  roadmap disruption, near-miss on beta delay. Learning:
                  structured requirements discovery beats hoping for the best.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  4. The annual planning trap
                </h3>
                <p>
                  Q4 planning theatre killed focus and momentum. Solution: ditched
                  annual planning. Moved to continuous 2-month cycles with
                  12-month outlook.
                </p>
              </div>
            </div>
            <p className="mt-4">
              Most leaders pretend failures did not happen. I think they are the
              most valuable part.
            </p>
          </section>

          {/* Section 7: The Numbers */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The numbers (because vibes do not pay salaries)
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Fulfilment metrics
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Orders delivered under 14 days: 83.6% to targeting 90%</li>
                  <li>Valid tracking: 88% to 92% (targeting 95%)</li>
                  <li>CX questions per LiA: 0.109 to 0.099 (targeting 0.095)</li>
                  <li>Cancellations: 8.9% to targeting 8%</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Checkout and payments
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Paid within 2 days: 77% to 85% (recurring buyers)</li>
                  <li>Pay rate: 96% (targeting 97% for new buyers, up from 83%)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Financial impact
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>ISS: €310K (NL) plus €600K (market expansion)</li>
                  <li>Landed Cost Transparency: €370K</li>
                  <li>Checkout optimisation: €730K</li>
                  <li>Payment methods: €170K plus €50 to 100K</li>
                  <li>
                    <strong className="text-foreground">
                      Total: €2M+ EBITDA impact
                    </strong>{" "}
                    from growth initiatives
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Compliance
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>UK VAT: delivered on deadline, stopped £10 to 20K per month leak</li>
                  <li>EU VAT: delivered on deadline, prevented €150K per month leak</li>
                  <li>Financial reconciliation: achieved 99.99% matching</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Organisational
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>OGSM framework adopted across the company (still in use)</li>
                  <li>"One team vertical" model became template for other teams</li>
                  <li>Peak-End thinking influenced broader product strategy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8: Why This Matters to You */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Why this matters to you
            </h2>
            <p className="mb-4">
              Here is the thing about turnarounds: the tactics change. The
              principles do not. Whether you are a Series A startup with
              product-market fit questions or a scale-up with organisational
              debt, the pattern is the same:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-2 mb-4">
              <li>
                Diagnose the real problem (hint: it is never just "the metrics
                are bad")
              </li>
              <li>
                Unite around a shared enemy and dream (OGSM is one way, not the
                only way)
              </li>
              <li>
                Prove quick wins to rebuild belief (demoralised teams need
                momentum)
              </li>
              <li>
                Execute in parallel without losing focus (hard rule: finish
                before starting)
              </li>
              <li>
                Transform culture through practice, not slogans (tiger teams beat
                all-hands speeches)
              </li>
            </ol>
            <p>
              The specifics were mine: ISS, VAT, Peak-End Rule, OGSM. The
              approach is yours to adapt.
            </p>
          </section>

          {/* Section 9: The Real Takeaway */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The real takeaway
            </h2>
            <p className="mb-4">
              Most product leaders optimise what is working. The interesting
              work is rescuing what is broken when nobody believes it can be
              fixed. That requires strategic clarity (what game are we playing?),
              organisational design (how do we move as one?), execution
              discipline (ship despite chaos), and cultural transformation
              (belief is a bottleneck).
            </p>
            <p className="mb-4">
              I did not save this vertical by being smarter than everyone else.
              I did it by naming the real problem (we create detractors), giving
              teams a dream (shoot for the stars, clear the fence), building the
              scaffolding (OGSM, Value Drivers, continuous planning), and getting
              out of their way (they did the actual work).
            </p>
            <div className="rounded-xl border border-border bg-accent/5 p-6">
              <p className="text-foreground font-medium">
                The teams went from "we just keep the lights on" to shipping the
                most strategic work the company had seen in years. Not because I
                fixed them. Because I helped them remember they were not
                broken.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Facing a vertical that everyone has given up on?
            </h3>
            <p className="mb-4">
              Three teams that will not talk to each other. Metrics trending the
              wrong way for years. A roadmap that is mostly compliance and
              firefighting. Sound familiar?
            </p>
            <p className="mb-4 text-foreground">
              This is fixable. But not with a new roadmap.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center text-sm font-medium text-accent hover:underline"
            >
              Get in touch
            </Link>
          </section>

          {/* Related */}
          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              Related:{" "}
              <Link
                href="/case-studies/from-insight-to-habit"
                className="text-accent hover:underline"
              >
                From Insight to Habit
              </Link>{" "}
              (similar team transformation and behavioural design theme)
            </p>
          </section>

          {/* Footer */}
          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              This case has been lightly anonymised and adapted for
              publication.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
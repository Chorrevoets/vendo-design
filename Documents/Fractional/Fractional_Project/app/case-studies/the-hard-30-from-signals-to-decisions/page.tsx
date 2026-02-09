import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "The Hard 30%: From Signals to Decisions | Case Study | ProductClarity",
  description:
    "How to design data-driven care platforms that deliver trustworthy decisions, reduce cognitive load, and work in regulated, care-critical environments.",
};

function CaseStudyImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="mt-8 space-y-2">
      <div className="relative w-full overflow-hidden rounded-lg border border-border">
        <Image
          src={src}
          alt={alt}
          width={896}
          height={504}
          className="w-full h-auto object-contain"
        />
      </div>
      <figcaption className="text-sm text-muted-foreground italic">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function TheHard30FromSignalsToDecisionsPage() {
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
            The Hard 30%: From Signals to Decisions
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Building high-integrity decision support in care-critical, regulated
            environments
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">Category:</span> Case
              Study
            </span>
            <span>
              <span className="font-medium text-foreground">Theme:</span>{" "}
              Regulated Products / Healthcare / Decision Support
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Outcome focus: trustworthy decisions, reduced cognitive load,
            compliance by design
          </p>
        </div>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          {/* Introduction */}
          <section>
            <div className="space-y-4">
              <p>
                This is about the hard 30% of product delivery. Care-critical
                systems demand trust, not dashboards. Regulation, human
                judgement, and delivery discipline intersect here.
              </p>
              <CaseStudyImage
                src="/From Data to Confident Care Decisions.png"
                alt="From data and signals to confident care decisions"
                caption={`"The goal isn't more data. It's better decisions, made with confidence."`}
              />
              <p>
                Most product work lives in the comfortable 70%—features, flows,
                nice-to-haves. The hard 30% is where lives and livelihoods depend
                on decisions made with your product. Where compliance isn't a
                checkbox but a precondition. Where the goal isn't more data but
                confident action.
              </p>
              <p>
                This case is anonymised and imaginary, inspired by real challenges
                in care-critical, regulated product environments. The patterns
                are real. The specifics are composite.
              </p>
            </div>
          </section>

          {/* Start with the Outcome, Not the Output */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Start with the Outcome, Not the Output
            </h2>
            <div className="space-y-4">
              <p>
                Outcomes over features. Decision confidence over data volume.
                Usage metrics are insufficient in care-critical systems—a
                clinician who logs in daily but hesitates to act on a
                recommendation hasn't been served. The product failed even if the
                dashboard looked busy.
              </p>
              <p>
                The North Star for this domain is not "daily active users" or
                "features adopted." It is:
              </p>
              <blockquote className="border-l-4 border-accent pl-4 py-2 my-4 text-foreground font-medium italic">
                Confident, timely care decisions that improve resident outcomes
                without increasing staff burden.
              </blockquote>
              <CaseStudyImage
                src="/North Star Metric Funnel.png"
                alt="North Star metric funnel from data to decisions"
                caption='"In care-critical systems, outcomes beat outputs every time."'
              />
              <p>
                Everything else—dashboards, alerts, reports—ladders up to that.
                If it doesn't increase decision confidence or reduce burden, it's
                noise.
              </p>
            </div>
          </section>

          {/* Mapping the Value Landscape */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Mapping the Value Landscape
            </h2>
            <div className="space-y-4">
              <p>
                The Opportunity Solution Tree puts the North Star at the top.
                Beneath it sit opportunity areas: hydration, medication timing,
                early deterioration signals, cognitive load, compliance. Solutions
                are intentionally de-emphasised. The map is about where value
                lives, not what to build first.
              </p>
              <p>
                In regulated environments, opportunity mapping matters more than
                solution ideation. You need to know which problems are worth
                solving before you commit to a solution that will require audits,
                validation, and human-in-the-loop design. Jump to solutions too
                early and you burn cycles on the wrong thing.
              </p>
            </div>
            <CaseStudyImage
              src="/Opportunity Solution Tree for Care Decisions.png"
              alt="Opportunity Solution Tree for care decisions"
              caption="North Star at the top. Opportunity areas beneath. Solutions de-emphasised."
            />
          </section>

          {/* The Job to Be Done (JTBD) */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The Job to Be Done (JTBD)
            </h2>
            <div className="space-y-4">
              <p>
                Frame this as a socio-technical system, not a single "user." The
                primary job is: make care decisions that improve outcomes while
                staying within regulatory and workflow constraints.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <span className="font-medium text-foreground">Primary job:</span>{" "}
                  Support confident, timely care decisions that improve resident
                  outcomes
                </li>
                <li>
                  <span className="font-medium text-foreground">Beneficiary:</span>{" "}
                  The resident receiving care
                </li>
                <li>
                  <span className="font-medium text-foreground">Actor:</span> Care
                  staff and clinicians who notice, decide, and act
                </li>
                <li>
                  <span className="font-medium text-foreground">Decision maker:</span>{" "}
                  Clinician or care lead who validates and owns the decision
                </li>
                <li>
                  <span className="font-medium text-foreground">Accountable
                  party:</span> Provider organisation carrying regulatory and
                  outcome responsibility
                </li>
              </ul>
              <CaseStudyImage
                src="/JTBD Stakeholder Map.png"
                alt="JTBD stakeholder map for care decisions"
                caption='"One job. Multiple humans. All must be served."'
              />
              <p>
                The product serves the actor and the decision maker. The
                beneficiary's outcome is the measure of success. The accountable
                party must trust that the system supports, not replaces, human
                judgement.
              </p>
            </div>
          </section>

          {/* Breaking the Decision into Steps */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Breaking the Decision into Steps
            </h2>
            <div className="space-y-4">
              <p>
                The care decision journey has six steps: Notice, Understand,
                Decide, Act, Record, Reflect. Most products overload steps 2 and
                4—they dump data at Understand and push alerts at Decide. The
                result is cognitive overload and alert fatigue.
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>
                  <span className="font-medium text-foreground">Notice:</span>{" "}
                  Something signals attention—a trend, a threshold, a pattern
                </li>
                <li>
                  <span className="font-medium text-foreground">Understand:</span>{" "}
                  Context and rationale, not raw data. What does this mean? Why
                  does it matter?
                </li>
                <li>
                  <span className="font-medium text-foreground">Decide:</span>{" "}
                  Clear options with trade-offs. Framed for action, not
                  ambiguity
                </li>
                <li>
                  <span className="font-medium text-foreground">Act:</span>{" "}
                  Execute the decision within workflow
                </li>
                <li>
                  <span className="font-medium text-foreground">Record:</span>{" "}
                  Documentation for compliance and continuity
                </li>
                <li>
                  <span className="font-medium text-foreground">Reflect:</span>{" "}
                  Learn from outcomes to improve future decisions
                </li>
              </ol>
              <CaseStudyImage
                src="/Care Decision Journey Map.png"
                alt="Care decision journey over time"
                caption='"This is a decision journey, not a UI flow."'
              />
              <p>
                Products that win focus on reducing friction at Understand and
                Decide. They don't add more dashboards. They add clarity.
              </p>
            </div>
          </section>

          {/* The Real Competition */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The Real Competition
            </h2>
            <div className="space-y-4">
              <p>
                The competition isn't other software. It's paper notes, intuition
                and experience, basic alerts, retrospective reports, and
                workarounds outside systems. Clinicians already have ways to make
                decisions. Your product must fit into that reality.
              </p>
              <CaseStudyImage
                src="/Competitive Landscape .png"
                alt="Competitive landscape including manual and digital solutions"
                caption={`"Our real competition isn't other software. It's what already works."`}
              />
              <p>
                Trust and workflow fit beat sophistication. A simple, reliable
                prompt that fits the moment beats a complex dashboard that
                requires interpretation. The bar is high: you're asking people to
                change behaviour in high-stakes environments. They will only do
                that if the product earns trust incrementally.
              </p>
            </div>
          </section>

          {/* Doing It Better (Not Louder) */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Doing It Better (Not Louder)
            </h2>
            <div className="space-y-4">
              <p>
                Win with decision framing over alerts. Context and rationale over
                prediction. Human-in-the-loop by design. Compliance as an input,
                not a gate.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <span className="font-medium text-foreground">Decision framing:</span>{" "}
                  Present options with trade-offs, not just "something changed"
                </li>
                <li>
                  <span className="font-medium text-foreground">Context and
                  rationale:</span> Explain why a recommendation matters, not
                  just what it is
                </li>
                <li>
                  <span className="font-medium text-foreground">Human-in-the-loop:</span>{" "}
                  Every decision is validated by a human. The system supports;
                  it doesn't replace
                </li>
                <li>
                  <span className="font-medium text-foreground">Compliance as
                  input:</span> Build audit trails and documentation into the
                  flow, not as an afterthought
                </li>
              </ul>
              <p>
                Pragmatic and grounded. No AI hype. No "disruption." Just better
                decisions, made with confidence.
              </p>
            </div>
          </section>

          {/* The First Product Increment */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The First Product Increment
            </h2>
            <div className="space-y-4">
              <p>
                Start deliberately narrow. One decision. One workflow. One role.
                One outcome.
              </p>
              <CaseStudyImage
                src="/ First Product Increment Highlight.png"
                alt="First product increment versus full platform vision"
                caption='"Start small. On purpose."'
              />
              <p>
                Example: hydration-related care decisions. A single class of
                decisions with clear inputs (intake, output, trends), a defined
                actor (care staff), a clear decision point (when to escalate,
                when to adjust), and a measurable outcome (resident hydration
                status, incident reduction).
              </p>
              <p>
                Prove the pattern works. Then extend. Scaling from one decision
                to a platform is a feature of disciplined sequencing, not
                big-bang delivery.
              </p>
            </div>
          </section>

          {/* Build – Measure – Learn (in a Regulated Reality) */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Build – Measure – Learn (in a Regulated Reality)
            </h2>
            <div className="space-y-4">
              <p>
                Experimentation works, but it has to be safe. Build: auditable,
                co-designed, compliant. Measure: decision acted on, trust
                signals—not vanity metrics. Learn: where confidence breaks down
                and why.
              </p>
              <CaseStudyImage
                src="/Build-Measure-Learn Loop.png"
                alt="Build measure learn loop adapted for regulated environments"
                caption='"Learning speed without sacrificing safety."'
              />
              <p>
                This is about learning speed without sacrificing safety.
                Hypothesis-driven iteration within guardrails. You're not
                A/B-testing clinical outcomes; you're testing whether the
                decision support lands. Whether clinicians trust it. Whether it
                fits the workflow.
              </p>
            </div>
          </section>

          {/* Why This Works */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Why This Works
            </h2>
            <div className="space-y-4">
              <p>
                This approach respects human judgement. It reduces cognitive load
                by framing decisions, not dumping data. It builds trust
                incrementally, one decision at a time. It scales from one
                decision to a platform because the pattern is repeatable.
              </p>
              <p>
                Care-critical products don't win on features. They win on being
                quietly reliable. On fitting. On earning trust through consistent
                behaviour.
              </p>
            </div>
          </section>

          {/* Closing */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Closing
            </h2>
            <div className="space-y-4">
              <p>
                Care-critical products win by being quietly reliable. The hardest
                work isn't flashy. There are no viral moments, no growth hacks.
                This is where meaningful impact is created—in the decisions that
                get made, the outcomes that improve, and the trust that gets
                earned.
              </p>
            </div>
          </section>

          {/* Footer note */}
          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              This case is anonymised and imaginary, inspired by real
              care-critical, regulated product challenges. Details have been
              adapted for publication.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

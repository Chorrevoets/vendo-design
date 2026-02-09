import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GrowthOptionsGrid } from "@/components/case-studies/growth-options-grid";
import { LeveragePoints } from "@/components/case-studies/leverage-points";
import { OutcomeSignals } from "@/components/case-studies/outcome-signals";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Defining Battlegrounds for Growth | Case Study | ProductClarity",
  description:
    "A one-week strategic product engagement in clinician-guided mental health. Focus on adoption, GTM, and product-market fit.",
};

export default function DefiningBattlegroundsPage() {
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

        {/* A. Hero */}
        <div className="mb-12">
          <div className="w-2 h-2 rounded-full bg-accent mb-4" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Defining Battlegrounds for Growth
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            From proven value that failed to translate into adoption to a clear
            growth strategy and adoption battlegrounds, creating the conditions
            for scalable commercial traction.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span>
              <span className="font-medium text-foreground">Role:</span> Product
              & Growth Strategy
            </span>
            <span>
              <span className="font-medium text-foreground">Format:</span> 1-week
              engagement
            </span>
            <span>
              <span className="font-medium text-foreground">Focus:</span>{" "}
              Adoption, GTM, Product-Market Fit
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Outcome focus: adoption velocity, workflow integration, retention
            leverage
          </p>
        </div>

        <div className="space-y-12 text-muted-foreground leading-relaxed">
          {/* B. Context */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Context
            </h2>
            <div className="space-y-4">
              <p>
                This case reflects a one-week strategic product engagement with
                a clinician-guided mental health technology startup.
              </p>
              <p>
                The engagement combined stakeholder inputs, facilitated
                workshops, qualitative interviews, desk research, and
                synthesis, with the goal of helping the leadership team clarify
                where real product-led growth could come from and what needed to
                change for adoption to scale.
              </p>
              <p>
                The company was approximately 3 to 4 years into
                commercialisation. While early pilots and research-led
                deployments had demonstrated clear clinical and operational
                value, commercial traction had been slow and fragile.
              </p>
              <p>
                At the time, the organisation was entering a period of strategic
                reset under new leadership. The central question was not whether
                the product worked, but why proven value had failed to translate
                into sustained adoption and scalable growth.
              </p>
            </div>
          </section>

          {/* C. The problem underneath the problem */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The problem underneath the problem
            </h2>
            <div className="space-y-4">
              <p>
                Adoption had stalled despite demonstrated value. The product
                worked when embedded in workflows, but failed when optional.
                Clinicians were under time and incentive pressure. Leadership
                mandate and workflow integration determined success. The
                constraint was structural, not feature depth.
              </p>
            </div>
          </section>

          {/* D. My approach */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              My approach
            </h2>
            <div className="space-y-4">
              <p>
                I treated this as a systems and adoption problem, not a feature
                problem. The work focused on incentives, workflows, leadership,
                and GTM conditions. I used product-market fit, Jobs to Be Done,
                and adoption dynamics as lenses. The goal was focus and
                sequencing, not a roadmap. The outcome aimed at making adoption
                inevitable, not persuasive.
              </p>
            </div>
          </section>

          {/* E. Strategic framing (visual) */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Strategic framing
            </h2>
            <p className="mb-6">
              A Growth Options grid to clarify where to focus first:
            </p>
            <GrowthOptionsGrid />
          </section>

          {/* F. Two credible routes to growth */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Two credible routes to growth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    Route 1: Direct-to-patient with clinician back-up
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">
                      Who it serves:
                    </span>{" "}
                    Individuals seeking support, with clinicians available when
                    needed.
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Why it works:
                    </span>{" "}
                    Reduces clinician load while maintaining clinical oversight.
                    Demand is patient-led and can scale independently of
                    organisational adoption.
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      What must be true:
                    </span>{" "}
                    Clear clinical governance, reimbursement pathways, and
                    evidence that self-guided use delivers outcomes.
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    Route 2: Intelligence layer for workplace wellbeing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <span className="font-medium text-foreground">
                      Who it serves:
                    </span>{" "}
                    Employers and HR teams managing workforce mental health.
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      Why it works:
                    </span>{" "}
                    B2B distribution, embedded in existing benefits and EAP
                    ecosystems. Purchase decision sits with leadership, not
                    individual clinicians.
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      What must be true:
                    </span>{" "}
                    Integration with existing vendor stack, measurable outcomes
                    for employers, and a GTM motion that reaches decision-makers.
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* G. Three battlegrounds for growth */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Three battlegrounds for growth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  1. Unlock commercial demand through ecosystems
                </h3>
                <p className="text-sm">
                  Partner with payers, employers, and existing mental health
                  providers to create pull, not push.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Next 90 days: Map and prioritise 2 to 3 ecosystem partners
                  with aligned incentives.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  2. Become indispensable in daily workflows
                </h3>
                <p className="text-sm">
                  Reduce adoption friction so the product is used by default,
                  not by choice.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Next 90 days: Identify and remove the top 3 workflow blockers
                  in pilot sites.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">
                  3. Earn trust through measurable outcomes
                </h3>
                <p className="text-sm">
                  Package evidence that speaks to buyers and clinicians in
                  their language.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Next 90 days: Define and instrument the outcome metrics that
                  matter for GTM.
                </p>
              </div>
            </div>
          </section>

          {/* H. What I would do first */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              What I would do first
            </h2>
            <p className="mb-4">A simple 90-day plan:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Align on focus and success metrics</li>
              <li>Embed and remove adoption friction</li>
              <li>Package GTM motion and proof</li>
            </ol>
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
                    "We stopped asking what features and started asking what conditions make adoption inevitable.",
                  explanation:
                    "The product worked when embedded, failed when optional. The constraint was structural. We shifted the conversation from feature depth to incentives, workflows, and GTM conditions.",
                  whyMattered:
                    "Leadership could see that the problem was not delivery capability.",
                },
                {
                  statement:
                    "We chose focus and sequencing over a comprehensive roadmap.",
                  explanation:
                    "Two credible routes, three battlegrounds. We did not try to solve everything. We gave leadership a clear frame for where to focus first and what to deprioritise.",
                  whyMattered:
                    "A one-week engagement had to leave something usable, not a long list.",
                },
                {
                  statement:
                    "We defined battlegrounds that all stakeholders could influence, and used them to prioritise next steps.",
                  explanation:
                    "Ecosystems, workflows, outcomes. Each battleground had a 90-day action. The leadership team could see how their decisions laddered up.",
                  whyMattered:
                    "Shared language enabled alignment without a long process.",
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
                "Clinicians and buyers had a clearer picture of when and how adoption would succeed. The structural constraints were named.",
                "Leadership aligned on where to focus first. Two routes and three battlegrounds gave a shared frame for decisions.",
                "Leadership had confidence in the growth path and what needed to change, beyond feature requests.",
              ]}
            />
          </section>

          {/* I. Footer note */}
          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              This case is anonymised and shared with permission. Details have
              been adapted for publication.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

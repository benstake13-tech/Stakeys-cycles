import { Seo } from '../components/Seo';
import { Accordion } from '../components/Accordion';
import { Button, Container, PageHero, SectionHeading } from '../components/ui';
import {
  BIKE_TYPE_GUIDE,
  FAQ_CATEGORIES,
  RIDING_HAZARDS,
} from '../data/faqs';
import { SHOP, TEL_HREF } from '../data/site';
import { PhoneIcon } from '../components/Icons';

export default function FaqsPage() {
  return (
    <>
      <Seo
        title="FAQs"
        description="Answers to common questions about bike and e-scooter repairs, parts, pricing and opening hours at Stakey's Cycles."
      />

      <PageHero
        title="Frequently asked questions"
        intro="Everything you need to know about repairs, parts, pricing and how our call-out service works."
        image="/images/workshop-3.jpg"
      />

      <Container className="py-14">
        {FAQ_CATEGORIES.map((category) => (
          <section key={category.id} id={category.id} className="section-anchor mt-12 first:mt-0">
            <SectionHeading title={category.title} />
            <div className="mt-6">
              <Accordion items={category.items} />
            </div>
          </section>
        ))}

        <section className="section-anchor mt-16">
          <SectionHeading
            eyebrow="Riding conditions"
            title="What can damage your bike?"
            intro="The environment you ride in has a big impact on wear and tear. Here is what to watch out for."
          />
          <div className="mt-6">
            <Accordion items={RIDING_HAZARDS} />
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading
            eyebrow="Buying guide"
            title="Which bike is right for your terrain?"
            intro="A quick comparison of the main bike types and what they are best suited to."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
              {BIKE_TYPE_GUIDE.map((row) => (
                <div key={row.type} className="surface rounded-2xl p-5">
                  <h3 className="text-base font-semibold text-white">{row.type}</h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-slate-500">Best for</dt>
                      <dd className="text-slate-300">{row.bestFor}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-slate-500">Suitability</dt>
                      <dd className="text-slate-300">{row.suitability}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-slate-500">Key features</dt>
                      <dd className="text-slate-400">{row.features}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </section>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-lg font-medium text-white">Still have a question?</p>
          <Button href={TEL_HREF} size="lg">
            <PhoneIcon className="h-4 w-4" />
            Call {SHOP.phoneDisplay}
          </Button>
        </div>
      </Container>
    </>
  );
}

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
        image="/images/gallery-3.jpg"
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
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="w-full min-w-[52rem] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Bike type
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Best for
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Suitability
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium">
                    Key features
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {BIKE_TYPE_GUIDE.map((row) => (
                  <tr key={row.type} className="align-top">
                    <td className="px-5 py-4 font-medium text-white">{row.type}</td>
                    <td className="px-5 py-4 text-slate-400">{row.bestFor}</td>
                    <td className="px-5 py-4 text-slate-400">{row.suitability}</td>
                    <td className="px-5 py-4 text-slate-400">{row.features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

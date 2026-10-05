import { Seo } from '../components/Seo';
import { Button, Container, PageHero, SectionHeading } from '../components/ui';
import { PRICE_NOTES, PRICE_SECTIONS } from '../data/priceList';
import { SHOP, TEL_HREF } from '../data/site';
import { PhoneIcon } from '../components/Icons';

export default function PriceListPage() {
  return (
    <>
      <Seo
        title="Repairs & Quotes"
        description="Repairs we carry out on bicycles and e-scooters at Stakey's Cycles, Salford. Ask for a quote on any job."
      />

      <PageHero
        title="Quality service & sustainable savings"
        intro="Our approach reflects a simple philosophy: making cycling accessible to everyone. By expertly using second-hand and reconditioned parts, we save you money and help the environment by extending the life of existing bikes."
        image="/images/price-list.jpg"
      />

      <Container className="py-12 sm:py-14">
        {/* Ask for a quote */}
        <div className="rounded-2xl border border-brand-500/40 bg-brand-500/10 p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">Ask for a quote</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                We don&rsquo;t publish fixed prices — every bike is different. Tell us what
                you need and we&rsquo;ll give you a clear quote before we start.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button to="/book" className="w-full sm:w-auto">
                Book a repair
              </Button>
              <Button href={TEL_HREF} variant="secondary" className="w-full sm:w-auto">
                <PhoneIcon className="h-4 w-4" />
                Call {SHOP.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8 rounded-2xl border border-brand-500/25 bg-brand-500/[0.07] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
            General notes on quotes
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            {PRICE_NOTES.map((note) => (
              <li key={note} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-slate-400">
            For a quote on complex repairs or specific bike models, contact us and we&rsquo;ll
            base it on our latest inventory.
          </p>
        </div>

        {/* Sections */}
        {PRICE_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="section-anchor mt-14 sm:mt-16">
            <SectionHeading
              eyebrow={section.id === 'bicycle' ? 'Bicycles' : 'E-scooters'}
              title={section.title}
              intro={section.intro}
            />
            <div className="mt-8 space-y-8">
              {section.groups.map((group) => (
                <div
                  key={group.title}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <h3 className="border-b border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-brand-300">
                    {group.title}
                  </h3>
                  <ul className="divide-y divide-white/5">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex flex-col gap-1.5 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                      >
                        <div className="sm:max-w-md">
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="mt-0.5 text-sm text-slate-400">{item.description}</p>
                        </div>
                        <span className="shrink-0 self-start rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300 sm:self-center">
                          Ask for a quote
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-lg font-medium text-white">
            Not sure what your repair needs? Give us a shout.
          </p>
          <Button href={TEL_HREF} size="lg" className="w-full sm:w-auto">
            <PhoneIcon className="h-4 w-4" />
            Call {SHOP.phoneDisplay}
          </Button>
        </div>
      </Container>
    </>
  );
}

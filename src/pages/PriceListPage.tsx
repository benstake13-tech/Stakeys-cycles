import { Seo } from '../components/Seo';
import { Button, Container, PageHero, SectionHeading } from '../components/ui';
import { PRICE_NOTES, PRICE_SECTIONS } from '../data/priceList';
import { SHOP, TEL_HREF } from '../data/site';
import { PhoneIcon } from '../components/Icons';

export default function PriceListPage() {
  return (
    <>
      <Seo
        title="Price List"
        description="Ballpark labour-only prices for bicycle and e-scooter repairs at Stakey's Cycles, Salford."
      />

      <PageHero
        title="Quality service & sustainable savings"
        intro="Our price list reflects a simple philosophy: making cycling accessible to everyone. By expertly using second-hand and reconditioned parts, we save you money and help the environment by extending the life of existing bikes."
        image="/images/price-list.jpg"
      />

      <Container className="py-14">
        {/* Notes */}
        <div className="rounded-2xl border border-brand-500/25 bg-brand-500/[0.07] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
            General notes on pricing
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
            For the final price on complex repairs or specific bike models, please contact
            us for the most accurate quote based on our latest inventory.
          </p>
        </div>

        {/* Sections */}
        {PRICE_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="section-anchor mt-16">
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
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[36rem] text-left text-sm">
                      <thead className="text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                          <th scope="col" className="px-5 py-3 font-medium">
                            Repair
                          </th>
                          <th scope="col" className="px-5 py-3 font-medium">
                            Description
                          </th>
                          <th scope="col" className="px-5 py-3 font-medium whitespace-nowrap">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {group.items.map((item) => (
                          <tr key={item.name} className="align-top">
                            <td className="px-5 py-4 font-medium text-white">
                              {item.name}
                            </td>
                            <td className="px-5 py-4 text-slate-400">
                              {item.description}
                              {item.note && (
                                <span className="mt-1 block text-xs text-slate-500">
                                  {item.note}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 font-semibold whitespace-nowrap text-brand-300">
                              {item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-lg font-medium text-white">
            Not sure what your repair needs? Give us a shout.
          </p>
          <Button href={TEL_HREF} size="lg">
            <PhoneIcon className="h-4 w-4" />
            Call {SHOP.phoneDisplay}
          </Button>
        </div>
      </Container>
    </>
  );
}

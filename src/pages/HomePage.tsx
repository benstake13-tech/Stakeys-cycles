import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button, Card, Container, Eyebrow, SectionHeading } from '../components/ui';
import { SHOP, TEL_HREF, WHATSAPP_HREF } from '../data/site';
import PromotionsStrip from '../components/Promotions';
import {
  ArrowRightIcon,
  BikeIcon,
  BoltIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  PoundIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
  WrenchIcon,
} from '../components/Icons';

const SERVICES = [
  {
    icon: BikeIcon,
    title: 'Bicycle repairs',
    body: 'Punctures, brakes, gears, wheels and full services for every kind of bike — road, hybrid, MTB, BMX and folding.',
  },
  {
    icon: BoltIcon,
    title: 'E-bikes & e-scooters',
    body: 'Diagnostics, motor and controller work, battery replacement, wiring and mechanical repairs for electrified rides.',
  },
  {
    icon: WrenchIcon,
    title: 'Tune-ups & overhauls',
    body: 'Standard tune-ups to keep you rolling, plus in-depth overhauls for bikes that need restoring.',
  },
  {
    icon: PoundIcon,
    title: 'Honest, upfront quotes',
    body: 'Tell us what you need and we will quote before we start — keeping costs low with second-hand and reconditioned parts where we can.',
  },
];

const STEPS = [
  {
    title: 'Send your postcode',
    body: 'Tell us where you are in Salford and what your bike or scooter needs.',
  },
  {
    title: 'Get your quote',
    body: 'We assess the job and give you a clear quote — no hidden charges.',
  },
  {
    title: 'We come to you',
    body: 'An expert mechanic arrives at your chosen location and gets you moving again.',
  },
];

const TRUST = [
  { icon: MapPinIcon, label: 'Call-out only, across Salford' },
  { icon: ShieldIcon, label: 'Any bike, any make, any model' },
  { icon: PoundIcon, label: 'Fast turnaround, upfront quotes' },
];

export default function HomePage() {
  return (
    <>
      <Seo
        title="Mobile Bike & E-Scooter Repair in Salford"
        description="Stakey's Cycles is Salford's call-out-only bike and e-scooter repair service. Expert mobile repairs with fast turnaround and honest, upfront quotes."
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="/images/workshop-1.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/92 to-ink-950/60" />
        <div
          aria-hidden
          className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
        />
        <Container className="relative py-14 sm:py-20 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="animate-fade-up lg:col-span-7">
              <Eyebrow>Salford &middot; Call-out only</Eyebrow>
              <h1 className="text-[2.1rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Expert bike repairs,
                <br />
                <span className="text-gradient">brought to your door</span>.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
                Stakey&rsquo;s Cycles is Salford&rsquo;s call-out-only bike and e-scooter
                repair service. Fast turnaround, honest advice — we come to you, quote up
                front, and get you rolling.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button to="/book" size="lg" className="w-full sm:w-auto">
                  Book a repair online
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button
                  href={TEL_HREF}
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  <PhoneIcon className="h-4 w-4" />
                  {SHOP.phoneDisplay}
                </Button>
              </div>
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:flex sm:flex-wrap">
                {TRUST.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 text-sm font-medium text-slate-300"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-brand-400" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-up animate-delay-1 lg:col-span-5">
              <div className="surface rounded-3xl p-6 shadow-2xl shadow-black/40">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo.png"
                    alt=""
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <div>
                    <p className="font-semibold text-white">Workshop at a glance</p>
                    <p className="text-xs text-slate-400">{SHOP.area}</p>
                  </div>
                </div>
                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <div>
                      <dt className="font-medium text-white">Repairs</dt>
                      <dd className="text-slate-400">{SHOP.hours.work}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <div>
                      <dt className="font-medium text-white">Drop-off &amp; collection</dt>
                      <dd className="text-slate-400">{SHOP.hours.dropOff}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <div>
                      <dt className="font-medium text-white">No account needed</dt>
                      <dd className="text-slate-400">Book online in five quick steps</dd>
                    </div>
                  </div>
                </dl>
                <Button to="/book" className="mt-6 w-full" size="lg">
                  Start your booking
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Repairs and servicing for every set of wheels"
            intro="From a quick puncture to a full e-scooter electrical fault, we bring the workshop to you."
          />
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <Card key={service.title} hover className="flex flex-col">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                  <service.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.body}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/price-list"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition hover:text-brand-200"
            >
              See the full list of repairs
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-white/10 bg-white/[0.02] py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Three simple steps to a fixed bike"
            center
          />
          <ol className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative">
                <div className="surface flex h-full flex-col rounded-2xl p-6">
                  <span className="text-3xl font-extrabold text-brand-500/40">
                    0{index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Offers — live from the staff backend */}
      <PromotionsStrip />

      {/* Booking CTA */}
      <section className="py-10 sm:py-14">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 to-ink-950 p-7 sm:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Ready for a fix?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Book an appointment online, or call us today and we&rsquo;ll get you back on
                the road.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button to="/book" size="lg" className="w-full sm:w-auto">
                  Book an appointment
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button
                  href={WHATSAPP_HREF}
                  size="lg"
                  variant="secondary"
                  external
                  className="w-full sm:w-auto"
                >
                  Message on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Reviews"
                title="Your feedback keeps the wheels turning smoothly"
                intro={
                  <>
                    At Stakey&rsquo;s Cycles, we know cycling is about more than just buying
                    gear — it&rsquo;s about chasing the perfect ride. That&rsquo;s why your
                    honest feedback is the most important part of our business.
                  </>
                }
              />
              <ul className="mt-6 space-y-3 text-sm text-slate-400">
                {[
                  'Dial in our gear choices — stock the most reliable parts for our riders.',
                  'Refine our service — improve the knowledge and speed of our team.',
                  'Support the cycling community — stay your trusted local hub.',
                ].map((line) => (
                  <li key={line} className="flex gap-3">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={SHOP.reviewUrl} variant="secondary" external>
                  <StarIcon className="h-4 w-4 text-brand-400" />
                  Leave a review
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { value: '8am–8pm', label: 'Repairs carried out' },
                { value: '24h', label: 'Drop-off & collection' },
                { value: 'Salford', label: 'Our home turf' },
              ].map((stat) => (
                <Card key={stat.label} className="p-4 text-center sm:p-6">
                  <p className="text-xl font-bold text-brand-400 sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-400 sm:text-xs">
                    {stat.label}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Community note */}
      <section className="border-t border-white/10 py-12 sm:py-16">
        <Container>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
              <UsersIcon className="h-6 w-6" />
            </span>
            <blockquote className="text-base leading-relaxed text-slate-300 sm:text-lg">
              Salford is the home of Stakey&rsquo;s Cycles, and I couldn&rsquo;t be prouder
              of that. Everything we do is down to the people of this city — their support,
              their spirit, and their trust.
            </blockquote>
          </div>
        </Container>
      </section>
    </>
  );
}

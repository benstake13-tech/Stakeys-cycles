import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button, Card, Container, Eyebrow, SectionHeading } from '../components/ui';
import { OFFERS } from '../data/gallery';
import { SHOP, TEL_HREF, WHATSAPP_HREF } from '../data/site';
import {
  ArrowRightIcon,
  BikeIcon,
  BoltIcon,
  CheckIcon,
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
    title: 'Honest, low prices',
    body: 'We use second-hand and reconditioned parts where we can, keeping labour and part costs extremely low.',
  },
];

const STEPS = [
  {
    title: 'Send your postcode',
    body: 'Tell us where you are in Salford and what your bike or scooter needs.',
  },
  {
    title: 'Get your call-out fee',
    body: 'We calculate a simple call-out fee based on your location — no hidden charges.',
  },
  {
    title: 'We come to you',
    body: 'An expert mechanic arrives at your chosen location and gets you moving again.',
  },
];

const TRUST = [
  { icon: MapPinIcon, label: 'Call-out only, across Salford' },
  { icon: ShieldIcon, label: 'Any bike, any make, any model' },
  { icon: PoundIcon, label: 'Fastest turnaround, lowest rates' },
];

export default function HomePage() {
  return (
    <>
      <Seo
        title="Mobile Bike & E-Scooter Repair in Salford"
        description="Stakey's Cycles is Salford's call-out-only bike and e-scooter repair service. Expert mobile repairs with fast turnaround and honest prices."
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="/images/gallery-1.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/90 to-ink-950/70" />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl animate-fade-up">
            <Eyebrow>Salford &middot; Call-out only</Eyebrow>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Expert bike repairs,{' '}
              <span className="text-brand-400">brought to your door</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              Stakey&rsquo;s Cycles is your dedicated call-out-only service, bringing expert
              repairs directly to you. We offer the fastest turnaround and lowest rates in
              Salford. Just provide your postcode, and we&rsquo;ll calculate the simple
              call-out fee.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={SHOP.bookingUrl} size="lg" external>
                Call us out
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href={TEL_HREF} size="lg" variant="secondary">
                <PhoneIcon className="h-4 w-4" />
                {SHOP.phoneDisplay}
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-sm font-medium text-slate-300"
                >
                  <item.icon className="h-4 w-4 text-brand-400" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Repairs and servicing for every set of wheels"
            intro="From a quick puncture to a full e-scooter electrical fault, we bring the workshop to you."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <Card key={service.title} className="flex flex-col">
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
              See our full price list
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-white/10 bg-white/[0.02] py-20">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Three simple steps to a fixed bike"
            center
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-950/60 p-6">
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

      {/* Offers */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Offers"
            title="Current deals from the workshop"
            intro="Keep an eye out — we regularly run offers on servicing and parts."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERS.map((offer, index) => (
              <div
                key={offer.src}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <img
                  src={offer.src}
                  alt={`Stakey's Cycles offer ${index + 1}`}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Booking CTA */}
      <section className="py-8">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/15 to-ink-950 p-8 sm:p-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready for a fix?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Book an appointment online, or call us today and we&rsquo;ll get you back on
                the road.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={SHOP.bookingUrl} size="lg" external>
                  Book an appointment
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button href={WHATSAPP_HREF} size="lg" variant="secondary" external>
                  Message on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="py-20">
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

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                { value: '8am–8pm', label: 'Repairs carried out' },
                { value: '24h', label: 'Drop-off & collection' },
                { value: 'Salford', label: 'Our home turf' },
              ].map((stat) => (
                <Card key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-brand-400">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Community note */}
      <section className="border-t border-white/10 py-16">
        <Container>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
              <UsersIcon className="h-6 w-6" />
            </span>
            <blockquote className="text-lg leading-relaxed text-slate-300">
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

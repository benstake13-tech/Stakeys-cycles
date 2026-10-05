import { Seo } from '../components/Seo';
import { Button, Card, Container, PageHero, SectionHeading } from '../components/ui';
import {
  MAIL_HREF,
  SHOP,
  SMS_HREF,
  TEL_HREF,
  WHATSAPP_HREF,
} from '../data/site';
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '../components/Icons';

export default function LocationPage() {
  return (
    <>
      <Seo
        title="Location & Contact"
        description="Stakey's Cycles is a mobile, call-out-only repair service based in Salford. Contact us by phone, text, WhatsApp or email."
      />

      <PageHero
        title="Mobile services only"
        intro="We've gone fully mobile! Skip the travel and let us come to you. All services are now handled via call-outs at your preferred location. Book your appointment today and we'll handle the rest."
        image="/images/location.jpg"
      />

      <Container className="py-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <section>
              <SectionHeading
                eyebrow="Our home"
                title="Salford is where we belong"
                intro="Everything we do is down to the people of this city — their support, their spirit, and their trust. Without Salford and its community, Stakey's Cycles simply wouldn't be what it is today."
              />
            </section>

            <section className="section-anchor" id="how-it-works">
              <h2 className="text-xl font-semibold text-white">
                How the call-out service works
              </h2>
              <ol className="mt-5 space-y-4 text-sm leading-relaxed text-slate-400">
                <li className="flex gap-3">
                  <span className="font-bold text-brand-400">1.</span>
                  Give us your postcode and tell us what your bike or scooter needs.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-brand-400">2.</span>
                  We calculate a simple call-out fee based on your location.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-brand-400">3.</span>
                  An expert mechanic comes to your chosen location and gets you moving.
                </li>
              </ol>
              <div className="mt-6">
                <Button to="/book" size="lg">
                  Book an appointment
                </Button>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">Pick-up & delivery</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                We also offer a convenient pick-up and delivery service. A charge is applied
                per mile travelled — contact us for a quote based on your location.
              </p>
            </section>
          </div>

          <div className="space-y-4">
            <Card>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
                Contact us
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a
                    href={TEL_HREF}
                    className="flex items-start gap-3 text-slate-300 transition hover:text-brand-300"
                  >
                    <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <span>
                      <span className="block font-medium text-white">Call us out</span>
                      {SHOP.phoneDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={SMS_HREF}
                    className="flex items-start gap-3 text-slate-300 transition hover:text-brand-300"
                  >
                    <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <span>
                      <span className="block font-medium text-white">Text us</span>
                      Send a message any time
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-start gap-3 text-slate-300 transition hover:text-brand-300"
                  >
                    <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <span>
                      <span className="block font-medium text-white">WhatsApp</span>
                      Quick questions & photos
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={MAIL_HREF}
                    className="flex items-start gap-3 break-all text-slate-300 transition hover:text-brand-300"
                  >
                    <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                    <span>
                      <span className="block font-medium text-white">Email</span>
                      {SHOP.email}
                    </span>
                  </a>
                </li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
                Opening hours
              </h2>
              <ul className="mt-5 space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span>
                    <span className="block font-medium text-white">
                      {SHOP.hours.dropOff}
                    </span>
                    Drop off and collect at your convenience.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span>
                    <span className="block font-medium text-white">
                      {SHOP.hours.work}
                    </span>
                    When our mechanics are on the road.
                  </span>
                </li>
              </ul>
            </Card>

            <Card>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
                Service area
              </h2>
              <p className="mt-5 flex items-start gap-3 text-sm text-slate-300">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>
                  <span className="block font-medium text-white">{SHOP.area}</span>
                  Call-out service only — we come to your postcode.
                </span>
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

import { Seo } from '../components/Seo';
import { Button, Card, Container, PageHero } from '../components/ui';
import { MAIL_HREF, SHOP, WHATSAPP_HREF } from '../data/site';
import { BoltIcon, CheckIcon, ClockIcon, MapPinIcon, UsersIcon } from '../components/Icons';

const PERKS = [
  {
    icon: MapPinIcon,
    title: 'Start from home',
    body: 'Head straight to the customer from your own garage — no workshop to travel to.',
  },
  {
    icon: ClockIcon,
    title: 'Flexible shifts',
    body: 'Work when it suits you, in your designated territory.',
  },
  {
    icon: BoltIcon,
    title: 'Professional growth',
    body: 'Expert training is available if you need to sharpen your skills before hitting the road.',
  },
  {
    icon: UsersIcon,
    title: 'We handle the admin',
    body: 'We take care of the marketing and bookings — you provide the expert on-site service.',
  },
];

export default function JoinTeamPage() {
  return (
    <>
      <Seo
        title="Join the Team"
        description="Become an independent mobile mechanic with Stakey's Cycles. Turn your skills into a mobile business across Salford."
      />

      <PageHero
        title="Join the Stakey's Cycles team"
        intro="Turn your skills into a mobile business. We're looking for independent mechanics to join our city-wide call-out team."
        image="/images/workshop-1.jpg"
      />

      <Container className="py-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Be the face of Stakey&rsquo;s Cycles in your area
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Ready to ditch the workshop? We handle the marketing and booking; you provide
              the expert on-site service. Ready to roll? Get in touch and tell us a little
              about your experience.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {PERKS.map((perk) => (
                <Card key={perk.title} className="flex flex-col">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                    <perk.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-white">{perk.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{perk.body}</p>
                </Card>
              ))}
            </div>

            <ul className="mt-8 space-y-3 text-sm text-slate-400">
              {[
                'You bring your own tools and transport.',
                'You set the pace — full-time or alongside other work.',
                'We support you with bookings, marketing and training.',
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <Card className="h-fit lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-white">Ready to apply?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Send us a message and we&rsquo;ll get back to you to talk through the next
              steps.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button href={MAIL_HREF} size="lg">
                Email {SHOP.email}
              </Button>
              <Button href={WHATSAPP_HREF} size="lg" variant="secondary" external>
                Message on WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
}

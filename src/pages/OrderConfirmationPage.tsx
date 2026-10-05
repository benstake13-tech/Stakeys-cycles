import { useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button, Container } from '../components/ui';
import { SHOP, TEL_HREF, WHATSAPP_HREF } from '../data/site';
import { CheckIcon, PhoneIcon, WhatsAppIcon } from '../components/Icons';

export default function OrderConfirmationPage() {
  const { id = '' } = useParams();

  return (
    <>
      <Seo title="Order received" />

      <Container className="py-14 sm:py-20">
        <div className="surface mx-auto max-w-2xl rounded-3xl p-8 text-center sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
            <CheckIcon className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Thanks &mdash; your order is in
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            We&rsquo;ve received your order and will be in touch shortly to confirm availability
            and send a payment link or bank details. Nothing has been charged yet.
          </p>

          <p className="mt-6 inline-block rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-sm text-slate-300">
            Order reference: <span className="font-semibold text-white">{id}</span>
          </p>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
            <Button to="/shop">
              Continue shopping
            </Button>
            <Button href={TEL_HREF} variant="secondary">
              <PhoneIcon className="h-4 w-4" />
              Call {SHOP.phoneDisplay}
            </Button>
            <Button href={WHATSAPP_HREF} variant="secondary" external>
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

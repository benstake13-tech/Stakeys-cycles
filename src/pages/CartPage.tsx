import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button, Container } from '../components/ui';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/shop';
import { ArrowRightIcon, CartIcon, MinusIcon, PlusIcon, TrashIcon } from '../components/Icons';

export default function CartPage() {
  const { lines, subtotal, setQuantity, removeItem, clear } = useCart();

  return (
    <>
      <Seo title="Your cart" description="Review your basket before checking out at Stakey's Cycles." />

      <Container className="py-10 sm:py-14">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Your cart</h1>

        {lines.length === 0 ? (
          <div className="surface mt-8 rounded-2xl p-10 text-center">
            <CartIcon className="mx-auto h-10 w-10 text-slate-600" />
            <p className="mt-4 text-lg font-semibold text-white">Your cart is empty</p>
            <p className="mt-2 text-sm text-slate-400">
              Browse the shop to find bikes, parts and accessories.
            </p>
            <div className="mt-6">
              <Button to="/shop">
                Browse the shop
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.productId}
                  className="surface flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center"
                >
                  <Link
                    to={`/shop/${line.productId}`}
                    className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-ink-900 sm:h-20 sm:w-20"
                  >
                    {line.imageUrl ? (
                      <img src={line.imageUrl} alt={line.name} className="h-full w-full object-cover" />
                    ) : null}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/shop/${line.productId}`}
                      className="font-semibold text-white hover:text-brand-300"
                    >
                      {line.name}
                    </Link>
                    <p className="mt-1 text-sm text-slate-400">{formatPrice(line.price)} each</p>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div className="flex items-center rounded-full border border-white/15">
                      <button
                        type="button"
                        aria-label={`Decrease ${line.name}`}
                        onClick={() => setQuantity(line.productId, line.quantity - 1)}
                        className="flex h-10 w-10 items-center justify-center text-white"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-white">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${line.name}`}
                        onClick={() => setQuantity(line.productId, line.quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center text-white"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="w-20 text-right font-semibold text-white">
                      {formatPrice(line.price * line.quantity)}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${line.name}`}
                      onClick={() => removeItem(line.productId)}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:text-rose-300"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="surface h-fit rounded-2xl p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-white">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <dt>Subtotal</dt>
                  <dd className="font-semibold text-white">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-slate-400">
                  <dt>Delivery / postage</dt>
                  <dd className="text-slate-400">Arranged after order</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                No payment is taken here. We&rsquo;ll confirm availability and send a payment link
                or bank details.
              </p>
              <div className="mt-6 grid gap-3">
                <Button to="/checkout" size="lg" className="w-full">
                  Continue to checkout
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <Button to="/shop" variant="secondary" className="w-full">
                  Keep shopping
                </Button>
              </div>
              <button
                type="button"
                onClick={clear}
                className="mt-4 w-full text-center text-xs text-slate-500 hover:text-slate-300"
              >
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </Container>
    </>
  );
}

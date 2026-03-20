import { CheckoutButton } from "./components/checkout-button";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-500">
            Internet-grade brain enhancement
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Get Your IQ&nbsp;+1
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            For the historically reasonable price of one dollar, receive a
            premium blessing that gently suggests your brain vibes have
            improved.
          </p>

          <div className="mt-10">
            <CheckoutButton />
          </div>

          <p className="mt-5 text-xs text-slate-500">
            Entertainment only &middot; No real IQ was harmed
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-200/80 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-violet-500">
              What you get
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A premium blessing experience
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg">
                &#x26A1;
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                Instant Blessing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                One click, one dollar, one upgrade. No waiting rooms, no
                cognitive tests, no awkward interviews.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-lg">
                &#x1F517;
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                Shareable Result
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                A blessing you can show the internet. Let them witness your
                ascension to slightly higher vibes.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-lg">
                &#x1F9E0;
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                Permanent Aura
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Your brain enhancement lives on the internet forever.
                Unrevokable, unquestionable, entirely unserious.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200/80 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-500">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Three steps to enlightenment
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            <div>
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                1
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                Pay $1
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                A small price for perceived greatness. Secure checkout via
                Stripe.
              </p>
            </div>

            <div>
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                2
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                Receive your blessing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                An internet-certified IQ upgrade, delivered instantly to your
                screen.
              </p>
            </div>

            <div>
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                3
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                Bask in the vibes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Share your enhanced status with the world. Let them know.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-slate-200/80 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-4xl font-bold tracking-tight text-slate-900">
                12,847
              </p>
              <p className="mt-2 text-sm text-slate-600">Blessings granted</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-4xl font-bold tracking-tight text-slate-900">
                2,391
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Brains upgraded today
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-4xl font-bold tracking-tight text-slate-900">
                +1
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Average vibe improvement
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

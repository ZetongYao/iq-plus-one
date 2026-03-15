import { CheckoutButton } from "./components/checkout-button";
import { SiteFooter } from "./components/site-footer";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <section className="hero-card text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
            Internet-grade enhancement
          </p>

          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Get Your IQ +1
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            For the historically reasonable price of one dollar, receive a premium
            blessing that gently suggests your brain vibes have improved.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            IQ+1 is a humorous digital novelty product. Users pay to receive a
            playful internet blessing. It is for entertainment only.
          </p>

          <div className="mt-10">
            <CheckoutButton />
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left">
            <p className="text-sm font-medium text-slate-800">Blessing preview</p>
            <p className="mt-2 text-base text-slate-600">IQ+1 granted.</p>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            This does not constitute real intelligence enhancement.
          </p>
        </section>

        <SiteFooter className="mt-6" />
      </div>
    </main>
  );
}

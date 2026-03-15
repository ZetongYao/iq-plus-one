import { CheckoutButton } from "./components/checkout-button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="hero-card w-full max-w-3xl text-center">
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
    </main>
  );
}

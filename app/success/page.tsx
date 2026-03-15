import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="hero-card w-full max-w-2xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-emerald-600">
          Payment complete
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          IQ +1 granted.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
          Please use your newly expanded brain responsibly.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-base font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}

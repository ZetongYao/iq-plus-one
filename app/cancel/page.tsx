import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="hero-card w-full max-w-2xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-600">
          Payment cancelled
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Payment cancelled. Your brain remains at baseline.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
          The universe has decided to keep your intellectual stats unchanged for now.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-base font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Try again
        </Link>
      </section>
    </main>
  );
}

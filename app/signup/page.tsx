import Link from "next/link";
import { signup } from "../auth/actions";
import { SiteFooter } from "../components/site-footer";

type SignupPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <section className="hero-card">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
            Freshly upgraded access
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            Create your IQ+1 account
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Sign up with email and password to keep your future blessings attached
            to a real account instead of pure internet destiny.
          </p>

          {error ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <form action={signup} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                placeholder="At least 6 characters"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-base font-medium text-white transition hover:bg-slate-800"
            >
              Sign up
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-slate-800 underline">
              Log in
            </Link>
          </p>
        </section>

        <SiteFooter className="mt-6" />
      </div>
    </main>
  );
}

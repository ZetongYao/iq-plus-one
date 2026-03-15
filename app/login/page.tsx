import Link from "next/link";
import { login } from "../auth/actions";
import { SiteFooter } from "../components/site-footer";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, message } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        <section className="hero-card">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
            Welcome back
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            Log in to IQ+1
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Sign in with your email and password to manage your account and keep
            your internet-grade blessings organized.
          </p>

          {message ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          ) : null}

          {error ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <form action={login} className="mt-8 space-y-5">
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
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-base font-medium text-white transition hover:bg-slate-800"
            >
              Log in
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Need an account?{" "}
            <Link href="/signup" className="font-medium text-slate-800 underline">
              Sign up
            </Link>
          </p>
        </section>

        <SiteFooter className="mt-6" />
      </div>
    </main>
  );
}

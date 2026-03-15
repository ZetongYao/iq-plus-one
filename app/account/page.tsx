import Link from "next/link";
import { redirect } from "next/navigation";
import { saveProfile } from "./actions";
import { SiteFooter } from "../components/site-footer";
import { LogoutButton } from "../components/logout-button";
import { getOrCreateProfile } from "../../lib/profiles";
import { createClient } from "../../lib/supabase/server";

type AccountPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getOrCreateProfile(user);
  const { error, message } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <section className="hero-card">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
            Account
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            Your IQ+1 account
          </h1>

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

          <div className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <div>
              <p className="text-sm font-medium text-slate-800">Email</p>
              <p className="mt-2 text-base text-slate-600">
                {profile.email ?? user.email ?? "Authenticated user"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-800">Display name</p>
              <p className="mt-2 text-base text-slate-600">
                {profile.display_name || "Not set yet"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-800">Profile created</p>
              <p className="mt-2 text-base text-slate-600">
                {new Date(profile.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          <form action={saveProfile} className="mt-8">
            <label
              htmlFor="display_name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Display name
            </label>
            <input
              id="display_name"
              name="display_name"
              type="text"
              defaultValue={profile.display_name ?? ""}
              maxLength={60}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              placeholder="How should we address your expanded brain?"
            />

            <p className="mt-3 text-sm text-slate-500">
              You can leave this blank if you prefer mysterious internet anonymity.
            </p>

            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Save profile
            </button>
          </form>

          <p className="mt-6 text-base leading-7 text-slate-600">
            This page is intentionally minimal for now. It gives you a clean place
            to add profile details, payment history, and saved blessings later.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/purchase-history"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              View purchase history
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Back to home
            </Link>
            <LogoutButton className="px-5 py-3" />
          </div>
        </section>

        <SiteFooter className="mt-6" />
      </div>
    </main>
  );
}

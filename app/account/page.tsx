import Link from "next/link";
import { redirect } from "next/navigation";
import { saveProfile } from "./actions";
import { LogoutButton } from "../components/logout-button";
import { getOrCreateProfile } from "../../lib/profiles";
import { getOrdersForUser } from "../../lib/orders";
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
  const orders = await getOrdersForUser(user.id);
  const { error, message } = await searchParams;

  const blessingCount = orders.length;
  const brainStatus = blessingCount > 0 ? "Enhanced" : "Baseline";

  return (
    <div className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {profile.display_name
              ? `Hey, ${profile.display_name}`
              : "Your Account"}
          </h1>
        </div>

        {message ? (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Blessings</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {blessingCount}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">IQ Gained</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              +{blessingCount}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Brain Status</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              {brainStatus}
            </p>
          </div>
        </div>

        {/* Profile */}
        <div className="mt-8 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Profile</h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-500">Email</p>
              <p className="mt-1 text-base text-slate-900">
                {profile.email ?? user.email ?? "\u2014"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Display name</p>
              <p className="mt-1 text-base text-slate-900">
                {profile.display_name || "Not set"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Member since</p>
              <p className="mt-1 text-base text-slate-900">
                {new Date(profile.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Edit display name */}
        <div className="mt-6 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Edit display name
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            How should we address your expanded brain?
          </p>

          <form action={saveProfile} className="mt-5">
            <input
              id="display_name"
              name="display_name"
              type="text"
              defaultValue={profile.display_name ?? ""}
              maxLength={60}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              placeholder="Enter a display name"
            />
            <button
              type="submit"
              className="mt-4 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save
            </button>
          </form>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/purchase-history"
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Purchase history
          </Link>
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Get another blessing
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

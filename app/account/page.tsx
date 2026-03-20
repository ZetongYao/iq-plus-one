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

function getAuraLevel(count: number) {
  if (count === 0) return "Dormant";
  if (count <= 2) return "Awakened";
  if (count <= 5) return "Elevated";
  if (count <= 10) return "Radiant";
  if (count <= 25) return "Transcendent";
  return "Cosmic";
}

function getStatusLine(count: number) {
  if (count === 0)
    return "No enhancements detected. Your brain awaits its first blessing.";
  if (count === 1)
    return "Internet-certified enhancement active. One blessing on record.";
  if (count <= 5)
    return "Cognitive aura rising. Multiple blessings confirmed.";
  if (count <= 10)
    return "Brain vibes significantly upgraded. Enhancement streak active.";
  return "Internet-certified enhancement at maximum potency. Legendary status.";
}

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
  const auraLevel = getAuraLevel(blessingCount);
  const statusLine = getStatusLine(blessingCount);
  const greeting = profile.display_name
    ? `Hey, ${profile.display_name}`
    : "Your Brain Profile";

  return (
    <div className="px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Feedback */}
        {message ? (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {/* ── 1. Hero Summary ── */}
        <section className="rounded-2xl border border-slate-200 bg-white px-8 pb-10 pt-8 shadow-sm sm:px-10 sm:pb-12 sm:pt-10">
          <p className="text-xs font-medium uppercase tracking-widest text-violet-500">
            Account
          </p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {greeting}
          </h1>

          <div className="mt-10 flex flex-col items-center sm:mt-12">
            <p className="text-8xl font-extrabold tracking-tighter text-slate-900 sm:text-9xl">
              +{blessingCount}
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-violet-500">
              Total IQ Gained
            </p>
            <p className="mt-5 max-w-sm text-center text-sm leading-relaxed text-slate-500">
              {statusLine}
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
            >
              Get another blessing
            </Link>
          </div>
        </section>

        {/* ── 2. Secondary Stats ── */}
        <div className="mt-5 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Blessings
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              {blessingCount}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Brain Status
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              {brainStatus}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Aura Level
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              {auraLevel}
            </p>
          </div>
        </div>

        {/* ── 3. Blessing History ── */}
        <section className="mt-10">
          <h2 className="text-base font-semibold text-slate-900">
            Recent Blessings
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Your journey toward cognitive transcendence.
          </p>

          {orders.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
              <p className="text-sm text-slate-500">
                No blessings on record yet. Your brain profile is ready and
                waiting.
              </p>
              <Link
                href="/"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Get your first blessing
              </Link>
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {orders.slice(0, 8).map((order, i) => (
                <div
                  key={order.id}
                  className={`flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6${
                    i > 0 ? " border-t border-slate-200/80" : ""
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 text-sm">
                      &#x1F9E0;
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        IQ +1 Blessing
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium capitalize text-emerald-700">
                      <span className="h-1 w-1 rounded-full bg-emerald-500" />
                      {order.status}
                    </span>
                    <span className="text-sm font-semibold text-violet-600">
                      +1
                    </span>
                  </div>
                </div>
              ))}

              {orders.length > 8 ? (
                <div className="border-t border-slate-200/80 px-6 py-3 text-center">
                  <Link
                    href="/purchase-history"
                    className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
                  >
                    View all {orders.length} blessings &rarr;
                  </Link>
                </div>
              ) : null}
            </div>
          )}
        </section>

        {/* ── 4. Account Details ── */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-base font-semibold text-slate-900">
            Account Details
          </h2>

          <dl className="mt-5 space-y-0 divide-y divide-slate-200/80">
            <div className="flex items-baseline justify-between py-3 first:pt-0">
              <dt className="text-sm text-slate-500">Email</dt>
              <dd className="text-sm font-medium text-slate-900">
                {profile.email ?? user.email ?? "\u2014"}
              </dd>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <dt className="text-sm text-slate-500">Display name</dt>
              <dd className="text-sm font-medium text-slate-900">
                {profile.display_name || "Not set"}
              </dd>
            </div>
            <div className="flex items-baseline justify-between py-3 last:pb-0">
              <dt className="text-sm text-slate-500">Member since</dt>
              <dd className="text-sm font-medium text-slate-900">
                {new Date(profile.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </dd>
            </div>
          </dl>
        </section>

        {/* ── 5. Edit Display Name ── */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-base font-semibold text-slate-900">
            Display Name
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            How should we address your expanded brain?
          </p>

          <form action={saveProfile} className="mt-4">
            <input
              id="display_name"
              name="display_name"
              type="text"
              defaultValue={profile.display_name ?? ""}
              maxLength={60}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
              placeholder="Enter a display name"
            />
            <button
              type="submit"
              className="mt-3 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save
            </button>
          </form>
        </section>

        {/* ── 6. Footer Actions ── */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-6">
          <Link
            href="/purchase-history"
            className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            Purchase history &rarr;
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

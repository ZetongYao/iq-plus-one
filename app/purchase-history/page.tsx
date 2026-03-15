import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersForUser } from "../../lib/orders";
import { createClient } from "../../lib/supabase/server";
import { SiteFooter } from "../components/site-footer";

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function PurchaseHistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const orders = await getOrdersForUser(user.id);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <section className="hero-card">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
            Purchase history
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            Your IQ+1 orders
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            A minimal view of the blessings your wallet has bravely endorsed.
          </p>

          {orders.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-slate-600">
              No orders yet. Your brain remains financially unenhanced.
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-800">Amount</p>
                      <p className="mt-1 text-base text-slate-600">
                        {formatAmount(order.amount, order.currency)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-800">Status</p>
                      <p className="mt-1 text-base capitalize text-slate-600">
                        {order.status}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-800">Created</p>
                      <p className="mt-1 text-base text-slate-600">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    Currency: {order.currency.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/account"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Back to account
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Back to home
            </Link>
          </div>
        </section>

        <SiteFooter className="mt-6" />
      </div>
    </main>
  );
}

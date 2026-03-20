import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersForUser } from "../../lib/orders";
import { createClient } from "../../lib/supabase/server";

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
    <div className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
            History
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Purchase History
          </h1>
          <p className="mt-2 text-base text-slate-500">
            A record of the blessings your wallet has endorsed.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200/60 bg-white p-8 text-center shadow-sm">
            <p className="text-base text-slate-500">
              No orders yet. Your brain remains financially unenhanced.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get your first blessing
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/60 bg-white px-6 py-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm">
                    &#x1F9E0;
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      IQ +1 Blessing
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium capitalize text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {order.status}
                  </span>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatAmount(order.amount, order.currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/account"
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Back to account
          </Link>
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Get another blessing
          </Link>
        </div>
      </div>
    </div>
  );
}

import Stripe from "stripe";
import { createAdminClient } from "./supabase/admin";
import { createClient as createServerClient } from "./supabase/server";

export type Order = {
  id: string;
  user_id: string | null;
  stripe_session_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
};

export async function recordCompletedCheckoutSession(
  session: Stripe.Checkout.Session,
) {
  const supabase = createAdminClient();
  const stripeSessionId = session.id;

  const userId = session.metadata?.user_id?.trim() || null;
  const amount = session.amount_total ?? 0;
  const currency = session.currency ?? "usd";
  const status = session.payment_status || session.status || "pending";

  const { error: upsertError } = await supabase.from("orders").upsert(
    {
      user_id: userId,
      stripe_session_id: stripeSessionId,
      amount,
      currency,
      status,
    },
    {
      onConflict: "stripe_session_id",
      ignoreDuplicates: true,
    },
  );

  if (upsertError) {
    throw new Error(upsertError.message);
  }

  console.log("Recorded completed IQ+1 order:", {
    stripeSessionId,
    userId,
    amount,
    currency,
    status,
  });
}

export async function getOrdersForUser(userId: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select("id, user_id, stripe_session_id, amount, currency, status, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .returns<Order[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

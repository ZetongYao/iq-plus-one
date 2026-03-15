import Stripe from "stripe";

export async function recordCompletedCheckoutSession(
  session: Stripe.Checkout.Session,
) {
  const orderRecord = {
    checkoutSessionId: session.id,
    paymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id,
    customerEmail: session.customer_details?.email ?? null,
    amountTotal: session.amount_total,
    currency: session.currency,
    paidAt: new Date().toISOString(),
  };

  // This is the handoff point for a future database write.
  console.log("Recorded completed IQ+1 order:", orderRecord);
}

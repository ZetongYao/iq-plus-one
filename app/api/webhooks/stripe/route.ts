import Stripe from "stripe";
import { getRequiredEnv } from "../../../../lib/env";
import { recordCompletedCheckoutSession } from "../../../../lib/orders";
import { getStripe } from "../../../../lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const signature = request.headers.get("stripe-signature");
    const webhookSecret = getRequiredEnv("STRIPE_WEBHOOK_SECRET");

    if (!signature) {
      return new Response("Missing Stripe signature.", { status: 400 });
    }

    const payload = await request.text();

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (error) {
      console.error("Stripe webhook signature verification failed:", error);
      return new Response("Invalid signature.", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await recordCompletedCheckoutSession(session);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handler failed:", error);
    return new Response("Webhook handler error.", { status: 500 });
  }
}

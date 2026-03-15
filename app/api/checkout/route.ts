import { NextResponse } from "next/server";
import { getBaseUrl, getOptionalEnv } from "../../../lib/env";
import { getStripe } from "../../../lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const baseUrl = getBaseUrl(new URL(request.url).origin);
    const stripePriceId = getOptionalEnv("STRIPE_PRICE_ID");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      line_items: stripePriceId
        ? [
            {
              price: stripePriceId,
              quantity: 1,
            },
          ]
        : [
            {
              price_data: {
                currency: "usd",
                unit_amount: 100,
                product_data: {
                  name: "IQ+1 Blessing",
                  description:
                    "A premium internet blessing with suspicious benefits.",
                },
              },
              quantity: 1,
            },
          ],
      metadata: {
        productName: "IQ+1 Blessing",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session creation failed:", error);

    return NextResponse.json(
      {
        error:
          "Unable to start checkout right now. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { getStripe } from "../../../lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const origin = new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 100,
            product_data: {
              name: "IQ+1 Blessing",
              description: "A premium internet blessing with suspicious benefits.",
            },
          },
          quantity: 1,
        },
      ],
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

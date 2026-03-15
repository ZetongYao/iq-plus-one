import Stripe from "stripe";
import { getRequiredEnv } from "./env";

let stripeClient: Stripe | null = null;

export function getStripe() {
  const secretKey = getRequiredEnv("STRIPE_SECRET_KEY");

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

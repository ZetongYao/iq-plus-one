import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { getStripe } from "../../lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  let isPaid = false;
  let statusMessage =
    "We could not verify this payment. Please try the checkout flow again or contact support if you were charged.";

  if (sessionId) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        isPaid = true;
      } else {
        statusMessage =
          "This checkout session exists, but the payment is not marked as complete yet.";
      }
    } catch (error) {
      console.error("Failed to verify Stripe checkout session:", error);
    }
  } else {
    statusMessage = "Missing checkout session information.";
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <section className="hero-card text-center">
          <p
            className={`mb-4 text-sm font-medium uppercase tracking-[0.3em] ${
              isPaid ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isPaid ? "Payment verified" : "Verification failed"}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {isPaid ? "IQ +1 granted." : "Unable to confirm your IQ upgrade."}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
            {isPaid
              ? "Please use your newly expanded brain responsibly."
              : statusMessage}
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-base font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Return home
          </Link>
        </section>

        <SiteFooter className="mt-6" />
      </div>
    </main>
  );
}

import Link from "next/link";
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

  if (!isPaid) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
            <svg
              className="h-8 w-8 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            Verification Failed
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-500">
            {statusMessage}
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            Try again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <svg
            className="h-8 w-8 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          IQ +1 Granted
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-slate-500">
          Your brain has been officially enhanced. Please use your new cognitive
          vibes responsibly.
        </p>

        {/* Result card */}
        <div className="mt-8 rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Certified Enhanced
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Your internet-grade brain upgrade has been recorded. This
            enhancement is permanent, unrevokable, and entirely for
            entertainment purposes.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/account"
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            View account
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 sm:w-auto"
          >
            Get another blessing
          </Link>
        </div>
      </div>
    </div>
  );
}

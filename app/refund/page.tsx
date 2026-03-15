import { SiteFooter } from "../components/site-footer";

export default function RefundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <section className="hero-card">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            Refund Policy
          </h1>

          <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
            <p>
              IQ+1 is a low-cost digital novelty purchase. Because delivery is
              effectively immediate after successful payment, refunds are generally
              not guaranteed for completed transactions.
            </p>
            <p>
              If you were charged more than once by mistake, or if Stripe shows a
              successful payment but the site did not return a valid result page, you
              can review the charge and request help from the site owner.
            </p>
            <p>
              Approved refunds, when granted, are issued back to the original payment
              method through Stripe.
            </p>
          </div>
        </section>

        <SiteFooter className="mt-6" />
      </div>
    </main>
  );
}

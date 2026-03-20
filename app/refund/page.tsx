export default function RefundPage() {
  return (
    <div className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Refund Policy
        </h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-600">
          <p>
            IQ+1 is a low-cost digital novelty purchase. Because delivery is
            effectively immediate after successful payment, refunds are
            generally not guaranteed for completed transactions.
          </p>
          <p>
            If you were charged more than once by mistake, or if Stripe shows a
            successful payment but the site did not return a valid result page,
            you can review the charge and request help from the site owner.
          </p>
          <p>
            Approved refunds, when granted, are issued back to the original
            payment method through Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}

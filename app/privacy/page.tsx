export default function PrivacyPage() {
  return (
    <div className="px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-600">
          <p>
            IQ+1 collects only the limited information needed to operate the
            site and process payments. Payments are handled by Stripe on
            Stripe-hosted checkout pages.
          </p>
          <p>
            We do not store your full card information on this website. Stripe
            may process payment details, email addresses, and transaction
            metadata in accordance with its own policies.
          </p>
          <p>
            Server logs and webhook events may be used to confirm completed
            orders, prevent abuse, and support customer questions.
          </p>
          <p>
            If you have a privacy-related request, contact the site owner using
            the support method published with the live site.
          </p>
        </div>
      </div>
    </div>
  );
}

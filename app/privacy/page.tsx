import { SiteFooter } from "../components/site-footer";

export default function PrivacyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <section className="hero-card">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            Privacy Policy
          </h1>

          <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
            <p>
              IQ+1 collects only the limited information needed to operate the site
              and process payments. Payments are handled by Stripe on Stripe-hosted
              checkout pages.
            </p>
            <p>
              We do not store your full card information on this website. Stripe may
              process payment details, email addresses, and transaction metadata in
              accordance with its own policies.
            </p>
            <p>
              Server logs and webhook events may be used to confirm completed orders,
              prevent abuse, and support customer questions.
            </p>
            <p>
              If you have a privacy-related request, contact the site owner using the
              support method published with the live site.
            </p>
          </div>
        </section>

        <SiteFooter className="mt-6" />
      </div>
    </main>
  );
}

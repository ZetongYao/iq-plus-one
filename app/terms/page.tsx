import { SiteFooter } from "../components/site-footer";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <section className="hero-card">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            Terms of Service
          </h1>

          <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
            <p>
              IQ+1 is a humorous digital novelty product. By purchasing, you are
              buying a playful internet blessing for entertainment purposes only.
            </p>
            <p>
              No real intelligence enhancement, professional advice, measurable
              cognitive benefit, or scientific outcome is promised or implied.
            </p>
            <p>
              You agree not to misuse the service, attempt fraudulent payments, or
              interfere with the checkout flow or website operations.
            </p>
            <p>
              We may update these terms as the project evolves. Continued use of the
              site means you accept the current version.
            </p>
          </div>
        </section>

        <SiteFooter className="mt-6" />
      </div>
    </main>
  );
}

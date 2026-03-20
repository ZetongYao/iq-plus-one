import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            IQ+1 is for entertainment only. No real neurons were upgraded.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/terms"
              className="text-slate-500 transition hover:text-slate-700"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-slate-500 transition hover:text-slate-700"
            >
              Privacy
            </Link>
            <Link
              href="/refund"
              className="text-slate-500 transition hover:text-slate-700"
            >
              Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

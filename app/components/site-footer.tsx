import Link from "next/link";

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer
      className={`text-center text-sm text-slate-500 ${className}`.trim()}
    >
      <div className="flex items-center justify-center gap-4">
        <Link className="hover:text-slate-700" href="/terms">
          Terms
        </Link>
        <Link className="hover:text-slate-700" href="/privacy">
          Privacy
        </Link>
        <Link className="hover:text-slate-700" href="/refund">
          Refund
        </Link>
      </div>
    </footer>
  );
}

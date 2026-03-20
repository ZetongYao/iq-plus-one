import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
          <svg
            className="h-8 w-8 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
          Checkout Cancelled
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-500">
          Your brain remains at baseline. The universe respects your timing.
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

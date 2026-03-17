import Link from "next/link";
import { LogoutButton } from "./logout-button";

type AuthNavProps = {
  userEmail?: string | null;
};

export function AuthNav({ userEmail }: AuthNavProps) {
  if (!userEmail) {
    return (
      <div className="flex items-center justify-end gap-3 text-sm">
        <Link
          href="/login"
          className="rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 text-sm">
      <Link
        href="/purchase-history"
        className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
      >
        {userEmail}
      </Link>
      <LogoutButton />
    </div>
  );
}

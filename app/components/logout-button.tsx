import { logout } from "../auth/actions";

type LogoutButtonProps = {
  className?: string;
};

export function LogoutButton({ className = "" }: LogoutButtonProps) {
  return (
    <form action={logout}>
      <button
        type="submit"
        className={`rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 ${className}`.trim()}
      >
        Logout
      </button>
    </form>
  );
}

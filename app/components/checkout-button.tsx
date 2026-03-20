"use client";

import { useState } from "react";

export function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCheckout() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/checkout", { method: "POST" });
      const data = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !data.url) {
        throw new Error(
          data.error || "Unable to start checkout. Please try again.",
        );
      }

      window.location.href = data.url;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to start checkout. Please try again.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-violet-500/15 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
      >
        {isLoading ? "Redirecting\u2026" : "Get Blessed \u2014 $1"}
      </button>

      {errorMessage ? (
        <p className="text-sm text-rose-600" aria-live="polite">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

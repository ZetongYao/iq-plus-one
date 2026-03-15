"use client";

import { useState } from "react";

export function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCheckout() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to start checkout.";

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
        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-base font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {isLoading ? "Redirecting to Stripe..." : "Pay $1 for a Blessing"}
      </button>

      {errorMessage ? (
        <p className="text-sm text-rose-600" aria-live="polite">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

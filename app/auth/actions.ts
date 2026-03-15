"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

function buildRedirectPath(
  pathname: string,
  type: "error" | "message",
  message: string,
) {
  const params = new URLSearchParams({
    [type]: message,
  });

  return `${pathname}?${params.toString()}`;
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(buildRedirectPath("/login", "error", "Email and password are required."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(buildRedirectPath("/login", "error", error.message));
  }

  redirect("/account");
}

export async function signup(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(
      buildRedirectPath("/signup", "error", "Email and password are required."),
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(buildRedirectPath("/signup", "error", error.message));
  }

  if (data.session) {
    redirect("/account");
  }

  redirect(
    buildRedirectPath(
      "/login",
      "message",
      "Account created. If email confirmation is enabled, please check your inbox before signing in.",
    ),
  );
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

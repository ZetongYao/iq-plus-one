"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateProfileDisplayName } from "../../lib/profiles";
import { createClient } from "../../lib/supabase/server";

function buildRedirectPath(messageType: "error" | "message", message: string) {
  const params = new URLSearchParams({
    [messageType]: message,
  });

  return `/account?${params.toString()}`;
}

export async function saveProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName = String(formData.get("display_name") ?? "").trim();

  try {
    await updateProfileDisplayName(user.id, displayName);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to update your profile right now.";

    redirect(buildRedirectPath("error", message));
  }

  revalidatePath("/account");
  redirect(buildRedirectPath("message", "Profile updated successfully."));
}

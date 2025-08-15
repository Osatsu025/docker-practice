"use server";

import { revalidatePath } from "next/cache";
import { FormState } from "./createUser";
import { redirect } from "next/navigation";

export async function updateUser(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const password_confirmation = formData.get("password_confirmation");

  const body = password ? {name, email, password, password_confirmation} : { name, email };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { message: `更新に失敗しました: ${errorData.message || res.statusText}`, error: true };
    }
  } catch (e) {
    const message = e instanceof Error ? e.message: "不明なエラーが発生しました";
    return { message: `更新に失敗しました: ${message}`, error: true };
  }

  revalidatePath("/users");
  redirect("/users");
}
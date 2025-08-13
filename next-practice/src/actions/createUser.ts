"use server";

import { revalidatePath } from "next/cache";

export type FormState = {
  message: string;
  error?: boolean;
};

export async function createUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const password_confirmation = formData.get("password_confirmation");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { message: `登録に失敗しました: ${errorData.message || res.statusText}`, error: true };
    }

    revalidatePath("/users");
    return { message: "登録に成功しました！" };
  } catch (e) {
    const message = e instanceof Error ? e.message : "不明なエラーが発生しました";
    return { message: `登録に失敗しました: ${message}`, error: true };
  }
}
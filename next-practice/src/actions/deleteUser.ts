"use server";

import { revalidatePath } from "next/cache";
import { FormState } from "./createUser";

export async function deleteUser(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const idStr = formData.get("id");
  if (!idStr) {
    return { message: "IDがありません。", error: true };
  }
  const id = Number(idStr);
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: res.statusText }));
      return { message: `削除に失敗しました: ${errorData.message}`, error: true };
    }

    // revalidatePath("/users");
    return { message: "ユーザーを削除しました。" };
  } catch (e) {
    const message = e instanceof Error ? e.message: "不明なエラーが発生しました";
    return { message: `削除に失敗しました: ${message}`, error: true };
  }
}
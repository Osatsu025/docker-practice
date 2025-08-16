"use client";

import { FormState } from "@/actions/createUser";
import { deleteUser } from "@/actions/deleteUser";
import { useRouter } from "next/navigation";
import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";

const initialState: FormState = {
  message: "",
  error: false,
};

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        color: "blue",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      {pending ? "削除中…" : "削除"}
    </button>
  );
}

export function DeleteForm({ userId }: { userId: number }) {
  const [state, formAction] = useActionState(deleteUser, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message && !state.error) {
      // 削除成功のメッセージが一瞬表示された後、ページをリフレッシュする
      const timer = setTimeout(() => {
        router.refresh();
      }, 3000);  // 3秒後にリフレッシュ
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!confirm("本当にこのユーザを削除しますか？")) {
      event.preventDefault();
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} style={{ display: "inline-block" }}>
      <input type="hidden" name="id" value={userId} />
      <DeleteButton />
      {state.message && (
        <span style={{ marginLeft: '0.5rem', color: state.error ? 'red' : 'green' }}>{state.message}</span>
      )}
    </form>
  )
}
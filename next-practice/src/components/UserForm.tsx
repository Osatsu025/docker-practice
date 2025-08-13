"use client";

import { createUser, FormState } from "@/actions/createUser";
import { useFormState, useFormStatus } from "react-dom";

const initialState: FormState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}>
      {pending ? '登録中...' : '登録'}
    </button>
  );
}

export function UserForm() {
  const [ state, formAction ] = useFormState(createUser, initialState);

  return (
    <form action={formAction} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px'}}>
      <h2>新規ユーザ登録</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div>
          <label htmlFor="name">名前</label>
          <input type="text" id="name" name="name" required style={{ marginLeft: '0.5rem', padding: '0.25rem' }} />
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" required style={{ marginLeft: '0.5rem', padding: '0.25rem'}} />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input type="password" id="password" name="password" required style={{ marginLeft: '0.5rem', padding: '0.25rem' }} />
        </div>
        <div>
          <label htmlFor="password_confirmation">パスワード(確認):</label>
          <input type="password" id="password_confirmation" name="password_confirmation" required style={{ marginLeft: '0.5rem', padding: '0.25rem' }} />
        </div>
      </div>
      <SubmitButton />
      {state.message && (
        <p style={{ color: state.error ? 'red' : 'green', marginTop: '1rem' }}>
          {state.message}
        </p>
      )}
    </form>
  )
}
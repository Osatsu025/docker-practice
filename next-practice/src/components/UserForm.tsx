"use client";

import { useFormState, useFormStatus } from "react-dom";
import { FormState } from "@/actions/createUser"; // createUserとupdateUserで共通のFormStateを使う想定

type User = {
  id: number;
  name: string;
  email: string;
};

type UserFormProps = {
  formAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initialState: FormState;
  user?: User;
  buttonText: string;
  pendingButtonText: string;
  title: string;
};

function SubmitButton({ text, pendingText }: { text: string, pendingText: string}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}>
      {pending ? pendingText : text}
    </button>
  );
}

export function UserForm({ formAction, initialState, user, buttonText, pendingButtonText, title }: UserFormProps) {
  const [ state, dispatch ] = useFormState(formAction, initialState);
  const isCreate = !user;

  return (
    <form action={dispatch} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px'}}>
      <h2>新規ユーザ登録</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div>
          <label htmlFor="name">名前</label>
          <input type="text" id="name" name="name" defaultValue={user?.name} required style={{ marginLeft: '0.5rem', padding: '0.25rem' }} />
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" defaultValue={user?.email} required style={{ marginLeft: '0.5rem', padding: '0.25rem'}} />
        </div>
        <div>
          <label htmlFor="password">パスワード:</label>
          <input type="password" id="password" name="password" required={isCreate} style={{ marginLeft: '0.5rem', padding: '0.25rem' }} />
        </div>
        <div>
          <label htmlFor="password_confirmation">パスワード(確認):</label>
          <input type="password" id="password_confirmation" name="password_confirmation" required={isCreate} style={{ marginLeft: '0.5rem', padding: '0.25rem' }} />
        </div>
      </div>
      <SubmitButton text={buttonText} pendingText={pendingButtonText} />
      {state.message && (
        <p style={{ color: state.error ? 'red' : 'green', marginTop: '1rem' }}>
          {state.message}
        </p>
      )}
    </form>
  )
}
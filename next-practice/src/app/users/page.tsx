// next-practice/src/app/api/users/page.tsx
import Link from "next/link";
import { UserForm } from "@/components/UserForm";
import { createUser, FormState } from "@/actions/createUser";
import { deleteUser } from "@/actions/deleteUser";
import { DeleteForm } from "@/components/DeleteForm";

const initialState: FormState = {
  message: "",
  error: false,
};

type User = {
  id: number;
  name: string;
  email: string;
};

async function getUsers(): Promise<User[]> {
  // このfetchはサーバサイドで実行されるため、ブラウザにURLは公開されません。
  // 環境変数もサーバサイドのものを使えます。
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
    // SSRするたびに最新のデータを取得するためにキャッシュを無効化
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}. Body: ${errorBody}`);
  }

  return res.json();
}



export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main style={{ padding: '2rem' }}>
      <UserForm
        formAction={createUser}
        initialState={initialState}
        title="新規ユーザ登録"
        buttonText="登録"
        pendingButtonText="登録中..."
      />
      <h1>ユーザ一覧</h1>
      <ul style={{ marginTop: '1rem' }}>
        {users.map((user) => (
          <li key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>{user.name}({user.email})</span>
            <Link href={`/users/${user.id}/edit`} style={{ textDecoration: 'underline', color: 'blue' }}>
              編集
            </Link>
            <DeleteForm userId={user.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}

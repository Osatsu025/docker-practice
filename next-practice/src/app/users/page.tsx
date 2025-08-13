// next-practice/src/app/api/users/page.tsx
import { UserForm } from "@/components/UserForm";


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
      <UserForm />
      <h1>ユーザ一覧</h1>
      <ul style={{ marginTop: '1rem' }}>
        {users.map((user) => (
          <li key={user.id}>{user.name}({user.email})</li>
        ))}
      </ul>
    </main>
  );
}

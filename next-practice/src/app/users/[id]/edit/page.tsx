import { UserForm } from "@/components/UserForm";
import { updateUser } from "@/actions/updateUser";
import { FormState } from "@/actions/createUser";

const initialState: FormState = {
  message: "",
  error: false,
};

type User = {
  id: number;
  name: string;
  email: string;
};

async function getUser(id: number): Promise<User> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  return res.json();
}

export default async function UserEditPage({ params }: { params: { id: number} }) {
  const user = await getUser(params.id);

  // updateUserアクションにIDを束縛(bind)する
  const updateUserWithId = updateUser.bind(null, user.id);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>ユーザ編集</h1>
      <UserForm
        formAction={updateUserWithId}
        initialState={initialState}
        user={user}
        title="ユーザ情報更新"
        buttonText="更新"
        pendingButtonText="更新中…"
      />
    </main>
  );
}
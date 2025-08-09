'use client';

// import Image from "next/image";
import { useEffect, useState } from "react";

type ApiResponse = {
  message: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

export default function HomePage() {
  const [ data, setData ] = useState<ApiResponse | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);
  const [ users, setUsers ] = useState<User[]>([]);

  useEffect(() => {
    // Next.jsのAPIルートを呼び出す
    // フルパスではなく、ルートからのパスでOK
    fetch('/api/hello')
      .then(res => {
        if (!res.ok) {
          throw new Error('Next.jsのAPIルートからの応答に失敗しました');
        }
        return res.json();
      })
      .then((apiData: ApiResponse) => {
        // Laravelからのメッセージをstateにセット
        setData(apiData);
      })
      .catch(err => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);  // 空の配列を渡すことで、コンポーネントが最初に表示されたときだけ実行される

  
  const getUsers = () => {
    setLoading(true);
    setError(null);
    fetch('/api/users')
      .then(res => {
        if (!res.ok) {
          throw new Error('ユーザの取得に失敗しました');
        }
        return res.json();
      })
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch(err => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return <p>ローディング中…</p>
  }

  if (error) {
    return <p>エラー: {error}</p>
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Next.jsからLaravelへの連携テスト</h1>
      <p>
        Laravelからのメッセージ: <strong>{data?.message}</strong>
      </p>
      <button onClick={getUsers}>ユーザ一覧を取得</button>
      {users.length > 0 && (
        <ul style={{ marginTop: '1rem' }}>
          {users.map((user) => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      )}
    </main>
  )
}

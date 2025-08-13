import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>ホームページ</h1>
      <p>
        <Link href="/users">ユーザ一覧へ</Link>
      </p>
    </main>
  )
}
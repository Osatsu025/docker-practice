export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    // Laravelからのレスポンスが成功したかチェック
    if (!res.ok) {
      // サーバーサイドのコンソールにエラー内容を記録
      const errorBody = await res.text();
      console.error(`Error from Laravel API: ${res.status} ${res.statusText}`, { body: errorBody });

      // クライアントには適切なステータスコードと汎用的なエラーメッセージを返す
      return new Response(JSON.stringify({ message: 'Failed to fetch users from backend' }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('Failed to fetch from Laravel API:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
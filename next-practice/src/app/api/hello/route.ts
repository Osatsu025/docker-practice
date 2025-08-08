export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hello`);
  const data = await res.json();

  return Response.json(data);
}
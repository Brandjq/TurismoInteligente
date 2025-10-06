export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  if (!url) return Response.json({ error: 'Missing url' }, { status: 400 });

  const res = await fetch(url);
  const data = await res.json();
  return Response.json(data);
}

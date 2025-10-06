export async function POST(request) {
  const { query } = await request.json();
  const apiKey = process.env.PERPLEXITY_API_KEY;

  const res = await fetch('https://api.perplexity.ai/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      max_results: 10,
      country: 'GT'
    })
  });

  const data = await res.json();
  return Response.json(data);
}

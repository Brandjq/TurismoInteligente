export async function POST(request) {
  const { prompt } = await request.json();
  const apiKey = process.env.PERPLEXITY_API_KEY;

  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'pplx-70b-online',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();
  return Response.json(data);
}

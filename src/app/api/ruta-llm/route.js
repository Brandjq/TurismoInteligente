// Ejemplo de consumo de la API de OpenAI desde un endpoint Next.js

export async function POST(request) {
  const body = await request.json();
  const apiKey = process.env.OPENAI_API_KEY;

  let promptText = '';
  if (body.prompt) {
    // Si el usuario envió un prompt personalizado, úsalo
    promptText = body.prompt + '\nSolo lugares y restaurantes de Sololá. Devuelve el resultado en formato JSON como se indicó.';
  } else if (body.actividades) {
    promptText = `
Eres un asistente turístico experto en Sololá, Guatemala. El usuario quiere un itinerario inteligente solo en Sololá, basado en estas actividades favoritas: ${Array.isArray(body.actividades) ? body.actividades.join(', ') : ''}.
Genera un itinerario para ${body.dias || 1} días, asignando por día al menos 2 a 3 actividades diferentes (si es solo 1 día, incluye al menos 3 actividades o más). Para cada actividad, incluye el link de Google Maps del lugar (campo "mapa", debe ser el link largo real, por ejemplo: https://www.google.com/maps/place/NOMBRE_DEL_LUGAR o https://www.google.com/maps?q=LAT,LONG). No uses links cortos ni dinámicos. Para cada día, incluye lugares reales, actividades, tiempos estimados, distancias, recomendaciones de comida y cómo llegar (lancha, carro, etc). Devuelve el resultado en formato JSON así:
{
  "itinerario": [
    {
      "dia": 1,
      "actividades": [
        {
          "actividad": "nombre de la actividad",
          "lugar": "nombre del lugar",
          "descripcion": "breve descripción",
          "tiempo_estimado": "minutos",
          "distancia": "km",
          "restaurante_cercano": "nombre y breve descripción",
          "transporte": "lancha, carro, etc",
          "mapa": "URL larga real de Google Maps"
        }
      ],
      "recomendacion": "opcional"
    }
    // ...más días...
  ]
}
Solo lugares y restaurantes de Sololá.
`;
  } else {
    // Si no hay datos válidos, responde vacío
    return Response.json({ itinerario: [] });
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: promptText }],
      temperature: 0.7
    })
  });

  let itinerario = [];
  let rawContent = '';
  try {
    const data = await res.json();
    // Debug: muestra la respuesta completa en consola
    console.log('Respuesta OpenAI:', data);
    // Si la respuesta no tiene choices o content, muestra error
    if (!data.choices || !data.choices[0]?.message?.content) {
      return Response.json({
        itinerario: [],
        raw: 'Error: No se recibió respuesta válida del modelo. Revisa tu API key, el modelo, o el prompt.'
      });
    }
    const content = data.choices[0].message.content;
    rawContent = content;
    // Intenta extraer el JSON del contenido (mejor tolerancia a respuestas largas)
    let jsonStr = '';
    const match = content.match(/\{[\s\S]*\}/);
    if (match) {
      jsonStr = match[0];
    } else {
      // Intenta buscar JSON aunque esté cortado por tokens
      const start = content.indexOf('{');
      const end = content.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        jsonStr = content.substring(start, end + 1);
      }
    }
    if (jsonStr) {
      try {
        // Si la respuesta es muy larga, elimina comentarios tipo // ... y líneas vacías
        const cleanJson = jsonStr
          .replace(/\/\/.*$/gm, '') // quita comentarios de línea
          .replace(/,\s*([\]}])/g, '$1') // quita comas finales inválidas
          .replace(/(\r?\n|\r)/g, ' '); // quita saltos de línea para evitar errores por respuestas largas
        const parsed = JSON.parse(cleanJson);
        itinerario = parsed.itinerario || [];
      } catch (err) {
        // Si el JSON está mal formado, intenta parsear por partes (recuperar lo que se pueda)
        try {
          // Busca el array de días manualmente
          const diasMatch = cleanJson.match(/"itinerario"\s*:\s*(\[[\s\S]*\])/);
          if (diasMatch) {
            const diasStr = diasMatch[1]
              .replace(/,\s*([\]}])/g, '$1')
              .replace(/(\r?\n|\r)/g, ' ');
            const diasParsed = JSON.parse(diasStr);
            itinerario = diasParsed;
          } else {
            return Response.json({ itinerario: [], raw: content });
          }
        } catch {
          return Response.json({ itinerario: [], raw: content });
        }
      }
    } else {
      // Si el modelo no responde en JSON, muestra el texto crudo para depurar
      return Response.json({ itinerario: [], raw: content });
    }
  } catch (err) {
    return Response.json({
      itinerario: [],
      raw: 'Error al procesar la respuesta del modelo o la API de OpenAI.'
    });
  }
  // Devuelve también el contenido crudo para depuración
  return Response.json({ itinerario, raw: rawContent });
}

// Sí, en teoría tu endpoint está funcionando y consulta la API de OpenAI correctamente.
// Si el modelo responde con texto pero no con JSON, revisa el contenido de 'raw' en el frontend para depurar el prompt.
// Sí, en teoría tu endpoint está funcionando y consulta la API de OpenAI correctamente.
// Si el modelo responde con texto pero no con JSON, revisa el contenido de 'raw' en el frontend para depurar el prompt.


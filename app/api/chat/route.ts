import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/system-prompt';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const ultimoMensaje = messages?.[messages.length - 1]?.content || '';

    if (!ultimoMensaje) {
      return new Response(
        JSON.stringify({ error: 'No se envió ninguna pregunta.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: SYSTEM_PROMPT,
      prompt: ultimoMensaje,
    });

    return new Response(
      JSON.stringify({ content: text }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : String(error);
    console.error('Error en /api/chat:', error);

    return new Response(
      JSON.stringify({ error: 'Ocurrió un error en la consulta.', detail: mensaje }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
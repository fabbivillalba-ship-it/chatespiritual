import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Procesar la confirmación del pago recibida del webhook
    console.log("Evento recibido del webhook:", body.meta?.event_name);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error en webhook:", error);
    return NextResponse.json(
      { error: "Error interno del webhook" }, 
      { status: 500 }
    );
  }
}
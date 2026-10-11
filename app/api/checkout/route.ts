import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // ID del ítem de Paddle
    const priceId = "pri_01m4nqp5q7aa57zj7xpys4wxe8";

    // Si estás usando la URL directa del checkout de Paddle:
    // Podés redirigir al usuario al link de pago de Paddle o devolver la respuesta requerida
    return NextResponse.json({ 
      success: true, 
      priceId 
    });
  } catch (error) {
    console.error("Error en checkout:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud de pago" }, 
      { status: 500 }
    );
  }
}
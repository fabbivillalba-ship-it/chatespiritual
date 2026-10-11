// Funciones de utilidad para el sistema

export async function verificarAcceso() {
  // Al no requerir autenticación, permitimos el acceso directo
  return { autorizado: true };
}

export function fechaDeHoy(): string {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}
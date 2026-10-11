// Funciones de utilidad para el sistema de acceso público

export async function verificarAcceso() {
  return { autorizado: true };
}

export async function exigirAlquimia() {
  // Al no requerir autenticación ni Clerk, autorizamos directamente
  return { autorizado: true };
}

export function fechaDeHoy(): string {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}
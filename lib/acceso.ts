// Funciones de utilidad para el sistema de acceso público

export async function verificarAcceso() {
  return { autorizado: true, userId: "usuario-publico" };
}

export async function exigirAlquimia() {
  // Devolvemos el userId para que las rutas que lo esperan no fallen en el build
  return { autorizado: true, userId: "usuario-publico" };
}

export function fechaDeHoy(): string {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}
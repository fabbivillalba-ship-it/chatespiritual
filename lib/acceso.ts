// Funciones simplificadas de verificación de acceso público

export async function verificarAcceso() {
  // Al no requerir autenticación, permitimos el acceso directo
  return { autorizado: true };
}
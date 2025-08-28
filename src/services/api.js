// Detectar automáticamente si estamos en desarrollo o producción
export const API_URL = process.env.REACT_APP_API_URL || "http://192.168.111.128/api";

// Para CRA, usa process.env.REACT_APP_API_URL
// export const API_URL = process.env.REACT_APP_API_URL || "http://192.168.111.128/api";

console.log(`Conectando a API: ${API_URL}`);
console.log(`Entorno: ${process.env.NODE_ENV}`);

// Función para manejar errores de fetch
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Error HTTP: ${response.status}`);
  }
  return response.json();
}

export async function getProcesses() {
  const res = await fetch(`${API_URL}/get_processes.php`);
  return await handleResponse(res);
}

export async function getQuestions(proceso_id) {
  const res = await fetch(`${API_URL}/get_questions.php?proceso_id=${proceso_id}`);
  return await handleResponse(res);
}

export async function saveUser(form) {
  const res = await fetch(`${API_URL}/save_user.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });
  return await handleResponse(res);
}

export async function saveResponses(usuario_id, proceso_id, respuestas) {
  const res = await fetch(`${API_URL}/save_responses.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id, proceso_id, respuestas })
  });
  return await handleResponse(res);
}

export async function saveSuggestion(usuario_id, area_id) {
  const res = await fetch(`${API_URL}/save_suggestion.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id, area_id })
  });
  return await handleResponse(res);
}

export async function getCareers(area_id) {
  const res = await fetch(`${API_URL}/get_careers.php?area_id=${area_id}`);
  return await handleResponse(res);
}

export async function getUser(usuario_id) {
  const res = await fetch(`${API_URL}/get_user.php?usuario_id=${usuario_id}`);
  return await handleResponse(res);
}

export async function getAreas() {
  try {
    const res = await fetch(`${API_URL}/get_areas.php`);
    const data = await handleResponse(res);

    if (data.status === "success" && Array.isArray(data.data)) {
      return data.data.map(area => ({
        id: Number(area.id),
        nombre: area.nombre,
        descripcion: area.descripcion,
      }));
    } else if (Array.isArray(data)) {
      // Para compatibilidad con versiones anteriores
      return data.map(area => ({
        id: Number(area.id),
        nombre: area.nombre,
        descripcion: area.descripcion,
      }));
    } else {
      console.error("Respuesta inválida del backend:", data);
      return [];
    }
  } catch (err) {
    console.error("Error al obtener áreas:", err);
    return [];
  }
}

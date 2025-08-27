const API_URL = "http://192.168.111.128/api";

export async function getProcesses() {
  const res = await fetch(`${API_URL}/get_processes.php`);
  return await res.json();
}

export async function getQuestions(proceso_id) {
  const res = await fetch(`${API_URL}/get_questions.php?proceso_id=${proceso_id}`);
  return await res.json();
}

export async function saveUser(form) {
  const res = await fetch(`${API_URL}/save_user.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  });
  return await res.json();
}

export async function saveResponses(usuario_id, proceso_id, respuestas) {
  const res = await fetch(`${API_URL}/save_responses.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id, proceso_id, respuestas })
  });
  return await res.json();
}

export async function saveSuggestion(usuario_id, area_id) {
  const res = await fetch(`${API_URL}/save_suggestion.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario_id, area_id })
  });
  return await res.json();
}

export async function getCareers(area_id) {
  const res = await fetch(`${API_URL}/get_careers.php?area_id=${area_id}`);
  return await res.json();
}

export async function getUser(usuario_id) {
  const res = await fetch(`${API_URL}/get_user.php?usuario_id=${usuario_id}`);
  return await res.json();
}

export async function getAreas() {
  try {
    const res = await fetch(`${API_URL}/get_areas.php`);
    const data = await res.json();

    if (data.status === "ok" && Array.isArray(data.areas)) {
      // Normalizamos id a número
      return data.areas.map(area => ({
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
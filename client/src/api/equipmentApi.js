const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function createEquipment(data) {
  // Ensure the payload matches backend expectations
  const payload = {
    name: data.name,
    category: data.category,
    location: data.location,
    status: data.status,
    lastMaintenanceDate: data.lastMaintenance, // Rename to match backend model
    notes: data.notes
  }

  const response = await fetch(`${API_BASE_URL}/equipment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to add equipment")
  }
  return response.json()
}

export async function updateEquipment(id,data) {
  const payload = {
    name: data.name,
    category: data.category,
    location: data.location,
    status: data.status,
    lastMaintenanceDate: data.lastMaintenance, // Rename to match backend model
    notes: data.notes
  };
  const response = await fetch(`${API_BASE_URL}/equipment/${id}`,{
    method: "PUT",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify(payload)
  });
  if(!response.ok){
    const error = await response.json();
    throw new Error(error.error || "Failed to update equipment status")
  }
  return response.json();
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createStaff(data) {
  const response = await fetch(`${API_BASE_URL}/staff`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      role: data.role,
      salary: parseFloat(data.salary),
      status: data.status,
      shift: {
        start: data.shiftStart,
        end: data.shiftEnd
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add staff");
  }
  return response.json();
}
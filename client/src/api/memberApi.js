const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createMember(data) {
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    membershipType: data.subscription, // match backend field
    membershipStartDate: data.dueDate, // match backend field
    status: data.status
  };

  const response = await fetch(`${API_BASE_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add member");
  }
  return response.json();
}
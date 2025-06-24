const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createMember(data) {
  console.log("Creating member with data:", data);
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    membershipType: data.subscription, // match backend field
    membershipStartDate: data.dueDate, // match backend field
    status: data.status
  };
  console.log("Payload for member creation:", payload);

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

export async function updateMember(id, data) {
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    membershipType: data.subscription,
    membershipStartDate: data.dueDate,
    status: data.status
  };
  const response = await fetch(`${API_BASE_URL}/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update member");
  }
  return response.json();
}
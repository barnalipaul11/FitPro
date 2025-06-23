export async function createStaff(data) {
  const response = await fetch("http://localhost:4000/api/staff", {
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
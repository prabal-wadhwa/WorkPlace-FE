const BASE_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async ({
  endpoint,
  method = "GET",
  body,
}) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (data.Status !== "Success") {
      throw new Error(data.Message || "Something went wrong");
    }

    return data;
  } catch (err) {
    console.error("API Error:", err.message);
    alert(err.message)
    throw err;
  }
};
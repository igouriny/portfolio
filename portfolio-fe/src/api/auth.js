const API_BASE_URL = "http://localhost:8080/api/v1";


export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Store the token
      localStorage.setItem("token", data.token);
      // Store a proper user object.
      // Use the values returned by your backend if available,
      // otherwise fall back to the provided username.
      localStorage.setItem(
        "user",
        JSON.stringify({ 
          username: data.username || username, 
          role: data.role || "USER" 
        })
      );
      return data;
    } else {
      const errorText = await response.text();
      throw new Error(errorText || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};



export const logoutUser = async () => {
  try {
    // Optionally, call your backend logout endpoint
    // (It might be used to invalidate tokens or simply log the event.)
    await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Logout endpoint error:", error);
    // Even if the backend call fails, proceed to clear client-side state.
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

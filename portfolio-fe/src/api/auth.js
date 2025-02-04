const API_BASE_URL = "http://localhost:8080/api/v1";  // Adjust the URL based on your backend setup

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed. Username may already be taken.");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify({ username }));
      return response.json();
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};

import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/login", {
      email,
      password,
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const {
      data: { userId },
    } = response.data;
    localStorage.setItem("userInfo", JSON.stringify(userId));

    return userId;
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
};

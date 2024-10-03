export const LoginUser = async (email: String, password: String) => {
  try {
    const res = await fetch(`http://localhost:5000/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      return false;
    }
    const token = await res.json();
    console.log(token);
    localStorage.setItem("Authorization", token);
    return true;
  } catch (error) {
    console.log("Error:", error);
    return false;
  }
};

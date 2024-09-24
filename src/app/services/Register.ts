const RegisterUser = async (
    name: String,
    email: String,
    password: String,
) => {
    try {
        const res = await fetch(`http://localhost:5000/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, email: email, password: password})
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};
import { backCode } from "./cart";

export const RegisterUser = async (
    name: String,
    email: String,
    password: String,
) => {
    try {
        const res = await fetch(`${backCode}/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name, email: email, password: password})
        });
        if (!res.ok) {
            return false
        }
        return true
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};
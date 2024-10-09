import { backCode } from "./cart";

export const  FindUser = async () => {
  const token = localStorage.getItem("Authorization") || "";
  const res = await fetch(`${backCode}/user/get`, {
    method: "GET",
    headers: { "Content-Type": "application/json", authToken: token }
  });
  const data = await res.json();
  return data;
};


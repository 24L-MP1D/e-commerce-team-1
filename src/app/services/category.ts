import { backCode } from "./cart";

export const getCategories = async () => {
  try {
    const res = await fetch(`${backCode}/product/category/list`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = res.json();
    return data;
  } catch (error) {
    console.error("front end", error);
  }
};

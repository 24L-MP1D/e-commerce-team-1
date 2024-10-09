export const backCode = "http://localhost:5001";

export const getCartItems = async () => {
  const token = localStorage.getItem("Authorization") || "";
  try {
    const res = await fetch(`${backCode}/getCart`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authToken: token }
    });
    if (!res.ok) {
      console.log("backend alda ym shigee");
      return [];
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const deleteCartItems = async (productId: string, size: string) => {
  console.log(productId, size);
  const token = localStorage.getItem("Authorization") || "";
  try {
    const res = await fetch(`${backCode}/deleteCartItem`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authToken: token },
      body: JSON.stringify({
        productId,
        size
      })
    });
    if (!res.ok) {
      console.error("backend error");
    }
  } catch (e) {
    console.error("failed ", e);
  }
};

export const addToCart = async (
  productId: string,
  size: string,
  quantity: number
) => {
  console.log(productId, size);
  const token = localStorage.getItem("Authorization") || "";
  try {
    const res = await fetch(`${backCode}/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: token
      },
      body: JSON.stringify({
        productId,
        size,
        quantity
      })
    });
    if (!res.ok) {
      console.error("backend error");
    }
  } catch (e) {
    console.error(e);
  }
};

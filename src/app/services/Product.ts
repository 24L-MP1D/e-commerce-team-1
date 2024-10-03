export const changeSavedProduct = async (proId: string, saved: boolean) => {
  const token = localStorage.getItem("Authorization") || "";
  try {
    const res = await fetch(
      `http://localhost:5000/product/${(!saved && `save`) || `unsave`}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", authToken: token },
        body: JSON.stringify({
          productId: proId,
        }),
      }
    );
    console.log(proId, saved);
  } catch (error) {
    console.error("meedq:", error);
    return [];
  }
};

export const getProductData = async (
  category: string[],
  size: string[],
  id: string
) => {
  const token = localStorage.getItem("Authorization") || "";
  try {
    const res = await fetch(`http://localhost:5000/product/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authToken: token },
      body: JSON.stringify({ categoryId: category, size: size, id: id }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("FrontEnd error: ", error);
    return [];
  }
};

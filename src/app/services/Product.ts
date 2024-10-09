export const changeSavedProduct = async (proId: string, saved: boolean) => {
  const token = localStorage.getItem("Authorization") || "";
  try {
    const res = await fetch(
      `http://localhost:5000/product/${(!saved && `save`) || `unsave`}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", authToken: token },
        body: JSON.stringify({
          productId: proId
        })
      }
    );
    console.log(proId, saved);
  } catch (error) {
    console.error("meedq:", error);
    return [];
  }
};

export const getProductData = async (
  category: string[] | undefined,
  size: string[] | undefined,
  id: string | undefined,
  name: string | undefined
) => {
  const token = localStorage.getItem("Authorization") || "";
  try {
    let filter = {};
    if (category) {
      filter = { ...filter, categoryId: category };
    }
    if (size) {
      filter = { ...filter, size: size };
    }
    if (id) {
      filter = { ...filter, id: id };
    }
    if (name) {
      filter = { ...filter, name: name };
    }
    console.log(filter);
    const res = await fetch(`http://localhost:5000/product/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authToken: token },
      body: JSON.stringify(filter)
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

export const getSavedProducts = async () => {
  const token = localStorage.getItem("Authorization") || "";
  try {
    const res = await fetch(`http://localhost:5000/product/getSaved`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authToken: token }
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();

    return data;
  } catch (e) {
    console.error("imma not fix it so figure it by urself ", e);
    return [];
  }
};

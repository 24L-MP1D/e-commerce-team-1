export const getProductData = async () => {
  try {
    const res = await fetch("/Product.json");

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("meedq:", error);
    return [];
  }
};

export const addSavedProduct = async (id: string, saved: boolean) => {
  try {
    // const res = await fetch("/Saved.json", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ id: id })
    // });

    // if (!res.ok) {
    //   throw new Error(`meedq: ${res.status}`);
    // }
    console.log(id, saved);
  } catch (error) {
    console.error("meedq:", error);
    return [];
  }
};

export const getProductByCategory = async (
  category: string[],
  size: string[]
) => {
  try {
    const res = await fetch(`http://localhost:5000/product/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId: category, size: size }),
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

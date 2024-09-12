export const getProductData = async () => {
  try {
    const res = await fetch("/Product.json");

    if (!res.ok) {
      throw new Error(`meedq: ${res.status}`);
    }

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

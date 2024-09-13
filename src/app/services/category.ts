export const getCategories = async () => {
  try {
    const res = await fetch(`/category.json`);
    const data = res.json();
    return data;
  } catch (error) {
    console.error("front end", error);
  }
};

"use client";
import { useEffect, useState } from "react";
import { getCategories } from "../services/category";

import { Checkbox } from "@/components/ui/checkbox";
import { getProductByCategory } from "../services/Product";

import { useRouter } from "next/navigation";

type Category = {
  name: string;
};

export default function Home() {
  return (
    <div className="w-full max-w-[1040px] flex gap-5 m-auto ">
      <div className="flex-col gap-12 flex">
        <Categories />
        <Size />
      </div>
    </div>
  );
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const router = useRouter();
  const getCategoryList = async () => {
    setCategories(await getCategories());
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold">Ангилал</span>
      <div className="flex gap-2 font-medium items-center"></div>
      {categories.map((Category) => (
        <div
          key={Category.name}
          className="flex gap-2 font-medium items-center"
        >
          <Checkbox
            onCheckedChange={async (e) => {
              const updatedCategories = e
                ? [Category.name, ...activeCategories]
                : activeCategories.filter((name) => Category.name !== name);

              setActiveCategories(updatedCategories);

              router.push(`?tag=${updatedCategories.join(",")}`);

              // Ensure that the products are fetched based on the latest activeCategories
              await getProductByCategory(updatedCategories, ["x"]);
            }}
          />
          <span>{Category.name}</span>
        </div>
      ))}
    </div>
  );
};

const Size = () => {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold">Хэмжээ</span>
      {sizes.map((size) => (
        <div className="flex gap-2 items-center">
          <Checkbox /> <span>{size}</span>
        </div>
      ))}
    </div>
  );
};

const sizes = ["Free", "S", "M", "L", "XL", "2XL", "3XL"];

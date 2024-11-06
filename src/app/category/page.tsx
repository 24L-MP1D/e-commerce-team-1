"use client";
"use client";
import { useEffect, useState } from "react";
import { getCategories } from "../services/category";
import { Checkbox } from "@/components/ui/checkbox";
import { getProductData } from "../services/Product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Item, Loading } from "../page";
import path from "path";

type Category = {
  name: string;
};

export default function Home() {
  const [data, setData] = useState([]);
  const search = useSearchParams();

  const categories =
    search
      .get("cats")
      ?.split(",")
      .filter((item) => item != "") || [];
  const sizes =
    search
      .get("sizes")
      ?.split(",")
      .filter((item) => item != "") || [];

  const loadData = async () => {
    const data = await getProductData(categories, sizes);

    setData(data);
  };

  useEffect(() => {
    loadData();
  }, [search]);

  if(!data.length){
    return <Loading/>
  }

  return (
    <div className="w-full max-w-[1040px] flex gap-5 mx-auto mt-14 mb-28">
      <div className="flex-col gap-12 flex">
        <Categories />
        <Size sizes={["Free", "S", "M", "L", "XL", "2XL", "3XL"]} />
      </div>
      <div className="grid grid-cols-3 gap-[21px]">
        {data.map((item) => (
          <Item key={item._id} data={item} className="" likeable={true} />
        ))}
      </div>
    </div>
  );
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const search = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryList = await getCategories();
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (categoryName: string, isChecked: boolean) => {
    const updatedCategories = isChecked
      ? [...activeCategories, categoryName]
      : activeCategories.filter((name) => name !== categoryName);

    setActiveCategories(updatedCategories);

    let params = new URLSearchParams(search.toString());
    params.set("cats", updatedCategories.join(","));
    router.push(pathName + "?" + params);
  };

  return (
    <div className="flex flex-col gap-4 min-w-[245px]">
      <span className="font-bold">Ангилал</span>
      <div className="flex flex-col gap-2 font-medium">
        {categories.map((category) => (
          <div
            key={category}
            className="flex gap-2 items-center cursor-pointer"
            onClick={() =>
              handleCheckboxChange(
                category,
                !activeCategories.includes(category)
              )
            }
          >
            <Checkbox
              checked={activeCategories.includes(category)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(category.name, checked)
              }
            />
            <span>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

type SizeProps = {
  sizes: string[];
};

const Size = ({ sizes }: SizeProps) => {
  const search = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const [activeSizes, setActiveSizes] = useState<string[]>([]);

  const handleCheckboxChange = (size: string, isChecked: boolean) => {
    const selectedSizes = isChecked
      ? [...activeSizes, size]
      : activeSizes.filter((aSize) => aSize !== size);
    setActiveSizes(selectedSizes);
    const params = new URLSearchParams(search.toString());
    params.set("sizes", selectedSizes.join(","));
    router.push(pathName + "?" + params);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="font-bold">Хэмжээ</span>
      {sizes.map((size) => (
        <div
          key={size}
          className="flex gap-2 items-center"
          onClick={() => {
            handleCheckboxChange(size, !activeSizes.includes(size));
          }}
        >
          <Checkbox
            onCheckedChange={(checked) => {
              handleCheckboxChange(size, activeSizes.includes(checked));
            }}
            checked={activeSizes.includes(size)}
          />
          <span>{size}</span>
        </div>
      ))}
    </div>
  );
};

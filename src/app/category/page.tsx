"use client"; // This line must be the first line in your component file
import { Suspense, useEffect, useState } from "react";
import { getCategories } from "../services/category";
import { Checkbox } from "@/components/ui/checkbox";
import { getProductData } from "../services/Product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loading } from "@/components/loading";
import { Item } from "@/components/item";

// Home page, where useSearchParams() is used

export default function Home () {
  return <Suspense>
<FML/>
  </Suspense>
}

function FML() {
  const [data, setData] = useState<any[]>([]);

  // Define search params
  const search = useSearchParams();
  const categories =
    search.get("cats")?.split(",").filter((item) => item !== "") || [];
  const sizes =
    search.get("sizes")?.split(",").filter((item) => item !== "") || [];

  const loadData = async () => {
    const data = await getProductData(categories, sizes);
    setData(data);
  };

  useEffect(() => {
    loadData();
  }, [categories, sizes]);

  if (!data || !data.length) {
    return <Loading />;
  }

  return (
    <Suspense>
    <div className="w-full max-w-[1040px] flex gap-5 mx-auto mt-14 mb-28">
      <div className="flex-col gap-12 flex">
        <Suspense fallback={<Loading />}>
          <Categories />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Size sizes={["Free", "S", "M", "L", "XL", "2XL", "3XL"]} />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-[21px]">
        {data.map((item) => (
          <Item key={item._id} data={item} likeable={true} className="" />
        ))}
      </div>
    </div>
    </Suspense>
  );
}

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategories, setActiveCategories] = useState<any[]>([]);

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

  const handleCheckboxChange = (categoryName: string, isChecked: any) => {
    const updatedCategories = isChecked
      ? [...activeCategories, categoryName]
      : activeCategories.filter((name) => name !== categoryName);

    setActiveCategories(updatedCategories);

    // Update URL params with selected categories
    const params = new URLSearchParams(search.toString());
    params.set("cats", updatedCategories.join(","));
    router.push(pathName + "?" + params);
  };

  return (
    <div className="flex flex-col gap-4 min-w-[245px]">
      <span className="font-bold">Ангилал</span>
      <div className="flex flex-col gap-2 font-medium">
        {categories.map((category) => (
          <div
            key={category.name} // assuming category has a 'name' property
            className="flex gap-2 items-center cursor-pointer"
            onClick={() =>
              handleCheckboxChange(
                category.name, // Pass the category name
                !activeCategories.includes(category.name) // Toggle the category
              )
            }
          >
            <Checkbox
              checked={activeCategories.includes(category.name)} // Should be strictly a boolean
              onCheckedChange={(checked) =>
                handleCheckboxChange(category.name, checked) // Update active state
              }
            />
            <span>{category.name}</span> {/* Display the category name */}
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

  const [activeSizes, setActiveSizes] = useState<any[]>([]);

  const handleCheckboxChange = (size: string, isChecked: any) => {
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

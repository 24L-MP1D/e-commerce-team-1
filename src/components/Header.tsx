"use client";

import { useEffect, useState } from "react";

import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import {
  checkTokenValidation,
  useLoginContext
} from "@/app/context/LoginWrapper";
import { getProductData } from "@/app/services/Product";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    setIsLoggedIn(checkTokenValidation());
  }, []);
  const [name, setName] = useState("");

  return (
    <main className="bg-black fixed w-full z-50 top-0">
      <div className="max-w-[1100px] m-auto flex p-4">
        <div className="flex pl-2">
          <img src="Logo.png" alt="Logo" />
          <h1 className="text-white mt-2 ml-2">ECOMMERCE</h1>
          <a href="/category" className="text-white pl-4 mt-2">
            Ангилал
          </a>
        </div>
        <div className="m-auto">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-[250px] h-7 p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-900 text-white"
              placeholder="Бүтээгдэхүүн хайх"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={"/saved"}>
            <FaRegHeart className="text-white size-6 mt-2" />
          </Link>

          <a href="/purchase">
            <FaShoppingCart className="text-white size-6 mt-2" />
          </a>
          {isLoggedIn ? (
            <Link href="/profile" className="context-center">
              <User size={24} className="text-white mt-2" />
            </Link>
          ) : (
            <>
              <Button
                className="border-2 border-blue-600 border-solid text-white font-bold py-2 px-4 rounded-full"
                asChild
              >
                <Link href="/register">Бүртгүүлэх</Link>
              </Button>
              <Button
                className="bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                asChild
              >
                <Link href="/login">Нэвтрэх</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {name && <SearchFoundItems name={name} reset={() => setName("")} />}
    </main>
  );
}

const SearchFoundItems = ({ name, reset }: { name: string; reset: any }) => {
  const [data, setDate] = useState([]);

  const updateSearch = async () => {
    const productData = await getProductData(
      undefined,
      undefined,
      undefined,
      name
    );
    setDate(productData);
  };

  useEffect(() => {
    updateSearch();
  }, [name]);
  return (
    <div className="fixed w-full h-full bg-[#00000099]">
      <div className="w-full max-w-[600px] rounded-[16px] mx-auto p-8 flex flex-col gap-4 bg-[#FFFFFF]">
        {data.map((item) => (
          <Item item={item} reset={reset} />
        ))}
        {data && <div>Search again pls</div>}
      </div>
    </div>
  );
};

const Item = ({ item, reset }: { item: any; reset: any }) => {
  const router = useRouter();
  const moveToSelectedProd = () => {
    router.push(`/product/${item._id}`);
    reset();
  };
  return (
    <div className="flex gap-6" onClick={moveToSelectedProd}>
      <img
        src={item.images[0]}
        className="object-cover size-20 rounded-[16px]"
      />
      <div className="flex flex-col gap-1">
        <span>{item.productName}</span>
        <span className="font-bold">{item.price}</span>
      </div>
    </div>
  );
};

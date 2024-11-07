"use client";

import React, { ReactNode, useEffect, useState } from "react";

import heroImgUrl from "./assets/E-Commerce/image1174.png";
import punchbag from "./assets/E-Commerce/image.png";

import Link from "next/link";
import { Heart } from "lucide-react";

import { changeSavedProduct, getProductData } from "./services/Product";
import { Spinner } from "@/components/spinner";
import { Item } from "@/components/item";
import { Loading } from "@/components/loading";

type Product = {
  _id: string;
  productName: string;
  categoryId: string;
  price: number;
  qty: number;
  thumbnails: string;
  images: string[];
  coupon: string;
  salePercent: string;
  description: string;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  size: string;
  isSelected: boolean;
};

const Hero = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const loadData = async () => {
    setProducts(await getProductData([], [], ""));
  };
  useEffect(() => {
    loadData();
  }, []);
  if (products.length == 0) {
    return <div></div>;
  }

  const fixedPrice: number =
    products[0].price *
    ((products[0].salePercent &&
      1 - Number(products[0].salePercent.slice(0, -1)) / 100) ||
      1);
  return (
    <Link href={`/product/${products[0]._id}`}>
      <div
        className="w-full h-[500px] relative rounded-[16px]"
        style={{
          backgroundImage: `url(${products[0].images[0] || heroImgUrl.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col absolute left-8 bottom-8">
          <span className="text-lg">{products[0].productName}</span>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">{fixedPrice}₮</span>
          </div>
        </div>
      </div>
    </Link>
  );
};


const ItemShowUp = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const loadData = async () => {
    setProducts(await getProductData([], [], ""));
  };
  useEffect(() => {
    loadData();
  }, []);

  if (!products.length){
    return <Loading/>
  }

  return (
    <div className="grid grid-cols-4 gap-x-5 gap-y-12 mt-4 mb-25">
      {products.slice(1).map((product, index) => {
        const isSpecial = index === 6 || index === 7;

        return (
          <Item
            likeable={!isSpecial}
            className={isSpecial ? "col-span-2 row-span-2" : ""}
            key={product._id}
            data={product}
          />
        );
      })}
    </div>
  );
};



export default function Home() {
  return (
    <div className="max-w-[1040px] m-auto my-14">
      <Hero />
      <ItemShowUp />
    </div>
  );
}

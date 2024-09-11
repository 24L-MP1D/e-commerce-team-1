"use client";

import React, { ReactNode } from "react";
import heroImgUrl from "./assets/E-Commerce/image1174.png";
import products from "./assets/Product-Dummy-Data/Product.json";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <div
      className="w-full h-[500px] relative rounded-[16px]"
      style={{
        backgroundImage: `url(${heroImgUrl.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col absolute left-8 bottom-8">
        <span className="text-lg">Wildflower Hoodie</span>
        <span className="text-4xl font-bold">120'000T</span>
      </div>
    </div>
  );
};

interface Props {
  size: string;
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
}

const Item = ({ _id, price }: Props) => {
  {
    products.map((product) => console.log(product));
  }
  return;
};

const ItemShowUp = () => {
  return (
    <div>
      {products.map((product) => {
        return <span>sa</span>;
      })}
    </div>
  );
};

export default function Home() {
  console.log(products);

  return (
    <div className="max-w-[1040px] m-auto my-14">
      <Hero />
      <ItemShowUp />
    </div>
  );
}

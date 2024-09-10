"use client";

import React from "react";
import heroImgUrl from "./assets/E-Commerce/image1174.png";
import products from "./assets/Product-Dummy-Data/Product.json";

const Hero = () => {
  console.log(products);
  return (
    <div
      className="w-full h-[500px] relative rounded-[16px]"
      style={{
        backgroundImage: `url(${heroImgUrl.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
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

const Item = () => {
  return;
};

export default function Home() {
  console.table("HOME component rendered");

  return (
    <div className="max-w-[1040px] m-auto my-14">
      <Hero />
      asdas1111
    </div>
  );
}

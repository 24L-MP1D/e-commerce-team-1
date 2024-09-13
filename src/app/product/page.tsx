"use client";

import React, { useState } from "react";
import products from "../assets/Product-Dummy-Data/Product.json";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Product {
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

export default function Home() {
  const [saved, setSaved] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    products[0]
  );

  const handleClick = () => {
    setSaved(!saved);
  };

  const handleProductChange = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) setSelectedProduct(product);
  };

  if (!selectedProduct) return <p>Loading...</p>;

  return (
    <div className="mx-auto items-center flex flex-col gap-20 mt-[68px]">
      <div>
        <div className="flex gap-5">
          <div className="flex-col flex gap-y-2 pt-[100px]">
            <div className="w-[67px] h-[67px] bg-gray-500 rounded"></div>
            <div className="w-[67px] h-[67px] bg-gray-500 rounded"></div>
            <div className="w-[67px] h-[67px] bg-gray-500 rounded"></div>
            <div className="w-[67px] h-[67px] bg-gray-500 rounded"></div>
          </div>
          <div
            className="w-[422px] h-[521px] bg-gray-500 rounded-2xl"
            style={{
              backgroundImage: `url(${selectedProduct.thumbnails})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="flex flex-col gap-6 pt-[100px]">
            <div>
              <Badge
                variant="outline"
                className="rounded-full border border-[#2563EB]"
              >
                Шинэ
              </Badge>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="text-2xl font-bold">
                  {selectedProduct.productName}
                </p>
                <div className="p-2">
                  <Heart
                    onClick={handleClick}
                    fill={saved ? "black" : "none"}
                    className="transition-colors duration-300"
                  />
                </div>
              </div>
              <p className="text-base">{selectedProduct.description}</p>
              <p className="text-sm underline">Хэмжээний заавар</p>
              <div className="flex flex-col">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {/* Placeholder for size options or color swatches */}
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border border-1"
                    ></div>
                  ))}
                </div>
                <div className="flex flex-row gap-2">
                  <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                    -
                  </div>
                  <div className="w-8 h-8 rounded-full border border-none flex items-center justify-center">
                    1
                  </div>
                  <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                    +
                  </div>
                </div>
              </div>
              <p className="text-xl font-bold">{selectedProduct.price}₮</p>
              <div>
                <Button
                  variant="outline"
                  className="rounded-full px-9 py-2 text-white bg-[#2563EB] text-sm"
                >
                  Сагсанд нэмэх
                </Button>
              </div>
              <div className="flex gap-4 text-sm mt-[55px]">
                <p className="text-[#09090B]">Үнэлгээ</p>
                <button className="">бүгдийг харах</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-3xl font-bold">Холбоотой бараа</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[21px]">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-2xl w-[244px] h-[331px] bg-gray-500"
              style={{
                backgroundImage: `url(${product.thumbnails})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleProductChange(product._id)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

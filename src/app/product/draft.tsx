"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Rating from "./Rating"; // Adjust the import path as needed
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Review {
  reviewer: string;
  comment: string;
  rating: number; // Decimal rating
}

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
  reviews: Review[];
}

interface Size {
  size: string;
}

export default function Home() {
  const [saved, setSaved] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [chooseSize, setChooseSize] = useState<Size[]>([
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
    { size: "2XL" },
  ]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showReviews, setShowReviews] = useState(false);

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/Product.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
        setSelectedProduct(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = () => {
    setSaved(!saved);
  };

  const handleProductChange = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) setSelectedProduct(product);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
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
              <div>
                <div className="flex flex-col">
                  <div>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {chooseSize.map((size, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full border flex items-center text-xs justify-center cursor-pointer ${
                            selectedSize === size.size
                              ? "bg-black text-white"
                              : ""
                          }`}
                          onClick={() => handleSizeClick(size.size)}
                        >
                          {size.size}
                        </div>
                      ))}
                    </div>
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
                <button
                  onClick={toggleReviews}
                  className="text-blue-600 underline"
                >
                  {showReviews ? "бүгдийг хураах" : "бүгдийг харах"}
                </button>
                {showReviews && selectedProduct.reviews && (
                  <div className="mt-4">
                    {selectedProduct.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="mb-4 p-4 border border-gray-200 rounded"
                      >
                        <p className="font-semibold">{review.reviewer}</p>
                        <Rating rating={review.rating} />
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
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

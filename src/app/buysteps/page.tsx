"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Size {
  size: string;
  qty: number;
}

interface Product {
  _id: string;
  productName: string;
  categoryId: string;
  price: number;
  thumbnails: string;
  images: string[];
  coupon: string;
  salePercent: string;
  description: string;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  sizes: Size[];
}

interface ProductQuantityProps {
  product: Product;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  try {
    const response = await fetch("/api/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId, quantity }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

// Usage
addToCart("user123", "product456", 2);

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  product,
  quantity,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
          onClick={onDecrease}
        >
          -
        </div>
        <div className="w-8 h-8 rounded-full border border-none flex items-center justify-center">
          {quantity}
        </div>
        <div
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
          onClick={onIncrease}
        >
          +
        </div>
      </div>
    </div>
  );
};

export default function BuyStep() {
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="mx-auto items-center w-[638px] h-[664px] rounded-2xl border border-1 p-8">
      <p>1.  Сагс </p>
      <div className="w-[89.97%] h-[132px] border border-1 mx-auto flex rounded-2xl items-center">
        <div className="w-[100px] h-[100px] bg-gray-300 rounded-2xl"></div>
        <div className="flex flex-col">
          <p className="text-base ">{productName}</p>
          <div className="flex flex-row gap-2 mb-4">
            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer">
              -
            </div>
            <div className="w-8 h-8 rounded-full border border-none flex items-center justify-center">
              {quantity}
            </div>
            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer">
              +
            </div>
          </div>
          <p>{price}</p>
        </div>
        <div>
          <Trash2 strokeWidth={1} className="" />
        </div>
      </div>
    </div>
  );
}

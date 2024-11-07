"use client"

import { changeSavedProduct } from "@/app/services/Product";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


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

export const Item = ({
    data,
    className,
    likeable,
  }: {
    data: Product;
    className: string | "";
    likeable: boolean;
  }) => {
    const [saved, setSaved] = useState(data.isSelected);
    const fixedPrice: number =
      data.price *
      ((data.salePercent && 1 - Number(data.salePercent) / 100) || 1);
  
    return (
      <div className={`w-full flex flex-col gap-1 z-10 relative ${className} `}>
        <Link
          className="mg-1 rounded-[16px] overflow-hidden w-full"
          href={`/product/${data._id}`}
        >
          <img className="w-full" src={data.images[0]} />
        </Link>
  
        <span>{data.productName}</span>
        <div className="flex items-center gap-2">
          <span className="font-bold">{fixedPrice}₮</span>
          {data.salePercent && (
            <>
              <span className="line-through text-[12px] text-[#71717A]">
                {data.price}₮
              </span>
              <span className="text-[#EF4444] font-bold">{data.salePercent}</span>
            </>
          )}
        </div>
        {likeable && (
          <button
            onClick={() => {
              setSaved(!saved);
              changeSavedProduct(data._id, saved);
            }}
            className="z-50 right-2 top-2 absolute p-2"
          >
            <Heart fill={saved ? "black" : "none"} />
          </button>
        )}
      </div>
    );
  };
  
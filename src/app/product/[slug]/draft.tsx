"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Rating from "./Rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthProvider } from "./AuthContext";
import CommentSection from "./CommentSection";
import { useRouter } from "next/navigation";

interface Review {
  reviewer: string;
  comment: string;
  rating: number;
}

interface Size {
  Name: string;
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

export default function Home({ params }: { params: { slug: string } }) {
  const [saved, setSaved] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [chooseSize, setChooseSize] = useState<Size[]>([
    { size: "Free" },
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
    { size: "2XL" },
    { size: "3XL" },
  ]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/Product.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
        setSelectedProduct(
          data.find((item) => item._id == params.slug) || data[0]
        );
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
    if (product) {
      router.push(`${product._id}`);
      setQuantity(1);
    }
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const handleDecrease = () => {
    if (selectedProduct && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (selectedProduct && quantity < selectedProduct.qty) {
      setQuantity(quantity + 1);
    }
  };

  if (!selectedProduct) return <p>Loading...</p>;

  return (
    <div className="mx-auto items-center flex flex-col h-screen mt-[68px]">
      <div className="flex gap-5">
        {/*part-1 starts*/}
        <div className="flex gap-5 top-[100px]">
          <div className="flex-col flex gap-y-2 pt-[100px] sticky top-[100px]">
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
        </div>
        {/*part-1 ends*/}
        {/*part-2 starts*/}
        <div className="flex-1">
          <div className="flex flex-col gap-6 pt-[100px]">
            <div>
              <Badge
                variant="outline"
                className="rounded-full border border-[#2563EB]"
              >
                Шинэ
              </Badge>
            </div>
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
              <div className="flex flex-row gap-2 mb-4">
                {chooseSize.map((size, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full border flex items-center text-xs justify-center cursor-pointer ${
                      selectedSize === size.size ? "bg-black text-white" : ""
                    }`}
                    onClick={() => handleSizeClick(size.size)}
                  >
                    {size.size}
                  </div>
                ))}
              </div>
              <ProductQuantity
                product={selectedProduct}
                quantity={quantity}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
              />
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
            <div className="flex gap-4 text-sm">
              <AuthProvider>
                <CommentSection></CommentSection>
              </AuthProvider>
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
          {/*part-2 ends*/}
        </div>
      </div>
      <div className="flex flex-col gap-6 ">
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

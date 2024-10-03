"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Rating from "./Rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthProvider } from "./AuthContext";
import CommentSection from "./CommentSection";
import { useRouter } from "next/navigation";
import { Item } from "@/app/page";
import { getProductData } from "@/app/services/Product";

interface Review {
  reviewer: string;
  comment: string;
  rating: number;
}

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
  reviews?: Review[];
}

interface ProductQuantityProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [chooseSize, setChooseSize] = useState<Size[]>([
    { size: "Free", qty: 10 },
    { size: "S", qty: 5 },
    { size: "M", qty: 7 },
    { size: "L", qty: 3 },
    { size: "XL", qty: 2 },
    { size: "2XL", qty: 0 },
    { size: "3XL", qty: 1 },
  ]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductData([], [], "66fbcd7206efd3e91169ee50");
        const productList = await getProductData([], [], "");
        setProducts(productList);
        setSelectedProduct(data);
        setSelectedImage(data.images[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [params.slug]);

  const handleClick = () => {
    setSaved(!saved);
  };

  const handleProductChange = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      router.push(`${product._id}`);
      setQuantity(1);
      setSelectedSize(null);
    }
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
    const selectedSizeObj = chooseSize.find((s) => s.size === size);
    if (selectedSizeObj) {
      setQuantity(selectedSizeObj.qty);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    const selectedSizeObj = chooseSize.find((s) => s.size === selectedSize);
    if (selectedSizeObj && quantity < selectedSizeObj.qty) {
      setQuantity(quantity + 1);
    }
  };

  if (!selectedProduct) return <p>Loading...</p>;

  return (
    <div className="mx-auto items-center flex flex-col my-[68px]">
      <div className="flex gap-5">
        {/* Part 1 */}
        <div className="flex gap-5 top-[100px]">
          <div className="flex-col flex gap-y-2 pt-[100px] sticky top-[100px]">
            {/* Thumbnail previews */}
            {selectedProduct.images.map((img, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedImage(img);
                }}
              >
                <img
                  src={img}
                  className={`object-cover w-[67px] h-[67px] rounded-[4px] ${
                    img == selectedImage && "border-[1px] border-black"
                  }`}
                />
              </div>
            ))}
          </div>
          <div
            className="w-[422px] h-[521px] bg-gray-500 rounded-2xl"
            style={{
              backgroundImage: `url(${selectedImage})`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>
        {/* Part 2 */}
        <div className="flex-1">
          <div className="flex flex-col gap-6 pt-[100px]">
            <Badge
              variant="outline"
              className="rounded-full border border-[#2563EB]"
            >
              Шинэ
            </Badge>
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
                {chooseSize.map((sizeObj, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full border flex items-center text-xs justify-center cursor-pointer ${
                      selectedSize === sizeObj.size ? "bg-black text-white" : ""
                    }`}
                    onClick={() => handleSizeClick(sizeObj.size)}
                  >
                    {sizeObj.size}
                  </div>
                ))}
              </div>
              <ProductQuantity
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
                <CommentSection />
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
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-3xl font-bold">Холбоотой бараа</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[21px] max-w-[1039px]">
          {products.map((product: Product) => (
            <Item
              key={product._id}
              data={product}
              likeable={true}
              onClick={() => handleProductChange(product._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

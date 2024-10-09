"use client";

import imagesh from "../assets/E-Commerce/image.png";
import { ImGift } from "react-icons/im";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { addToCart, deleteCartItems, getCartItems } from "../services/cart";
const FirstStep = ({
  amountOfItems,
  amountPrice,
  nextStep
}: {
  amountOfItems: number;
  amountPrice: number;
  nextStep: any;
}) => {
  const [data, setData] = useState([
    { productId: { images: [], id: "" }, size: "", qty: 0 }
  ]);
  const getTotalAmount = (lis: []) => {
    let total = 0;
    for (let i in lis) {
      total += lis[i].qty * lis[i].productId.price;
    }
    console.log(data);
    return total;
  };
  const total = getTotalAmount(data);
  const getCart = async () => {
    setData(await getCartItems());
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="p-8 max-w-[638px] w-full flex flex-col gap-4">
      <div className="text-[20px]">
        <span className="font-bold ">1. Сагс</span>
        <span className="text-[#71717A]">({data.length})</span>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <StepOneItem
            name={item && item.productId.productName}
            amount={item.qty}
            price={item.productId.price}
            img={item.productId.images[0]}
            id={item.productId._id}
            size={item.size}
            reset={getCart}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <span className="text-lg">Нийт төлөх дүн:</span>
        <span className="font-bold text-[20px]">{total}₮</span>
      </div>
      <div className="flex flex-row-reverse">
        <button
          className="rounded-full bg-[#2563EB] text-[#FAFAFA] py-2 px-9"
          onClick={nextStep}
        >
          Худалдан авах
        </button>
      </div>
    </div>
  );
};

const StepOneItem = ({
  name,
  amount,
  price,
  img,
  id,
  size,
  reset
}: {
  name: string;
  amount: number;
  price: number;
  img: string;
  id: string;
  size: string;
  reset: any;
}) => {
  const [exist, setExist] = useState(true);

  if (!exist) {
    return <></>;
  }
  return (
    <div className="p-4 flex gap-6">
      <div className="size-[100px] rounded-[16px] overflow-hidden">
        <img src={img || imagesh.src} className="object-fill" />
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <span>
          {name} : {size}
        </span>
        <div className="flex">
          <button
            className="text-center content-center rounded-full border-[1px] border-[#18181B] size-8"
            onClick={async () => {
              await addToCart(id, size, -1);
              reset();
            }}
          >
            -
          </button>
          <div className="size-8 text-center content-center">{amount}</div>
          <button
            className="text-center content-center rounded-full border-[1px] border-[#18181B] size-8"
            onClick={async () => {
              await addToCart(id, size, 1);
              reset();
            }}
          >
            +
          </button>
        </div>
        <span className="font-bold text-base mt-1">{price}₮</span>
      </div>
      <div>
        <button
          className="p-2"
          onClick={async () => {
            await deleteCartItems(id, size);
            reset();
          }}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default FirstStep;

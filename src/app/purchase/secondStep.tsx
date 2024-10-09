"use client";

import PreviousMap from "postcss/lib/previous-map";
import imagesh from "../assets/E-Commerce/image.png";
import { useEffect, useState } from "react";
import { getCartItems } from "../services/cart";
import OrderDetailsWrapper, {
  useOrderDeatilsContext,
} from "../context/OrderDetails";

const SecondStep = ({
  amountOfItems,
  amountPrice,
  nextStep,
  previousStep,
}: {
  amountOfItems: number;
  amountPrice: number;
  nextStep: any;
  previousStep: any;
}) => {
  return (
    <div className="flex gap-5 min-w-[1040px]">
      <Basket amountOfItems={amountOfItems} />
      <OrderInfo nextStep={nextStep} previousStep={previousStep} />
    </div>
  );
};

const Basket = ({ amountOfItems }: { amountOfItems: number }) => {
  const [data, setData] = useState([
    { productId: { images: [], id: "", price: 0 }, size: "", qty: 0 },
  ]);
  const getTotalAmount = (lis: []) => {
    let total = 0;
    for (let i in lis) {
      total += lis[i].qty * lis[i].productId.price;
    }
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
    <div className="flex flex-col gap-4 py-8 px-6 max-w-[333px]">
      <div className="text-[20px]">
        <span className="font-bold ">1. Сагс </span>
        <span className="text-[#71717A]">({data.length})</span>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <SecondStepItem
            name={`${item.productId.productName} : ${item.size}`}
            qty={item.qty}
            price={item.productId.price}
            image={item.productId.images[0]}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <span>Нийт төлөх дүн:</span>
        <span className="font-bold">{total}₮</span>
      </div>
    </div>
  );
};

const SecondStepItem = ({
  name,
  qty,
  price,
  image,
}: {
  name: string;
  qty: number;
  price: number;
  image: string;
}) => {
  return (
    <div className=" flex gap-6 border-b-[1px] border-dashed">
      <div className="rounded-[16px] overflow-hidden size-[80px]">
        <img src={image || imagesh.src} />
      </div>
      <div className="flex flex-col gap-1 mb-6">
        <span>{name}</span>
        <span>
          {qty} x {price}₮
        </span>
        <span className="font-bold">{`Total price: ${qty * price}₮`}</span>
      </div>
    </div>
  );
};

const OrderInfo = ({
  nextStep,
  previousStep,
}: {
  nextStep: any;
  previousStep: any;
}) => {
  const orderDetails = useOrderDeatilsContext();
  console.log(orderDetails.data);
  return (
    <div className="p-8 flex flex-col gap-6 flex-1">
      <span className="font-semibold text-lg">
        2. Хүргэлтийн мэдээлэл оруулах
      </span>
      <div className="flex flex-col gap-2 ">
        <span>Овог:</span>
        <input
          placeholder="Овог"
          className="rounded-[18px] py-1 px-3 border-[1px] border-[#E4E4E7]"
          onChange={(e) => {
            orderDetails.setData({
              ...orderDetails.data,
              lastName: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <span>Нэр:</span>
        <input
          placeholder="Нэр"
          className="rounded-[18px] py-1 px-3 border-[1px] border-[#E4E4E7]"
          onChange={(e) => {
            orderDetails.setData({
              ...orderDetails.data,
              name: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <span>Утасны дугаар:</span>
        <input
          type="number"
          placeholder=""
          className="rounded-[18px] py-1 px-3 border-[1px] border-[#E4E4E7]"
          onChange={(e) => {
            orderDetails.setData({
              ...orderDetails.data,
              phoneNumber: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <span>Хаяг:</span>
        <textarea
          className="rounded-[18px] py-2 px-3 border-[1px] border-[#E4E4E7] h-[94px] resize-none"
          onChange={(e) => {
            orderDetails.setData({
              ...orderDetails.data,
              address: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <span>Нэмэлт мэдээлэл:</span>
        <textarea
          className="rounded-[18px] py-2 px-3 border-[1px] border-[#E4E4E7] h-[94px] resize-none"
          onChange={(e) => {
            orderDetails.setData({
              ...orderDetails.data,
              info: e.target.value,
            });
          }}
        />
        <span className="text-[#71717A] text-[12.8px]">
          Хүргэлттэй холбоотой нэмэлт мэдээлэл үлдээгээрэй
        </span>
      </div>
      <div className="flex justify-between ">
        <button
          className="py-2 px-9 rounded-[18px] border-[#E4E4E7] border-[1px]"
          onClick={previousStep}
        >
          Буцах
        </button>
        <button
          className="py-2 px-9 rounded-[18px] bg-[#2563EB] text-white"
          onClick={() => {
            nextStep();
          }}
        >
          Төлбөр төлөх
        </button>
      </div>
    </div>
  );
};

export default SecondStep;

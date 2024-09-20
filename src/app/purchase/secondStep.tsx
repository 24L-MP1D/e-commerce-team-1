"use client";

import PreviousMap from "postcss/lib/previous-map";
import imagesh from "../assets/E-Commerce/image.png";
import { useState } from "react";

const SecondStep = ({
  amountOfItems,
  amountPrice,
  nextStep,
  previousStep
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
  return (
    <div className="flex flex-col gap-4 py-8 px-6 max-w-[333px]">
      <div className="text-[20px]">
        <span className="font-bold ">1. Сагс</span>
        <span className="text-[#71717A]">({amountOfItems})</span>
      </div>
      <div className="flex flex-col gap-4">
        {<SecondStepItem name="Chunky Glyph Tee" />}
      </div>
      <div className="flex justify-between">
        <span>Нийт төлөх дүн:</span>
        <span className="font-bold">120’000₮</span>
      </div>
    </div>
  );
};

const SecondStepItem = ({ name }: { name: string }) => {
  return (
    <div className=" flex gap-6 border-b-[1px] border-dashed">
      <div className="rounded-[16px] overflow-hidden size-[80px]">
        <img src={imagesh.src} />
      </div>
      <div className="flex flex-col gap-1 mb-6">
        <span>{name}</span>
        <span>
          {`a`} x {`p`}
        </span>
        <span className="font-bold">{`Total price`}</span>
      </div>
    </div>
  );
};

const OrderInfo = ({
  nextStep,
  previousStep
}: {
  nextStep: any;
  previousStep: any;
}) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [additional, setAdditional] = useState("");
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
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <span>Нэр:</span>
        <input
          placeholder="Нэр"
          className="rounded-[18px] py-1 px-3 border-[1px] border-[#E4E4E7]"
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <span>Утасны дугаар:</span>
        <input
          type="number"
          placeholder=""
          className="rounded-[18px] py-1 px-3 border-[1px] border-[#E4E4E7]"
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <span>Хаяг:</span>
        <textarea className="rounded-[18px] py-2 px-3 border-[1px] border-[#E4E4E7] h-[94px] resize-none" />
      </div>
      <div className="flex flex-col gap-2 ">
        <span>Нэмэлт мэдээлэл:</span>
        <textarea className="rounded-[18px] py-2 px-3 border-[1px] border-[#E4E4E7] h-[94px] resize-none" />
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
          onClick={nextStep}
        >
          Төлбөр төлөх
        </button>
      </div>
    </div>
  );
};

export default SecondStep;

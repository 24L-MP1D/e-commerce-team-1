"use client";

import imagesh from "../assets/E-Commerce/image.png";
import { ImGift } from "react-icons/im";
import { Trash } from "lucide-react";
import { useState } from "react";

const FirstStep = ({
  amountOfItems,
  amountPrice,
  nextStep
}: {
  amountOfItems: number;
  amountPrice: number;
  nextStep: any;
}) => {
  return (
    <div className="p-8 max-w-[638px] w-full flex flex-col gap-4">
      <div className="text-[20px]">
        <span className="font-bold ">1. Сагс</span>
        <span className="text-[#71717A]">({amountOfItems})</span>
      </div>
      <div className="flex flex-col gap-4">
        {<StepOneItem name="Chunky Glyph Tee" amount={2} price={120000} />}
      </div>
      <div className="flex justify-between">
        <span className="text-lg">Нийт төлөх дүн:</span>
        <span className="font-bold text-[20px]">{amountPrice}₮</span>
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
  price
}: {
  name: string;
  amount: number;
  price: number;
}) => {
  return (
    <div className="p-4 flex gap-6">
      <div className="size-[100px] rounded-[16px] overflow-hidden">
        <img src={imagesh.src} className="object-fill" />
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <span>{name}</span>
        <div className="flex">
          <button
            className="text-center content-center rounded-full border-[1px] border-[#18181B] size-8"
            onClick={() => {}}
          >
            -
          </button>
          <div className="size-8 text-center content-center">{amount}</div>
          <button className="text-center content-center rounded-full border-[1px] border-[#18181B] size-8">
            +
          </button>
        </div>
        <span className="font-bold text-base mt-1">{price}₮</span>
      </div>
      <div>
        <button className="p-2">
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default FirstStep;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

import imagish from "../assets/E-Commerce/image.png";

const Home = () => {
  const [active, setActive] = useState("info");
  const router = useRouter();
  const pathName = usePathname();
  const changeSelected = (select: string) => {
    setActive(select);
    router.push(pathName + "?selected=" + select);
  };

  return (
    <div className="h-[100vh] w-full">
      <div className="max-w-[884px] mx-auto flex gap-5 mt-[104px]">
        <div className="flex-col flex gap-1 min-w-[244px]">
          <button
            onClick={() => changeSelected("info")}
            className={`text-sm py-2 px-8 rounded-[16px] text-start ${
              active == "info" && "bg-[#FFFFFF]"
            }`}
          >
            Хэрэглэгчийн хэсэг
          </button>
          <button
            onClick={() => changeSelected("history")}
            className={`text-sm py-2 px-8 rounded-[16px] text-start ${
              active == "history" && "bg-[#FFFFFF]"
            }`}
          >
            Захиалгын түүх
          </button>
        </div>
        <Hero />
      </div>
    </div>
  );
};

const Hero = () => {
  const search = useSearchParams();
  const result = search.get("selected");
  if (result == "history") {
    return <History />;
  }
  return <Info />;
};
const Info = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <span className=" font-bold text-lg">Хэрэглэгчийн хэсэг</span>
      <div className="h-[1px] w-full bg-[#E4E4E7]" />
      <div className="text-sm flex flex-col gap-4">
        <InputWithLabel name="Овог" type="text" address={false} />
        <InputWithLabel name="Нэр" type="text" address={false} />
        <InputWithLabel name="Утасны дугаар" type="number" address={false} />
        <InputWithLabel name="Имэйл хаяг" type="email" address={false} />
        <InputWithLabel name="Хаяг" type="text" address={true} />
      </div>
      <button className="rounded-full bg-[#2563EB] px-9 py-2 text-[#FAFAFA] self-end">
        Мэдээлэл шинэчлэх
      </button>
    </div>
  );
};

const History = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <span>Захиалгын түүх</span>
      <div className="h-[1px] w-full bg-[#E4E4E7]" />
      {days.map((day) => {
        const total = 0;

        return (
          <div className="rounded-[16px] bg-[#FFFFFF] py-8 px-6">
            <Accordion type="single" collapsible key={day} className="">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-[#000000] font-bold text-base">
                  {day}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 border-b-[1px] border-[#E4E4E7] border-dashed pb-6">
                    <OrderItem
                      name="Chunky Glyph Tee"
                      img_url=""
                      quantity={2}
                      price={1200}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-between items-center">
              <span className="">Үнийн дүн:</span>
              <span className="font-bold text-lg text-base">{total}₮</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const days = ["2024-09-03", "2024-08-23"];

const InputWithLabel = ({
  name,
  type,
  address
}: {
  name: string;
  type: string;
  address: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-[#09090B]">{name}:</span>
      <input
        type={type}
        className={`rounded-[18px] py-1 px-3 ${address && "h-[94px]"}`}
      />
    </div>
  );
};

const OrderItem = ({
  name,
  img_url,
  quantity,
  price
}: {
  name: string;
  img_url: string;
  quantity: number;
  price: number;
}) => {
  return (
    <div className="flex gap-2">
      <div className="size-9 rounded-[4px] overflow-hidden">
        <img src={imagish.src} />
      </div>
      <div className="flex flex-col gap-1 w- h-full flex-1">
        <span className="text-[12px]">{name}</span>
        <div className="flex justify-between items-center w-full">
          <span className="text-[12px]">
            {quantity} x {price}₮
          </span>
          <span className="font-bold">{quantity * price}₮</span>
        </div>
      </div>
    </div>
  );
};

export default Home;

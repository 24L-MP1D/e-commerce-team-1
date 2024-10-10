"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import imagish from "../assets/E-Commerce/image.png";
import { FindUser, editUser } from "../services/User";

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
              active === "info" && "bg-[#FFFFFF]"
            }`}
          >
            Хэрэглэгчийн хэсэг
          </button>
          <button
            onClick={() => changeSelected("history")}
            className={`text-sm py-2 px-8 rounded-[16px] text-start ${
              active === "history" && "bg-[#FFFFFF]"
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
  if (result === "history") {
    return <History />;
  }
  return <Info />;
};

const Info = () => {
  const formik = useFormik({
    initialValues: {
      surname: "",
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    validationSchema: yup.object({
      surname: yup.string().required("Required"),
      name: yup.string().required("Required"),
      phone: yup.string().required("Required"),
      email: yup.string().email("Invalid email format").required("Required"),
      address: yup.string(),
    }),
    onSubmit: () => {
      const { name, email, phone, address } = formik.values;
      editUser(name, email, phone, address);
    },
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      <span className="font-bold text-lg">Хэрэглэгчийн хэсэг</span>
      <div className="h-[1px] w-full bg-[#E4E4E7]" />
      <div className="text-sm flex flex-col gap-4">
        <InputWithLabel
          name="surname"
          type="text"
          address={false}
          onChange={formik.handleChange}
        />
        <InputWithLabel
          name="name"
          type="text"
          address={false}
          onChange={formik.handleChange}
        />
        <InputWithLabel
          name="phone"
          type="number"
          address={false}
          onChange={formik.handleChange}
        />
        <InputWithLabel
          name="email"
          type="email"
          address={false}
          onChange={formik.handleChange}
        />
        <InputWithLabel
          name="address"
          type="text"
          address={true}
          onChange={formik.handleChange}
        />
      </div>
      <button
        className="rounded-full bg-[#2563EB] px-9 py-2 text-[#FAFAFA] self-end"
        onClick={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        type="submit"
      >
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
          <div className="rounded-[16px] bg-[#FFFFFF] py-8 px-6" key={day}>
            <Accordion type="single" collapsible>
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
              <span>Үнийн дүн:</span>
              <span className="font-bold text-lg">{total}₮</span>
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
  address,
  onChange,
}: {
  name: string;
  type: string;
  address: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange type
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-[#09090B]">{name}:</span>
      <input
        name={name} // Set name attribute for Formik
        type={type}
        className={`rounded-[18px] py-1 px-3 ${address && "h-[94px]"}`}
        onChange={onChange}
      />
    </div>
  );
};

const OrderItem = ({
  name,
  img_url,
  quantity,
  price,
}: {
  name: string;
  img_url: string;
  quantity: number;
  price: number;
}) => {
  return (
    <div className="flex gap-2">
      <div className="size-9 rounded-[4px] overflow-hidden">
        <img src={imagish.src} alt={name} />
      </div>
      <div className="flex flex-col gap-1 w-full flex-1">
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

"use client";

import { useEffect, useState } from "react";
import { changeSavedProduct, getSavedProducts } from "../services/Product";
import LoginWrapper from "../context/LoginWrapper";
import { XyzTransition } from "@animxyz/react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Loading } from "../page";

export default function Page() {
  const [savedProds, setSavedProds] = useState([]);
  const [loading, setLoading] = useState(true)
  const getSavedItems = async () => {
    setSavedProds(await getSavedProducts());
    setLoading(false)
  };
  useEffect(() => {
    getSavedItems();

  }, []);

  if(loading){
    return <Loading/>
  }

  if(!savedProds.length){
    return <LoginWrapper>
      <div className="min-h-[calc(80vh)] w-full text-xl text-center content-center">
        Хадгалсан бараа олдсонгүй
      </div>
    </LoginWrapper>
  }
  return (
    <LoginWrapper>
      <div className="min-h-[calc(80vh)] w-full">
        <div className="mx-auto mt-[60px] mb-50 max-w-[622px] w-full flex flex-col gap-4">
          <span className="font-semibold text-xl">
            Хадгалсан бараа{" "}
            <span className="text-[#5E6166]">({savedProds.length})</span>
          </span>
          {savedProds.map((prod) => (
            <Item data={prod} update={getSavedItems} />
          ))}
        </div>
      </div>
    </LoginWrapper>
  );
}

const Item = ({ data, update }: { data: any; update: any }) => {
  const prod = data.product; // Get the product directly
  const [visible, setVisible] = useState(true);
  const router = useRouter()

  if (!prod) {
    return null; // Return null if product is not available
  }

  return (
    <div className="rounded-[16px] border-[#ECEDF0] border-[1px] p-4 flex gap-6 items-start">
      <img
        className="size-[100px] rounded-[16px] object-cover"
        src={prod.images[0] || ""}
        alt={prod.productName} // Add alt for accessibility
        onClick={()=>{router.push(`/product/${prod._id}`)}}
        
      />
      <div className="flex flex-col gap-1 items-start flex-1">
        <span>{prod.productName}</span>
        <span className="font-semibold">{prod.price}₮</span>
        <button className="bg-[#2563EB] rounded-full py-2 px-3 text-white text-sm mt-2">
          Сагслах
        </button>
      </div>
      <button
        className="p-2"
        onClick={async () => {
          await changeSavedProduct(prod._id, true);
          setVisible(false);
          update();
        }}
      >
        <Heart size={24} fill="true" />
      </button>
    </div>
  );
};

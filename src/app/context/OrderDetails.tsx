"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { FindUser } from "../services/User";

const OrderDetails = createContext<any>(undefined);

export default function OrderDetailsWrapper({ children }: { children: any }) {
  const [data, setData] = useState({
    name: "",
    lastName: "",
    phoneNumber: 0,
    address: "",
    info: ""
  });
  return (
    <OrderDetails.Provider value={{ data, setData }}>
      {children}
    </OrderDetails.Provider>
  );
}

export function useOrderDeatilsContext() {
  return useContext(OrderDetails);
}

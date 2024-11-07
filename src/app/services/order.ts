import { backCode } from "./cart";

export const addOrder = async (
  phoneNumber: number,
  address: string,
  info: string,
  amountPaid: number,
  orderType: string,
  details: any[]
) => {
  const token = localStorage.getItem("Authorization") || "";

  try {
    const res = await fetch(`${backCode}/order/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authToken: token },
      body: JSON.stringify({
        phoneNumber,
        description: `${address} \n ${info}`,
        amountPaid,
        orderType,
        details,
      }),
    });
    if (res.ok) {
      return true;
    }
  } catch (e) {
    console.error(e);
  }
};

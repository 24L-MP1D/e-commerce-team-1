import { QrCode } from "lucide-react";
import QRCode from "react-qr-code";
import { addOrder } from "../services/order";
import { useOrderDeatilsContext } from "../context/OrderDetails";
import { useEffect, useState } from "react";
import { getCartItems } from "../services/cart";

const ThirdStep = ({ preStep }: { preStep: any }) => {
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
  const updatedData = data.map((item) => ({
    qty: item.qty,
    size: item.size,
    id: item.productId._id,
  }));
  console.log(updatedData);
  const orderDetails = useOrderDeatilsContext();
  const { phoneNumber, address, info } = orderDetails.data;
  return (
    <div className="p-8 rounded-[16px]">
      <span className="font-semibold text-lg">3. Төлбөр төлөлт</span>
      <div className="py-9 flex flex-col gap-6">
        <div className="flex flex-col gap-5 items-center">
          <span className="py-1 px-2 text-[#18181B] bg-[#F4F4F5] rounded-full">
            14:59
          </span>
          <div>
            <QrCode size={187} values="Why ya do diz 2 me?" />
          </div>
        </div>
        <div className=" flex flex-col gap-5 items-center">
          <span>Төлөх боломжтой банкууд:</span>
          <div className="grid grid-cols-8 gap-6">
            {[...Array(13)].map((i, j) => (
              <button
                className="size-[46.88px] border-[1px] rounded-[4px]"
                key={j}
                onClick={() => {
                  addOrder(
                    phoneNumber,
                    address,
                    info,
                    total,
                    "Delivery",
                    updatedData
                  );
                }}
              >
                i
              </button>
            ))}
          </div>
        </div>
      </div>
      <div>
        <button
          className="py-2 px-9 rounded-full border-[1px] border-[#E4E4E7]"
          onClick={preStep}
        >
          Буцах
        </button>
      </div>
    </div>
  );
};

export default ThirdStep;

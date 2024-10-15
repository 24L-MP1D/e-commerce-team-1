"use client";

import { Check, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import OrderDetailsWrapper from "../context/OrderDetails";
import LoginWrapper from "../context/LoginWrapper";

const Home = () => {
  const search = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const [activeStep, setActiveStep] = useState(1);
  const [amountofItems, setAmount] = useState(0);

  useEffect(() => {
    router.push(pathName + "?" + `step=${activeStep}`);
  }, [activeStep]);

  return (
    <div className="min-h-[70vh]">
      <LoginWrapper>
        <div className=" flex flex-col gap-[58px] items-center m-auto mt-7 ">
          <OrderDetailsWrapper>
            <Step activeStep={activeStep} />
            {(activeStep == 1 && (
              <FirstStep
                amountOfItems={amountofItems}
                amountPrice={360000}
                nextStep={() => {
                  setActiveStep(activeStep + 1);
                }}
              />
            )) ||
              (activeStep == 2 && (
                <SecondStep
                  amountOfItems={amountofItems}
                  amountPrice={360000}
                  previousStep={() => {
                    setActiveStep(activeStep - 1);
                  }}
                  nextStep={() => {
                    setActiveStep(activeStep + 1);
                  }}
                />
              )) ||
              (activeStep == 3 && (
                <ThirdStep
                  preStep={() => {
                    setActiveStep(activeStep - 1);
                  }}
                />
              ))}
          </OrderDetailsWrapper>
        </div>
      </LoginWrapper>
    </div>
  );
};

const Step = ({ activeStep }: { activeStep: number }) => {
  const steps = [1, 2, 3];
  return (
    <div className="relative max-w-[256px] m-auto w-full content-center min-h-8">
      <div className=" bg-[#18181B] h-[1px] w-[80%] m-auto" />
      <div className="flex items-center justify-between w-full absolute inset-0">
        {steps.map((num) => (
          <div
            className={`size-8 rounded-full  text-center content-center border-[1px] ${
              activeStep < num
                ? `border-[#18181B] bg-[white]`
                : `bg-[#2563EB] text-[white] font-bold`
            }`}
          >
            {activeStep > num ? <Check size={16} className="m-auto" /> : num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

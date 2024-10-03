"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const { jwtDecode } = require("jwt-decode");

const LoginContext = createContext<any>(undefined);

export default function LoginWrapper({ children }: { children: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkToken = () => {
    const valid = checkTokenValidation();
    console.log("this fuck is not running");
    if (!valid) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <LoginContext.Provider value={{ value: isLoggedIn }}>
      <div className="flex flex-col">{children}</div>
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}

export const checkTokenValidation = () => {
  const token = localStorage.getItem("Authorization");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const isValid = decodedToken.exp * 1000 > Date.now();
      if (isValid) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
};

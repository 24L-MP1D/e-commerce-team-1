"use client";

import { createContext, useContext, useEffect, useState } from "react";

const { jwtDecode } = require("jwt-decode");

const LoginContext = createContext<any>(undefined);

export default function LoginWrapper({ children }: { children: any }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = () => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isValid = decodedToken.exp * 1000 > Date.now();
        if (isValid) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Token validation error:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <LoginContext.Provider value={{ value: isLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}

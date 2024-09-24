"use client";

import { useState } from "react"
import { RegisterUser } from "../services/Register";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  console.log({ name, email, password, passwordConfirm });

  // const lengthGreater = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  // const passwordisAreSame = password === passwordConfirm && password !== ""; 

  const emailIsValid = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email);
  const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar && name.length > 1 && emailIsValid;

  return <div className="m-auto h-[1100px] bg-gray-100">
    <h1 className="text-center pt-72 font-bold text-3xl mb-4">Бүртгүүлэх</h1>
    <div className="w-full max-w-sm min-w-[200px] m-auto">
      <input className="bg-white mb-6 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Нэр" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="bg-white mb-6 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        type="email" placeholder="Имэйл хаяг" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="bg-white mb-6 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        type="password" placeholder="Нууц үг" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className="bg-white mb-6 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        type="password" placeholder="Нууц үг давтах" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      <h4 className="ml-10 text-gray-500 pb-5">
        <ul className="list-disc">
          <li className={hasUppercase ? "text-green-600" : "text-red-600"}>Том үсэг орсон байх</li>
          <li className={hasLowercase ? "text-green-600" : "text-red-600"}>Жижиг үсэг орсон байх</li>
          <li className={hasNumber ? "text-green-600" : "text-red-600"}>Тоо орсон байх</li>
          <li className={hasSpecialChar ? "text-green-600" : "text-red-600"}>Тэмдэгт орсон байх</li>
        </ul>
      </h4>
      <button className="mb-16 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center disabled:opacity-30 disabled:cursor-not-allowed" onClick={()=>{RegisterUser(name, email, password)}} disabled={!isValid}>Үүсгэх</button>
      <button className="w-full border-2 border-blue-500 border-solid  text-blue-500 font-bold py-2 px-4 rounded-full">Нэвтрэх</button>
    </div>
  </div>
}
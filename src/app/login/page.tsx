"use client"

export default function Home() {
    return <div className="m-auto h-[1100px] bg-gray-100">
        <h1 className="text-center pt-96 font-bold text-3xl mb-4">Нэвтрэх</h1>
        <div className="w-full max-w-sm min-w-[200px] m-auto">
          <input className="bg-white mb-6 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Имэйл хаяг" />
          <input className="bg-white mb-6 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-3xl px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Нууц үг" />
          <button className="mb-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center">Нэвтрэх</button>
          <h4 className="mb-14 text-center underline text-gray-500">Нууц үг мартсан</h4>
          <button className="w-full border-2 border-blue-500 border-solid  text-blue-500 font-bold py-2 px-4 rounded-full">Бүртгүүлэх</button>
        </div>
    </div>
}
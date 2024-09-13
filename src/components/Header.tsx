import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
export default function Header() {
    return (
        <main className="bg-black">
            <div className="max-w-[1100px] m-auto flex p-4">
                <div className="flex pl-2">
                    <img src="Logo.png" />
                    <a href="/" className="text-white pl-4 mt-3">Ангилал</a>
                </div>
                <div className="m-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-[250px] h-7 p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-900 text-white" placeholder="Бүтээгдэхүүн хайх" required />
                    </div>
                </div>
                <div className="flex gap-3">
                    <FaRegHeart className="text-white size-6 mt-3" />
                    <FaShoppingCart className="text-white size-6 mt-3" />
                    <button className="border-2 border-blue-600 border-solid  text-white font-bold py-2 px-4 rounded-full">
                        Бүртгүүлэх
                    </button>
                    <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Нэвтрэх
                    </button>
                </div>
            </div>
        </main>
    )
}
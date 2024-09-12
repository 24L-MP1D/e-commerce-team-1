export default function Header() {
    return (
        <main className="max-w-[1100px] m-auto bg-black flex p-4">
            <div className="flex pl-2">
                <img src="Logo.png" />
                <h4 className="text-white pl-4 mt-1">АНГИЛАЛ</h4>
            </div>
            <div className="m-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-[250px] h-7 p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-900" placeholder="Бүтээгдэхүүн хайх" required />
                </div>
            </div>
            <div><h1 className="text-white">9hui</h1></div>
        </main>
    )
}
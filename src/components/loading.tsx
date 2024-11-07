import { Spinner } from "./spinner"

export const Loading = () => {
    return <div className="flex gap-4 items-center h-[60vh] justify-center text-xl"><Spinner/><span>Уншиж байна</span></div>
  }
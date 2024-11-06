import { CiPhone } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <main className="bg-black absolute w-full">
      <div className=" max-w-[1100px] m-auto p-4">
        <div className="flex pl-2 pt-10 space-x-[500px]">
          <div>
            <img src="Logo.png" />
          </div>
          <div className="flex">
            <CiPhone className="text-white size-6" />
            <h1 className="text-white ml-1">(976) 7007-1234</h1>
            <MdEmail className="text-white size-6  ml-8" />
            <h1 className="text-white ml-1">contact@ecommerce.mn</h1>
          </div>
        </div>
        <div className="flex text-white pl-2 pt-20 pb-10 space-x-[700px]">
          <h1>© 2024 Ecommerce MN</h1>
          <div className="flex text-white gap-2">
            <a href="/">
              <FaFacebook className="size-7" />
            </a>
            <a href="/">
              <FaInstagram className="size-7" />
            </a>
            <a href="/">
              <FaTwitter className="size-7" />
            </a>
            <a href="/">
              <FaLinkedin className="size-7" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

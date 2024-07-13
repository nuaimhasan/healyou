import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function Whatsapp({ wpLink }) {
  return (
    <Link
      to={wpLink}
      target="_blank"
      className="bg-[#25D366] w-[60px] h-[60px] rounded-full flex justify-center items-center"
    >
      <FaWhatsapp className="text-3xl text-base-100" />
    </Link>
  );
}

import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";

export default function Phone({ phone }) {
  return (
    <Link
      to={`tel:${phone}`}
      target="_blank"
      className="bg-[#0099ff] w-[60px] h-[60px] rounded-full flex justify-center items-center"
    >
      <FaPhoneAlt className="text-3xl text-base-100" />
    </Link>
  );
}

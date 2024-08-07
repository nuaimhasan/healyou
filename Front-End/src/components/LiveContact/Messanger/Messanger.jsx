import { Link } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";

export default function Messanger({ messangerLink }) {
  return (
    <Link
      to={messangerLink}
      target="_blank"
      className="bg-[#0099ff] w-[60px] h-[60px] rounded-full flex justify-center items-center"
    >
      <FaFacebookMessenger className="text-3xl text-base-100" />
    </Link>
  );
}

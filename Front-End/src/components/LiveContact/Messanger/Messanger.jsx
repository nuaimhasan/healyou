import { Link } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";
import { useGetContactsQuery } from "../../../Redux/contact/contactApi";

export default function Messanger() {
  const { data } = useGetContactsQuery();
  const messangerLink = data?.data[0]?.messangerLink;
  return (
    <div className="fixed z-40 bottom-10 left-8">
      <Link
        to={messangerLink}
        target="_blank"
        className="messanger pulse bg-[#0099ff]"
      >
        <FaFacebookMessenger className="text-lg" />
      </Link>
    </div>
  );
}

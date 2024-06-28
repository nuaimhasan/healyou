import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useGetContactsQuery } from "../../../Redux/contact/contactApi";

export default function Whatsapp() {
  const { data } = useGetContactsQuery();
  const wpLink = data?.data[0]?.wpLink;
  return (
    <div className="fixed z-40 bottom-32 left-8">
      <Link to={wpLink} target="_blank" className="whatsapp pulse bg-[#25D366]">
        <FaWhatsapp className="text-lg" />
      </Link>
    </div>
  );
}

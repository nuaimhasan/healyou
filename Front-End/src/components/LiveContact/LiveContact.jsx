import "./LiveContact.css";
import { MdMessage } from "react-icons/md";
import Messanger from "./Messanger/Messanger";
import Whatsapp from "./Whatsapp/Whatsapp";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Phone from "./Phone/Phone";
import { useGetContactsQuery } from "../../Redux/contact/contactApi";

export default function LiveContact() {
  const [show, setShow] = useState(false);
  const { data } = useGetContactsQuery();
  const messangerLink = data?.data[0]?.messangerLink;
  const wpLink = data?.data[0]?.wpLink;
  const phone = data?.data[0]?.phone;

  return (
    <div className="fixed z-40 bottom-4 left-4">
      <button
        onClick={() => setShow(!show)}
        className={`w-[60px] h-[60px] bg-blue-700 rounded-full flex justify-center items-center text-3xl text-base-100 ${
          show && "rotate-180 duration-300"
        }`}
      >
        {show ? <IoClose /> : <MdMessage />}
      </button>

      <div className={`mw_btn -z-10 ${show && "mw_btn_show"}`}>
        <Messanger messangerLink={messangerLink} />
        <Whatsapp wpLink={wpLink} />
        <Phone phone={phone} />
      </div>
    </div>
  );
}

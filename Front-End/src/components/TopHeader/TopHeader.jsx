import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaFacebook,
  FaLinkedin,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

import { MdEmail } from "react-icons/md";
import { useGetContactsQuery } from "../../Redux/contact/contactApi";

export default function TopHeader() {
  const { data: contactData } = useGetContactsQuery();
  const contact = contactData?.data[0];

  return (
    <section className="bg-secondary text-base-100 hidden sm:block py-1">
      <div className="container">
        <div className="flex justify-between items-center text-[13px]">
          {/* Left contact info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaPhoneAlt className="text-xs" />
              <p>{contact?.phone}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <MdEmail />
              <p>{contact?.email}</p>
            </div>
          </div>

          {/* Right Social icon */}
          <div className="flex gap-3 items-center text-lg">
            <Link to={contact?.facebookLink} target="_blank">
              <FaFacebook />
            </Link>
            <Link to={contact?.twitterLink} target="_blank">
              <FaSquareTwitter />
            </Link>
            <Link to={contact?.linkedinLink} target="_blank">
              <FaLinkedin />
            </Link>
            <Link to={contact?.youtubeLink} target="_blank">
              <FaYoutubeSquare />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

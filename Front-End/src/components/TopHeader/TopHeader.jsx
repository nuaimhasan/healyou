import { Link } from "react-router-dom";
import { FaPhoneAlt, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function TopHeader() {
  return (
    <section className="bg-secondary text-base-100 hidden sm:block py-1">
      <div className="container">
        <div className="flex justify-between items-center text-[13px]">
          {/* Left contact info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaPhoneAlt className="text-xs" />
              <p>+8801906-198021</p>
            </div>
            <div className="flex items-center gap-1.5">
              <MdEmail />
              <p>emanagerit@gmail.com</p>
            </div>
          </div>

          {/* Right Social icon */}
          <div className="flex gap-3 items-center text-lg">
            <Link to="" target="_blank">
              <FaFacebook />
            </Link>
            <Link to="" target="_blank">
              <FaSquareTwitter />
            </Link>
            <Link to="" target="_blank">
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import "./ServiceCard.css";
import { Link } from "react-router-dom";

export default function ServiceCard() {
  return (
    <div className="service_card shadow">
      <Link to="/service/1" className="block h-48 overflow-hidden">
        <img
          src="/images/Services/Graphic-designer.jpg"
          alt=""
          className="w-full h-full service_img duration-500"
        />
      </Link>
      <div className="p-4 pb-8">
        <Link to="/service/1">
          <h2 className="text-[19px] font-semibold duration-200 service_title">
            Graphic Design
          </h2>
        </Link>
        <p className="mt-2 text-xs text-neutral-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          adipisci...
        </p>
        <div className="mt-5">
          <Link to="/service/1" className="service_btn">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

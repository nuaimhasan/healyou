import "./ServiceCard.css";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <div className="service_card shadow">
      <Link
        to={`service/${service?._id}`}
        className="block h-48 overflow-hidden"
      >
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/services/${service?.image}`}
          alt=""
          className="w-full h-full service_img duration-500"
        />
      </Link>
      <div className="p-4 pb-8">
        <Link to={`service/${service?._id}`}>
          <h2 className="text-[19px] font-semibold duration-200 service_title text-primary">
            {service?.title}
          </h2>
        </Link>
        <p>Service Charge: {service?.charge}৳</p>
        <p className="mt-2 text-xs text-neutral-content">
          {service?.short_description?.length > 100
            ? service?.short_description.slice(0, 100) + "..."
            : service?.short_description}
        </p>
        <div className="mt-5">
          <Link to={`service/${service?._id}`} className="service_btn">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

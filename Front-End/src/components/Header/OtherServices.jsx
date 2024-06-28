import { Link } from "react-router-dom";
import { useGetOtherServiceQuery } from "../../Redux/otherService/otherServiceApi";

export default function OtherServicesDropdown({ otherServicseDropdown }) {
  const { data } = useGetOtherServiceQuery();
  const services = data?.data;

  return (
    <ol className={`dropdown ${otherServicseDropdown && "dropdown_show"}`}>
      {services?.map((service) => (
        <li key={service?._id}>
          <Link to={service?.link}>{service?.name}</Link>
        </li>
      ))}
    </ol>
  );
}

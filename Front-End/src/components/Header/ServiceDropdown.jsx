import { Link } from "react-router-dom";
import { useGetServicesQuery } from "../../Redux/service/service";

export default function ServiceDropdown({ serviceDropdown }) {
  const { data } = useGetServicesQuery();
  const services = data?.data;

  return (
    <ol className={`dropdown ${serviceDropdown && "dropdown_show"}`}>
      {services?.map((service) => (
        <li key={service?._id}>
          <Link to={`/service/${service?._id}`}>{service?.title}</Link>
        </li>
      ))}
    </ol>
  );
}

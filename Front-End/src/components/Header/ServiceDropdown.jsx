import { Link } from "react-router-dom";
import { useGetServiceCategoriesQuery } from "../../Redux/service/serviceCategoryApi";

export default function ServiceDropdown({ serviceDropdown }) {
  const { data } = useGetServiceCategoriesQuery();
  const services = data?.data;

  return (
    <ol className={`dropdown ${serviceDropdown && "dropdown_show"}`}>
      {services?.map((service) => (
        <li key={service?._id}>
          <Link to={`/services?c=${service?._id}`}>{service?.name}</Link>
        </li>
      ))}
    </ol>
  );
}

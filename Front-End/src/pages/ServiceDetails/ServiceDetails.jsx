import { useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../../Redux/service/service";
import perser from "html-react-parser";

export default function ServiceDetails() {
  window.scroll(0, 0);
  const { id } = useParams();
  const { data } = useGetSingleServiceQuery(id);
  const service = data?.data;
  const perserDescription =
    service?.description && perser(service?.description);

  return (
    <section className="py-5">
      <div className="container">
        <div>
          <div className="md:w-2/3 mx-auto">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/services/${
                service?.image
              }`}
              alt=""
              className="w-full sm:h-80 rounded"
            />
          </div>

          <div className="mt-4 text-center">
            <h2 className="text-xl md:text-4xl font-semibold text-primary">
              {service?.title}
            </h2>
            <p>Service Charge: {service?.charge}৳</p>

            <div className="mt-3 text-[15px] text-neutral">
              <p>{service?.short_description}</p>
              <p className="mt-3">{perserDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

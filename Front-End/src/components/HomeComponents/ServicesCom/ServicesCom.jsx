import { useGetServicesQuery } from "../../../Redux/service/service";
import ServiceCard from "../../ServiceCard/ServiceCard";

export default function ServicesCom() {
  const { data, isLoading } = useGetServicesQuery();
  if (isLoading) return "Loading...";
  const services = data?.data;

  return (
    <section className="py-8 sm:py-10">
      <div className="container">
        <div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-primary text-center">
            Our Exclusive Services
          </h2>
        </div>

        <div className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services?.map((service) => (
              <ServiceCard key={service?._id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

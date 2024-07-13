import { useGetHomeServicesQuery } from "../../../Redux/service/homeServiceApi";
import ServiceCard from "../../ServiceCard/ServiceCard";
import Spinner from "../../Spinner/Spinner";

export default function ServicesCom() {
  const { data: homeServices, isLoading } = useGetHomeServicesQuery();
  const services = homeServices?.data[0]?.services;

  if (isLoading) return <Spinner />;

  return (
    <section className="primary_bg py-8 sm:py-10">
      <div className="container">
        <div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-center">
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

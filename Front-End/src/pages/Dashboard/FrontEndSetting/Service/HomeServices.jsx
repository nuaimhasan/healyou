import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { useGetServicesQuery } from "../../../../Redux/service/service";
import {
  useAddHomeServiceMutation,
  useEditHomeServiceMutation,
  useGetHomeServicesQuery,
} from "../../../../Redux/service/homeServiceApi";
import Swal from "sweetalert2";

export default function HomeServices() {
  const [selectedServices, setSelectedServices] = useState([]);

  const { data } = useGetServicesQuery();
  const services = data?.data;

  const { data: homeServices } = useGetHomeServicesQuery();
  const id = homeServices?.data[0]?._id;

  useEffect(() => {
    setSelectedServices(homeServices?.data[0]?.services);
  }, [homeServices?.data]);

  const [addHomeService, { isLoading: addIsLoading }] =
    useAddHomeServiceMutation();

  const [editHomeService, { isLoading: editIsLoading }] =
    useEditHomeServiceMutation();

  const handleAddOrEdit = async (e) => {
    e.preventDefault();

    const services = { services: selectedServices };

    if (id) {
      const res = await editHomeService({ id, services });

      if (res?.data?.success) {
        Swal.fire("", "Home service edit success", "success");
      } else {
        Swal.fire("", "something went wront!", "error");
      }
    } else {
      const res = await addHomeService(services);

      if (res?.data?.success) {
        Swal.fire("", "Home service add success", "success");
      } else {
        Swal.fire("", "something went wront!", "error");
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-3 border-b">
        <h2>Home Services</h2>
      </div>

      <form onSubmit={handleAddOrEdit} className="p-4">
        <div>
          <p className="mb-1">Select Services</p>
          <Select
            multi
            options={services}
            labelField="title"
            valueField="title"
            values={id && homeServices?.data[0]?.services}
            onChange={(values) => setSelectedServices(values)}
          />
        </div>

        <ul className="mt-8">
          {selectedServices?.map((service, i) => (
            <li key={service?._id} className="mt-2 flex items-center gap-3">
              <p>{i + 1}.</p>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/services/${
                  service?.image
                }`}
                alt=""
                className="w-10 h-9 rounded"
              />
              <h2>{service?.title}</h2>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            disabled={(addIsLoading || editIsLoading) && "disabled"}
            className="primary_light_btn"
          >
            {addIsLoading || editIsLoading
              ? "Loading..."
              : id
              ? "Edit Home Services"
              : "Add Home Services"}
          </button>
        </div>
      </form>
    </section>
  );
}

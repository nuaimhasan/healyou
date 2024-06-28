import { MdDelete } from "react-icons/md";
import {
  useAddOtherServiceMutation,
  useDeleteOtherServiceMutation,
  useGetOtherServiceQuery,
} from "../../../../Redux/otherService/otherServiceApi";
import swal from "sweetalert2";

export default function OthersServices() {
  const { data } = useGetOtherServiceQuery();
  const otherServices = data?.data;

  const [addOtherService, { isLoading: addIsLoading }] =
    useAddOtherServiceMutation();

  const handleAddService = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const link = e.target.link.value;

    const info = {
      name,
      link,
    };

    const res = await addOtherService(info);
    if (res?.data?.success) {
      swal.fire("", "Other service Add Success", "success");
      e.target.name.value = "";
    } else {
      swal.fire("", "something went wrong!", "error");
    }
  };

  const [deleteOtherService] = useDeleteOtherServiceMutation();

  const handleDeleteService = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this service?");
    if (isConfirm) {
      const res = await deleteOtherService(id);
      if (res?.data?.success) {
        swal.fire("", "service delete success", "success");
      } else {
        swal.fire("", "something went wrong!", "error");
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Other Services</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <form className="p-4" onSubmit={handleAddService}>
          <div>
            <p className="mb-1">Service Name</p>
            <input type="text" name="name" required />
          </div>

          <div>
            <p className="mb-1">Service Link</p>
            <input type="text" name="link" required />
          </div>

          <div className="mt-2">
            <button
              disabled={addIsLoading && "disabled"}
              className="primary_light_btn"
            >
              {addIsLoading ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
        <div className="p-4">
          <ul className="list-decimal">
            {otherServices?.map((service) => (
              <li key={service?._id}>
                <div className="flex items-center gap-4">
                  <p>{service?.name}</p>
                  <button onClick={() => handleDeleteService(service?._id)}>
                    <MdDelete className="hover:text-red-500 duration-200" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

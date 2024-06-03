import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "../../../Redux/service/service";
import Spinner from "../../../components/Spinner/Spinner";
import Swal from "sweetalert2";

export default function AllServices() {
  const { data, isLoading } = useGetServicesQuery();
  const services = data?.data;
  const [deleteService] = useDeleteServiceMutation();

  const handleDeleteService = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this service?");
    if (isConfirm) {
      try {
        const res = await deleteService(id).unwrap();
        if (res?.success) {
          Swal.fire("", "Service Deleted Success", "success");
        }
      } catch (error) {
        Swal.fire("", "Something went wrong", "error");
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded shadow">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">Services</h1>
          <Link to="/admin/services/add-service" className="primary_btn">
            Add New Service
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2 bg-base-100 rounded shadow">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Title</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service, i) => (
              <tr key={service?._id}>
                <td>{i + 1}</td>
                <td>{service?.title}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/services/${
                      service?.image
                    }`}
                    alt=""
                    className="w-20 h-10"
                  />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/services/edit-service/${service?._id}`}>
                      <FaRegEdit className="text-base hover:text-green-500 duration-200" />
                    </Link>
                    <button onClick={() => handleDeleteService(service?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500 duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

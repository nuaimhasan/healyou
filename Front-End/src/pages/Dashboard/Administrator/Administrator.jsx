import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteAdminMutation,
  useGetAdminsQuery,
} from "../../../Redux/user/userApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function Administrator() {
  const { data, isLoading } = useGetAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  if (isLoading) {
    return <Spinner />;
  }
  const admins = data?.data;
  // console.log(admins);

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("are you sure delete this admin?");
    if (isConfirm) {
      try {
        const res = await deleteAdmin(id).unwrap();
        if (res?.success) {
          Swal.fire({
            icon: "success",
            title: "",
            text: "Deleted success",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "",
          text: error?.message,
        });
      }
    }
  };

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">Banners</h1>
          <Link
            to="/admin/administrator/add-administrator"
            className="secondary_btn"
          >
            Add Administrator
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>User name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin) => (
              <tr key={admin?.id}>
                <td>
                  <div className="flex items-center gap-2">{admin?.name}</div>
                </td>
                <td>{admin?.email}</td>
                <td>{admin?.phone}</td>
                <td>
                  <button onClick={() => handleDelete(admin?.id)}>
                    <AiOutlineDelete className="text-lg hover:text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

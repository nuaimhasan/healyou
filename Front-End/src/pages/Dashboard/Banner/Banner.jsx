import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "../../../Redux/banner/bannerApi";

export default function Banners() {
  const { data, isLoading } = useGetBannersQuery();
  const [deleteBanner] = useDeleteBannerMutation();

  if (isLoading) return <div>Loading...</div>;

  const banners = data?.data;

  const deleteClientHandler = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this client?");
    if (isConfirm) {
      try {
        const res = await deleteBanner(id).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "",
            text: "Banner Deleted Successfully",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "",
          text: "Something went wrong",
          icon: "error",
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
            to="/admin/front-end/banner/add-banner"
            className="secondary_btn"
          >
            Add New Banner
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((banner, index) => (
              <tr key={banner?._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/banner/${
                      banner?.image
                    }`}
                    alt={banner?.image}
                    className="w-28 h-10"
                  />
                </td>
                <td>
                  <button onClick={() => deleteClientHandler(banner?._id)}>
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

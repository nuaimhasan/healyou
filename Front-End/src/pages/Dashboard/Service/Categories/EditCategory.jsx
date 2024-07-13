import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetServiceCategoryQuery,
  useUpdateServiceCategoryMutation,
} from "../../../../Redux/service/serviceCategoryApi";

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetServiceCategoryQuery(id);
  const [updateCategory, { isLoading }] = useUpdateServiceCategoryMutation();

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const order = e.target.order.value;

    const data = {
      name,
      order,
    };
    const res = await updateCategory({ id, data });
    if (res?.data?.success) {
      Swal.fire("", "service category updated success", "success");
      navigate("/admin/service/categories");
    } else {
      Swal.fire("", "something went wront!", "error");
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Update Category</h3>
      </div>

      <form onSubmit={handleUpdateCategory} className="p-4">
        <div>
          <p className="mb-1">Category</p>
          <input type="text" name="name" defaultValue={data?.data?.name} />
        </div>
        <div>
          <p className="mb-1">Order</p>
          <input type="number" name="order" defaultValue={data?.data?.order} />
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={isLoading && "disabled"}
              className="primary_light_btn"
            >
              {isLoading ? "Loading..." : "Update Category"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

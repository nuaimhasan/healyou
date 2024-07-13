import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddServiceCategoryMutation,
  useGetServiceCategoriesQuery,
} from "../../../../Redux/service/serviceCategoryApi";

export default function AddCategory() {
  const navigate = useNavigate();
  const { data } = useGetServiceCategoriesQuery();
  const [addCategory, { isLoading }] = useAddServiceCategoryMutation();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const order = e.target.order.value;

    const data = {
      name,
      order,
    };
    const res = await addCategory(data);
    if (res?.data?.success) {
      Swal.fire("", " service category added success", "success");
      navigate("/admin/service/categories");
    } else {
      Swal.fire("", " something went wront!", "error");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Service Category</h3>
      </div>

      <form onSubmit={handleAddCategory} className="p-4">
        <div>
          <p className="mb-1">Category</p>
          <input type="text" name="name" placeholder="Enter Category Name" />
        </div>
        <div>
          <p className="mb-1">Order</p>
          <input
            type="number"
            name="order"
            defaultValue={data?.data?.length > 0 ? data?.data?.length + 1 : 1}
          />
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={isLoading && "disabled"}
              className="primary_light_btn"
            >
              {isLoading ? "Loading..." : "Add Category"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

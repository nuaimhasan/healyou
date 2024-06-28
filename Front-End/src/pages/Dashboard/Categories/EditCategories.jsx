import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../Redux/category/categoryApi";

const EditCategories = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetCategoryQuery(id);

  const [updateCategory, { isLoading, isError, error, isSuccess }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Category updated successfully", "success");
      navigate("/admin/categories/categories");
    }

    if (isError) {
      Swal.fire("", error?.data?.error, "error");
    }
  }, [isError, error, isSuccess, navigate]);

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const order = e.target.order.value;

    const data = {
      name,
      order,
    };
    updateCategory({ id, data });
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
};

export default EditCategories;

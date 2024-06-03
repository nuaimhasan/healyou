import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../../../Redux/category/categoryApi";

const AddCategories = () => {
  const navigate = useNavigate();

  const { data } = useGetCategoriesQuery();

  const [addCategory, { isLoading, isError, error, isSuccess }] =
    useAddCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Category added successfully", "success");
      navigate("/admin/categories/categories");
    }

    if (isError) {
      Swal.fire("", error?.data?.error, "error");
    }
  }, [isError, error, isSuccess, navigate]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const order = e.target.order.value;

    const data = {
      name,
      order,
    };
    addCategory(data);
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Category</h3>
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
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add Category"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddCategories;

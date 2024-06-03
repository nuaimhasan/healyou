import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetCategoriesQuery,
} from "../../../Redux/category/categoryApi";
import { useAddSubCategoryMutation } from "../../../Redux/subCategory/subCategoryApi";

const AddSubCategories = () => {
  const navigate = useNavigate();

  const { data } = useGetCategoriesQuery();

  const [addSubCategory, { isLoading, isError, error, isSuccess }] =
    useAddSubCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Category added successfully", "success");
      navigate("/admin/categories/sub-categories");
    }

    if (isError) {
      Swal.fire("", error?.data?.error, "error");
    }
  }, [isError, error, isSuccess, navigate]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const categoryId = e.target.category.value;
    if (!categoryId) {
      return Swal.fire("", "Category is required", "warning");
    }

    const data = {
      name,
      categoryId,
    };
    addSubCategory(data);
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Sub Category</h3>
      </div>

      <form onSubmit={handleAddCategory} className="p-4">
        <div>
          <p className="mb-1">Sub Category</p>
          <input type="text" name="name" placeholder="Enter Category Name" />
        </div>
        <div>
          <p className="mb-1">Category</p>
          <select name="category" id="category">
            {data?.data?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button disabled={isLoading && "disabled"} className="primary_btn">
              {isLoading ? "Loading..." : "Add Sub Category"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddSubCategories;

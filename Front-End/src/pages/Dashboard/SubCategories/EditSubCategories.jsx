import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "../../../Redux/subCategory/subCategoryApi";
import Spinner from "../../../components/Spinner/Spinner";

const EditSubCategories = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading: getLoading } = useGetSubCategoryQuery(id);

  const [updateSubCategory, { isLoading, isError, error, isSuccess }] =
    useUpdateSubCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Category updated successfully", "success");
      navigate("/admin/categories/sub-categories");
    }

    if (isError) {
      Swal.fire("", error?.data?.error, "error");
    }
  }, [isError, error, isSuccess, navigate]);

  if (getLoading) {
    return <Spinner />;
  }

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    updateSubCategory({ id, name });
  };

  return (
    <section className="bg-base-100 shadow rounded sm:w-1/2">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Update Sub Category</h3>
      </div>

      <form onSubmit={handleUpdateCategory} className="p-4">
        <div>
          <p className="mb-1">Sub Category</p>
          <input type="text" name="name" defaultValue={data?.data?.name} />
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={isLoading && "disabled"}
              className="primary_light_btn text-sm"
            >
              {isLoading ? "Loading..." : "Update Category"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditSubCategories;

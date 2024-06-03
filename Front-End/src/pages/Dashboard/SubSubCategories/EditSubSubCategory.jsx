import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetSubSubCategoryQuery, useUpdateSubSubCategoryMutation } from "../../../Redux/subSubCategory/subSubCategoryApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function EditSubSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSubSubCategoryQuery(id);
  const [updateSubSubCategory, { isLoading: updateLoading }] =
    useUpdateSubSubCategoryMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    const result = await updateSubSubCategory({ id, name });

    if (result?.data?.success) {
      Swal.fire("", "update success", "success");
      navigate("/admin/categories/sub-sub-categories");
    } else {
      Swal.fire("", "Somethin went wrong", "error");
    }
  };

  return (
    <form
      onSubmit={handleUpdateCategory}
      className="p-4 bg-base-100 shadhow rounded sm:w-1/2"
    >
      <div className="">
        <p className="mb-1 text-neutral-content">Sub Sub Category Name</p>
        <input
          type="text"
          name="name"
          required
          defaultValue={data?.data?.name}
        />
      </div>

      <div className="mt-5">
        <button
          className="primary_btn text-sm"
          disabled={updateLoading && "disabled"}
        >
          {updateLoading ? "Loading.." : "Update Sub SubCategory"}
        </button>
      </div>
    </form>
  );
}

import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteSubSubCategoryMutation,
  useGetSubSubCategoriesQuery,
} from "../../../Redux/subSubCategory/subSubCategoryApi";
import Spinner from "../../../components/Spinner/Spinner";

const SubSubCategories = () => {
  const { data, isLoading, isError, error, isSuccess } =
    useGetSubSubCategoriesQuery();
  const categories = data?.data;

  const [deleteSubSubCategory] = useDeleteSubSubCategoryMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = async (subSubCategory) => {
    const id = subSubCategory?._id;
    const subCategoryId = subSubCategory?.subCategory?._id;

    const isConfirm = window.confirm("are you sure delete this category");

    if (isConfirm) {
      const result = await deleteSubSubCategory({ id, subCategoryId });
      if (result?.data?.success) {
        Swal.fire("", "Delete Success", "success");
      } else {
        Swal.fire("", "Somethin went worng", "error");
      }
    }
  };

  let content = null;

  if (isError) {
    content = <p className="text-red-500 mt-4">{error?.data?.error}</p>;
  }

  if (!isError && isSuccess) {
    content = categories?.map((subSubCategory, index) => (
      <tr key={subSubCategory?._id}>
        <td>{index + 1}</td>
        <td>{subSubCategory?.name}</td>
        <td> {subSubCategory?.category?.name}</td>
        <td>{subSubCategory?.subCategory?.name}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/categories/edit-sub-sub-category/${subSubCategory?._id}`}
              className="text-lg"
            >
              <FiEdit3 />
            </Link>
            <button
              className="text-lg"
              onClick={() => handleDelete(subSubCategory)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">Sub Sub Categories</h1>
          <Link
            to="/admin/categories/add-sub-sub-category"
            className="primary_light_btn"
          >
            Add Sub-Sub-Category
          </Link>
        </div>

        <div className="relative overflow-x-auto mt-2">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Sub SubCategory</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SubSubCategories;

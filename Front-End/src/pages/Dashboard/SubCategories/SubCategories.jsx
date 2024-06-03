import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "../../../Redux/subCategory/subCategoryApi";
import Spinner from "../../../components/Spinner/Spinner";

const SubCategories = () => {
  const { data, isLoading, isError, error, isSuccess } =
    useGetSubCategoriesQuery();
  const subCategories = data?.data;

  const [deleteCategory] = useDeleteSubCategoryMutation();

   if (isLoading) {
     return <Spinner />;
   }

  const handleDelete = async (subCategory) => {
    const id = subCategory?._id;
    const categoryId = subCategory?.category?._id;

    const isConfirm = window.confirm(
      "Are you sure delete this Sub Category? If you delete this subcategory, all the sub-sub-categories and products are deleted."
    );

    if (isConfirm) {
      try {
        const res = await deleteCategory({ id, categoryId }).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "",
            text: "Category Deleted Successfully",
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

  let content = null;

 

  if (isError) {
    content = <p className="text-red-500 mt-4">{error?.data?.error}</p>;
  }

  if (!isError && isSuccess) {
    content = subCategories?.map((subCategory, index) => (
      <tr key={subCategory?._id}>
        <td>{index + 1}</td>
        <td>{subCategory?.name}</td>
        <td>{subCategory?.category?.name}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/categories/edit-sub-category/${subCategory?._id}`}
              className="text-lg"
            >
              <FiEdit3 />
            </Link>
            <button
              className="text-lg"
              onClick={() => handleDelete(subCategory)}
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
          <h1 className="font-medium text-neutral">Categories</h1>
          <Link
            to="/admin/categories/add-sub-category"
            className="secondary_btn"
          >
            Add New Sub-Category
          </Link>
        </div>

        <div className="relative overflow-x-auto mt-2">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Sub Category</th>
                <th>Category</th>
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

export default SubCategories;

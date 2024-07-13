import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  useDeleteServiceCategoryMutation,
  useGetServiceCategoriesQuery,
} from "../../../../Redux/service/serviceCategoryApi";

export default function ServiceCategories() {
  const { data, isLoading } = useGetServiceCategoriesQuery();
  const categories = data?.data;

  const [deleteCategory] = useDeleteServiceCategoryMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this Category?");
    if (isConfirm) {
      try {
        const res = await deleteCategory(id).unwrap();
        if (res?.success) {
          Swal.fire("", "Category Deleted Successfully", "success");
        }
      } catch (error) {
        Swal.fire("", "Something went wrong", "error");
      }
    }
  };

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  }

  if (categories?.length > 0) {
    content = (
      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category?._id}>
                <td>{category?.order}</td>
                <td>{category?.name}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/service/category/edit/${category?._id}`}
                      className="text-lg"
                    >
                      <FiEdit3 />
                    </Link>
                    <button
                      className="text-lg"
                      onClick={() => handleDelete(category?._id)}
                    >
                      <MdOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">Service Categories</h1>
          <Link to="/admin/service/category/add" className="primary_light_btn">
            Add New Category
          </Link>
        </div>

        {content}
      </div>
    </section>
  );
}

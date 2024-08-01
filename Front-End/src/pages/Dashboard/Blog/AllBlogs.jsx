import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../../Redux/blogs/blogsApi";

export default function AllBlogs() {
  const { data, isLoading } = useGetBlogsQuery();
  const blogs = data?.data;
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this blog?");
    if (isConfirm) {
      try {
        const res = await deleteBlog(id).unwrap();
        if (res?.success) {
          Swal.fire("", "Blog Deleted Success", "success");
        }
      } catch (error) {
        Swal.fire("", "Something went wrong", "error");
        console.log(error);
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded shadow">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">Blogs</h1>
          <Link to="/admin/blogs/add" className="primary_light_btn">
            Add New
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2 bg-base-100 rounded shadow">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog, i) => (
              <tr key={blog?._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/blogs/${
                      blog?.image
                    }`}
                    alt=""
                    className="w-20 h-10"
                  />
                </td>
                <td>{blog?.title}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/blogs/edit/${blog?._id}`}>
                      <FaRegEdit className="text-base hover:text-green-500 duration-200" />
                    </Link>
                    <button onClick={() => handleDelete(blog?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500 duration-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

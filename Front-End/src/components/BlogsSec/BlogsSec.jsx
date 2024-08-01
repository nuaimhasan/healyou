import { Link } from "react-router-dom";

export default function BlogsSec({ blogs }) {
  return (
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10">
      {blogs?.map((blog) => (
        <div key={blog?._id} className="service_card">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/blogs/${blog?.image}`}
            alt=""
            className="w-full h-40 md:h-52"
            loading="lazy"
          />
          <div className="p-2">
            <h2 className="sm:text-xl">{blog?.title}</h2>
            <p className="opacity-80 text-xs mt-2">
              {blog?.short_description?.length > 80
                ? blog?.short_description.slice(0, 80) + "..."
                : blog?.short_description}
            </p>

            <div className="mt-6 pb-4">
              <Link
                to={`/blogs/${blog?._id}`}
                className="text-sm border border-gray-100 rounded-xl px-3 py-1"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

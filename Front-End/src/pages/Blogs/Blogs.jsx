import { useState } from "react";
import { useGetBlogsQuery } from "../../Redux/blogs/blogsApi";
import Pagination from "../../components/Pagination/Pagination";
import BlogsSec from "../../components/blogsSec/blogsSec";

export default function Blogs() {
  window.scroll(0, 0);

  const [currentPage, setCurrentPage] = useState(1);

  let query = {};
  query["limit"] = 9;
  query["page"] = currentPage;
  const { data } = useGetBlogsQuery({ ...query });
  let blogs = data?.data;

  return (
    <div className="bg-primary py-10 text-base-100">
      <div className="container">
        <div>
          <h2 className="text-2xl sm:text-4xl font-semibold text-center">
            All Blogs
          </h2>
        </div>

        <BlogsSec blogs={blogs} />
      </div>

      <Pagination
        pages={data?.meta?.pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

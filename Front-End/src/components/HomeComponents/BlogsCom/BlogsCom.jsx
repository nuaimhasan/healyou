import { useGetBlogsQuery } from "../../../Redux/blogs/blogsApi";
import BlogsSec from "../../blogsSec/blogsSec";

export default function BlogsCom() {
  let query = {};
  query["limit"] = 3;
  const { data } = useGetBlogsQuery({ ...query });
  let blogs = data?.data;

  return (
    <section className="bg-primary py-10 text-base-100">
      <div className="container">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl text-center w-max mx-auto border-b-2 border-base-100 text-priamry pb-2 font-semibold">
            Recent Blogs
          </h2>
        </div>

        <BlogsSec blogs={blogs} />
      </div>
    </section>
  );
}

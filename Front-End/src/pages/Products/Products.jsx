import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Redux/product/productApi";
import ProductCard from "../../components/Product/ProductCard";
import Spinner from "../../components/Spinner/Spinner";

export default function Products() {
  const params = useParams();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  let categoryParams = params?.category ? params?.category : "";
  let subCategoryParams = params?.subCategory ? params?.subCategory : "";
  let subSubCategoryParams = params?.subSubCategory
    ? params?.subSubCategory
    : "";
  console.log(categoryParams, subCategoryParams, subSubCategoryParams);

  const query = {};
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(8);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");

  query["page"] = page;
  query["limit"] = limit;
  query["category"] = category;
  query["subCategory"] = subCategory;
  query["subSubCategory"] = subSubCategory;

  useEffect(() => {
    setCategory(categoryParams);
    setSubCategory(subCategoryParams);
    setSubSubCategory(subSubCategoryParams);
  }, [categoryParams, subCategoryParams, subSubCategoryParams]);

  const { data, isLoading, isError, isSuccess } = useGetAllProductsQuery({
    ...query,
  });

  const handlePageChange = (pageNumber) => {
    window.scroll(0, 0);
    if (pageNumber < 1) return;
    if (data?.meta?.total && pageNumber > data?.meta.total / limit) return;

    setPage(pageNumber);
  };

  if (isLoading) return <Spinner />;

  let content = null;

  if (isError) content = <div>Something went wrong please reload the page</div>;

  if (!isLoading && isSuccess && data?.data?.length === 0)
    content = <div>In this category no products found</div>;

  if (!isLoading && isSuccess && data?.data?.length > 0) {
    content = (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data?.map((product) => (
          <ProductCard product={product} key={product?._id} />
        ))}
      </div>
    );
  }

  return (
    <section>
      <div className="container py-10">{content}</div>

      {data?.data?.length > 0 && (
        <div className="flex items-center justify-center my-16">
          <div className="flex items-center space-x-1 border border-gray-300 rounded overflow-hidden text-sm">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <FaArrowLeft />
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-100 font-medium focus:outline-none">
              {page}
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => handlePageChange(page + 1)}
              disabled={data?.meta?.total && page === data?.meta.total / limit}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

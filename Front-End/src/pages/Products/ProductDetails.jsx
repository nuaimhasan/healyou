import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import perser from "html-react-parser";
import { useGetProductBySlugQuery } from "../../Redux/product/productApi";

export default function ProductDetails() {
  window.scroll(0, 0);
  const { slug } = useParams();

  const { data, isLoading } = useGetProductBySlugQuery(slug);

  if (isLoading) return <Spinner />;

  const perserDescription =
    data?.data?.description && perser(data?.data?.description);

  const rentDescription =
    data?.data?.rent?.rent_description &&
    perser(data?.data?.rent?.rent_description);

  return (
    <section className="py-6">
      <div className="container">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-0">
          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                data?.data?.image
              }`}
              alt=""
              className="w-full h-40 md:h-[350px] rounded md:w-[95%]"
            />
          </div>

          <div>
            <h1 className="text-3xl font-medium">{data?.data?.title}</h1>

            <div className="text-sm text-neutral-content">
              <p>{data?.data?.category?.name}</p>
              <p>{data?.data?.subCategory?.name}</p>
              <p>{data?.data?.subSubCategory?.name}</p>
            </div>

            <h1 className="text-2xl font-medium mt-2">
              Price: {data?.data?.price}৳
            </h1>

            {data?.data?.rent && (
              <div className="mt-4">
                <p>
                  Rent Price: {data?.data?.rent?.rent_price}৳ (
                  {data?.data?.rent?.rent_type})
                </p>
                <p>{rentDescription}</p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <Link
                to={`/order/checkout/${data?.data?._id}`}
                className="primary_btn text-sm"
              >
                Order Now
              </Link>
              {data?.data?.rent && (
                <Link
                  to={`/rent/checkout/${data?.data?._id}`}
                  className="primary_btn text-sm"
                >
                  Rent Now
                </Link>
              )}
            </div>

            <br />
            <span className="bg-primary px-4 py-1.5 rounded text-base-100">
              Call: 01886283555
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="border-b">Description</h2>

          <p className="mt-6">{perserDescription}</p>
        </div>
      </div>
    </section>
  );
}

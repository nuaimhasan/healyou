import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product_card rounded">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/products/${product?.image}`}
        alt=""
        className="product_img rounded-t h-48 w-full"
      />
      <div className="p-2 text-center">
        <h2 className="font-semibold text-base">
          {product?.title?.length > 31
            ? product?.title.slice(0, 32) + "..."
            : product?.title}
        </h2>

        <p className="opacity-90 mt-1">{product?.price}৳</p>

        <div className="mt-4 pb-4">
          <Link
            to={`/products/product-details/${product?.slug}`}
            className="product_btn bg-primary text-base-100 text-sm rounded-md px-4 py-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

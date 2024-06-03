import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function SubCategories({ subCategory, categorySlug }) {
  if (subCategory?.subSubCategories?.length > 0) {
    return (
      <li>
        <Link to={`/products/${categorySlug}/${subCategory?.slug}`}>
          {subCategory?.name} <MdKeyboardArrowRight />
        </Link>

        <ol className="sub_sub_dropdown">
          {subCategory?.subSubCategories?.map((subSubCategory) => (
            <li key={subSubCategory?._id}>
              <Link
                to={`/products/${categorySlug}/${subCategory?.slug}/${subSubCategory?.slug}`}
              >
                {subSubCategory?.name}
              </Link>
            </li>
          ))}
        </ol>
      </li>
    );
  } else {
    return (
      <li>
        <Link to={`/products/${categorySlug}/${subCategory?.slug}`}>{subCategory?.name}</Link>
      </li>
    );
  }
}

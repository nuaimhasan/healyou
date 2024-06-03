import { Link } from "react-router-dom";
import SubCategories from "./SubCategories";
import { MdKeyboardArrowRight } from "react-icons/md";


export default function Categories({ category }) {
  if(category?.subCategories?.length > 0){
    return (
      <li>
        <Link to={`/products/${category?.slug}`}>
          {category?.name} <MdKeyboardArrowRight />
        </Link>

        <ol className="sub_dropdown">
          {category?.subCategories?.map((subCategory) => (
            <SubCategories
              key={subCategory?._id}
              subCategory={subCategory}
              categorySlug={category?.slug}
            />
          ))}
        </ol>
      </li>
    );
  } else {
    return (
      <li>
        <Link to={`/products/${category?.slug}`}>
          {category?.name}
        </Link>
      </li>
    );
  }
}

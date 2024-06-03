import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";
import Categories from "../Categories/Categories";

export default function ProductDropdown({ productsDropdown }) {
  const { data } = useGetCategoriesQuery();
  const categories = data?.data;

  return (
    <ol className={`dropdown ${productsDropdown && "dropdown_show"}`}>
      {categories?.map((category) => (
        <Categories key={category?._id} category={category} />
      ))}
    </ol>
  );
}

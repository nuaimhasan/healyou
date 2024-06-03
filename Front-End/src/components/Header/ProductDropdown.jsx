
import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";
import Categories from "../Categories/Categories";

export default function ProductDropdown({ productsDropdown }) {

  const {data} = useGetCategoriesQuery();
  const categories = data?.data

  return (
    <ol className={`dropdown ${productsDropdown && "dropdown_show"}`}>
       {
        categories?.map(category => (
            <Categories key={category?._id} category={category} />
        ))
      }
      {/* <li>
        <Link to="/products/Solar-Panel">
          Solar Panel <MdKeyboardArrowRight />
        </Link>
        <ol className="sub_dropdown">
          <li>
            <Link to="/products/Solar-Panel/Mono-Solar-Panel">
              Mono Solar Panel <MdKeyboardArrowRight />
            </Link>

            <ol className="sub_sub_dropdown">
              <li>
                <Link to="/products/Solar-Panel/Mono-Solar-Panel">
                  50 Watt Solar Panel
                </Link>
              </li>
              <li>
                <Link to="/products/Solar-Panel/Mono-Solar-Panel">
                  65 Watt Solar Panel
                </Link>
              </li>
              <li>
                <Link to="/products/Solar-Panel/Mono-Solar-Panel">
                  85 Watt Solar Panel
                </Link>
              </li>
              <li>
                <Link to="/products/Solar-Panel/Mono-Solar-Panel">
                  100 Watt Solar Panel
                </Link>
              </li>
              <li>
                <Link to="/products/Solar-Panel/Mono-Solar-Panel">
                  130 Watt Solar Panel
                </Link>
              </li>
              <li>
                <Link to="/products/Solar-Panel/Mono-Solar-Panel">
                  150 Watt Solar Panel
                </Link>
              </li>
              <li>
                <Link to="/products/Solar-Panel/Mono-Solar-Panel">
                  165 Watt Solar Panel
                </Link>
              </li>
              <li>
                <Link to="/products/Solar-Panel/Mono-Solar-Panel">
                  200 Watt Solar Panel
                </Link>
              </li>
            </ol>
          </li>
          <li>
            <Link to="/products/DC-LED-Tube/125V-LED-Tube">
              Grid Tied Solar Panel <MdKeyboardArrowRight />
            </Link>

            <ol className="sub_sub_dropdown">
              <li>
                <Link to="/products/Solar-Panel/Grid-Tied-Solar-Panel">
                  3000 Watt Solar Panel
                </Link>
              </li>
              <li>
                <Link to="/products/Solar-Panel/Grid-Tied-Solar-Panel">
                  550 Watt Solar Panel
                </Link>
              </li>
            </ol>
          </li>
        </ol>
      </li> */}
      
    </ol>
  );
}

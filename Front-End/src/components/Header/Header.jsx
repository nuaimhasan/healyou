import "./Header.css";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useGetLogosQuery } from "../../Redux/logo/logoApi";
import ProductDropdown from "./ProductDropdown";

export default function Header() {
  const [mobileMenu, setmobileMenu] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);

  const { data } = useGetLogosQuery();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target.closest(".menu_wrap ul li a") &&
        !e.target.closest(".menu_wrap ul li a svg")
      ) {
        setmobileMenu(false);
      }

      if (!e.target.closest(".products_btn")) {
        setProductsDropdown(false);
      }
    });
  }, []);

  return (
    <header className="py-2 2xl:py-0 sticky top-0 bg-[#ffffffcc] backdrop-blur-[30px] z-50 shadow">
      <div className="w-[90%] xl:w-[1250px] mx-auto relative">
        <div className="header">
          <Link to="/">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                data?.data[0]?.logo
              }`}
              alt="logo"
              className="w-36 sm:w-44 xl:w-52 h-9"
            />
          </Link>

          <nav className="menu_wrap flex items-center gap-2">
            <button
              onClick={() => setmobileMenu(false)}
              className={`overlay 2xl:hidden ${mobileMenu && "overlay_show"}`}
            ></button>

            <ul className={`${mobileMenu && "show"}`}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li>
                <Link
                  to="/services"
                  className="products_btn"
                  onClick={() => setProductsDropdown(!productsDropdown)}
                >
                  Services <MdKeyboardArrowDown />
                </Link>

                <ProductDropdown productsDropdown={productsDropdown} />
              </li>

              <li>
                <Link
                  to="/products"
                  className="products_btn"
                  onClick={() => setProductsDropdown(!productsDropdown)}
                >
                  Products <MdKeyboardArrowDown />
                </Link>

                <ProductDropdown productsDropdown={productsDropdown} />
              </li>

              <li>
                <NavLink to="/about-us">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact-us">Contact Us</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

import "./Header.css";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useGetLogosQuery } from "../../Redux/logo/logoApi";
import ProductDropdown from "./ProductDropdown";
import ServiceDropdown from "./ServiceDropdown";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import OtherServicesDropdown from "./OtherServices";

export default function Header() {
  const [mobileMenu, setmobileMenu] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [serviceDropdown, setServiceDropdown] = useState(false);
  const [otherServicseDropdown, setOtherServiceDropdown] = useState(false);

  const { data, isLoading } = useGetLogosQuery();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target.closest(".menu_wrap ul li a") &&
        !e.target.closest(".menu_btn") &&
        !e.target.closest(".menu_wrap ul li a svg")
      ) {
        setmobileMenu(false);
      }

      if (!e.target.closest(".products_btn")) {
        setProductsDropdown(false);
      }

      if (!e.target.closest(".services_btn")) {
        setServiceDropdown(false);
      }

      if (!e.target.closest(".otherServices_btn")) {
        setOtherServiceDropdown(false);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 bg-[#ffffffcc] backdrop-blur-[30px] z-50 shadow">
      <div className="container relative">
        <div className="header">
          <Link to="/">
            {isLoading ? (
              <img
                src="/images/logo/logo.png"
                alt="logo"
                className="w-36 sm:w-40 xl:w-44"
              />
            ) : (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                  data?.data[0]?.logo
                }`}
                alt="logo"
                className="w-36 sm:w-40 xl:w-44"
              />
            )}
          </Link>

          <nav className="menu_wrap flex items-center gap-2">
            <button
              onClick={() => setmobileMenu(!mobileMenu)}
              className="min-[800px]:hidden menu_btn"
            >
              <HiOutlineMenuAlt3 className="text-2xl" />
            </button>

            <ul className={`${mobileMenu && "show"}`}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li>
                <Link
                  to="/services"
                  className="services_btn"
                  onClick={() => setServiceDropdown(!serviceDropdown)}
                >
                  Services <MdKeyboardArrowDown />
                </Link>

                <ServiceDropdown serviceDropdown={serviceDropdown} />
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
              <li>
                <button
                  className="otherServices_btn"
                  onClick={() =>
                    setOtherServiceDropdown(!otherServicseDropdown)
                  }
                >
                  Other Services <MdKeyboardArrowDown />
                </button>

                <OtherServicesDropdown
                  otherServicseDropdown={otherServicseDropdown}
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

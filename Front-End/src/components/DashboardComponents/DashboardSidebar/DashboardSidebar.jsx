import { BsCart4 } from "react-icons/bs";
import {
  MdMonitor,
  MdOutlineDashboard,
  MdContactPhone,
  MdDesignServices,
  MdOutlineCategory,
  MdOutlineAddShoppingCart,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import SidebarItems from "./SidebarItems";
import { useGetLogosQuery } from "../../../Redux/logo/logoApi";

import { FcAbout } from "react-icons/fc";
import { FaChartLine } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { FaBloggerB } from "react-icons/fa";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/admin/dashboard",
  },

  {
    icon: <MdDesignServices />,
    title: "Service",
    subMenu: [
      {
        title: "Categories",
        path: "/admin/service/categories",
      },
      {
        title: "Services",
        path: "/admin/service/services",
      },
    ],
  },

  {
    icon: <MdOutlineCategory />,
    title: "Categories",
    subMenu: [
      {
        title: "Categories",
        path: "/admin/categories/categories",
      },
      {
        title: "Sub Categories",
        path: "/admin/categories/sub-categories",
      },
      {
        title: "Sub Sub Categories",
        path: "/admin/categories/sub-sub-categories",
      },
    ],
  },

  {
    icon: <BsCart4 />,
    title: "Products",
    path: "/admin/products/all-products",
  },

  {
    icon: <MdOutlineAddShoppingCart />,
    title: "Orders",
    path: "/admin/orders",
  },

  {
    icon: <MdOutlineAddShoppingCart />,
    title: "Rents",
    path: "/admin/rents",
  },

  {
    icon: <FaBloggerB />,
    title: "blogs",
    path: "/admin/blogs",
  },

  {
    icon: <RiAdminFill />,
    title: "Administrator",
    path: "/admin/administrator/all-administrator",
  },
  {
    icon: <FcAbout />,
    title: "About Us",
    path: "/admin/about-us",
  },
  {
    icon: <MdContactPhone />,
    title: "Contact Us",
    path: "/admin/contact-us",
  },
  {
    icon: <GoNumber className="text-lg" />,
    title: "Counter",
    path: "/admin/counter",
  },

  {
    icon: <MdMonitor />,
    title: "Front-End Setting",
    subMenu: [
      {
        title: "Logo",
        path: "/admin/front-end/logo",
      },
      {
        title: "Favicon",
        path: "/admin/front-end/favicon",
      },
      {
        title: "Banner",
        path: "/admin/front-end/banner",
      },
      {
        title: "Services",
        path: "/admin/front-end/services",
      },
      {
        title: "Themes",
        path: "/admin/front-end/themes",
      },
    ],
  },

  {
    icon: <IoMdSettings />,
    title: "General Setting",
    subMenu: [
      {
        title: "Business Info",
        path: "/admin/general-setting/business-info",
      },
      {
        title: "Other Services",
        path: "/admin/general-setting/other-services",
      },
    ],
  },

  {
    icon: <FaChartLine />,
    title: "SEO Setting",
    path: "/admin/seo",
  },
];

export default function DashboardSidebar() {
  const { data } = useGetLogosQuery();
  const logo = data?.data[0];

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <nav className="admin_siderbar">
          <Link to="/admin/dashboard" className="py-5 block">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/logo/${logo?.logo}`}
              alt="logo"
              className="w-1/2 mx-auto"
            />
          </Link>

          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems key={i} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

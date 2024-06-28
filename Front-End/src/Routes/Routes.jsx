import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";

const AboutUs = lazy(() => import("../pages/AboutUs/AboutUs"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Login = lazy(() => import("../pages/Login/Login"));

//------------product
const Products = lazy(() => import("../pages/Products/Products"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));

//------------Service
const Services = lazy(() => import("../pages/Services/Services"));
const ServiceDetails = lazy(() =>
  import("../pages/ServiceDetails/ServiceDetails")
);

const OrderCheckout = lazy(() => import("../pages/Checkout/OrderCheckout"));
const RentCheckout = lazy(() => import("../pages/Checkout/RentCheckout"));

// import AboutUs from "../pages/AboutUs/AboutUs";
// import Contact from "../pages/Contact/Contact";
// import Login from "../pages/Login/Login";
// import Products from "../pages/Products/Products";
// import ProductDetails from "../pages/Products/ProductDetails";
// import Services from "../pages/Services/Services";
// import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";

// import OrderCheckout from "../pages/Checkout/OrderCheckout";
// import RentCheckout from "../pages/Checkout/RentCheckout";

//------------------------------------------Dashboard---------------------------------------------------------------//
import DashboardLayout from "../Layout/DashboardLAyout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard/Dashboard"));
// import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";

//-----------Category
const Categories = lazy(() =>
  import("../pages/Dashboard/Categories/Categories")
);
const AddCategories = lazy(() =>
  import("../pages/Dashboard/Categories/AddCategories")
);
const EditCategories = lazy(() =>
  import("../pages/Dashboard/Categories/EditCategories")
);
// import AddCategories from "../pages/Dashboard/Categories/AddCategories";
// import Categories from "../pages/Dashboard/Categories/Categories";
// import EditCategories from "../pages/Dashboard/Categories/EditCategories";

// Sub Category
const SubCategories = lazy(() =>
  import("../pages/Dashboard/SubCategories/SubCategories")
);
const AddSubCategories = lazy(() =>
  import("../pages/Dashboard/SubCategories/AddSubCategories")
);
const EditSubCategories = lazy(() =>
  import("../pages/Dashboard/SubCategories/EditSubCategories")
);
// import AddSubCategories from "../pages/Dashboard/SubCategories/AddSubCategories";
// import EditSubCategories from "../pages/Dashboard/SubCategories/EditSubCategories";
// import SubCategories from "../pages/Dashboard/SubCategories/SubCategories";

// Sub Sub Category
const SubSubCategories = lazy(() =>
  import("../pages/Dashboard/SubSubCategories/SubSubCategories")
);
const AddSubSubCategory = lazy(() =>
  import("../pages/Dashboard/SubSubCategories/AddSubSubCategory")
);
const EditSubSubCategory = lazy(() =>
  import("../pages/Dashboard/SubSubCategories/EditSubSubCategory")
);
// import AddSubSubCategory from "../pages/Dashboard/SubSubCategories/AddSubSubCategory";
// import EditSubSubCategory from "../pages/Dashboard/SubSubCategories/EditSubSubCategory";
// import SubSubCategories from "../pages/Dashboard/SubSubCategories/SubSubCategories";

//--------------Product
const ProductsList = lazy(() =>
  import("../pages/Dashboard/Product/ProductsList")
);
const AddProduct = lazy(() => import("../pages/Dashboard/Product/AddProduct"));
const EditProduct = lazy(() =>
  import("../pages/Dashboard/Product/EditProduct")
);
// import AddProduct from "../pages/Dashboard/Product/AddProduct";
// import EditProduct from "../pages/Dashboard/Product/EditProduct";
// import ProductsList from "../pages/Dashboard/Product/ProductsList";

const About = lazy(() => import("../pages/Dashboard/AboutUs/AboutUs"));
// import About from "../pages/Dashboard/AboutUs/AboutUs";
const ContactUs = lazy(() => import("../pages/Dashboard/ContactUs/ContactUs"));
// import ContactUs from "../pages/Dashboard/ContactUs/ContactUs";

// --------Admin
const Administrator = lazy(() =>
  import("../pages/Dashboard/Administrator/Administrator")
);
const AddAdministrator = lazy(() =>
  import("../pages/Dashboard/Administrator/AddAdministrator")
);
// import AddAdministrator from "../pages/Dashboard/Administrator/AddAdministrator";
// import Administrator from "../pages/Dashboard/Administrator/Administrator";

//---------------Front-End
const Logo = lazy(() => import("../pages/Dashboard/Logo/Logo"));
const Favicon = lazy(() => import("../pages/Dashboard/Favicon/Favicon"));
const Themes = lazy(() => import("../pages/Dashboard/Theme/Themes"));
//---------Banner
const Banners = lazy(() => import("../pages/Dashboard/Banner/Banner"));
const AddBanner = lazy(() => import("../pages/Dashboard/Banner/AddBanner"));

// import AddBanner from "../pages/Dashboard/Banner/AddBanner";
// import Banners from "../pages/Dashboard/Banner/Banner";

// import Logo from "../pages/Dashboard/Logo/Logo";
// import Favicon from "../pages/Dashboard/Favicon/Favicon";
// import Themes from "../pages/Dashboard/Theme/Themes";

// Service
const AllServices = lazy(() =>
  import("../pages/Dashboard/Services/AllServices")
);
const AddService = lazy(() => import("../pages/Dashboard/Services/AddService"));
const EditService = lazy(() =>
  import("../pages/Dashboard/Services/EditService")
);

// import AllServices from "../pages/Dashboard/Services/AllServices";
// import AddService from "../pages/Dashboard/Services/AddService";
// import EditService from "../pages/Dashboard/Services/EditService";

//-------------Order
const Orders = lazy(() => import("../pages/Dashboard/Orders/Orders"));

// import Orders from "../pages/Dashboard/Orders/Orders";

const Rents = lazy(() => import("../pages/Dashboard/Rents/Rents"));
// import Rents from "../pages/Dashboard/Rents/Rents";

//----------------General
const Counter = lazy(() => import("../pages/Dashboard/Counter/Counter"));
const BusinessInfo = lazy(() =>
  import("../pages/Dashboard/GeneralSetting/BusinessInfo/BusinessInfo")
);
const OthersServices = lazy(() =>
  import("../pages/Dashboard/GeneralSetting/OthersServices/OthersServices")
);

// import Counter from "../pages/Dashboard/Counter/Counter";
// import BusinessInfo from "../pages/Dashboard/GeneralSetting/BusinessInfo/BusinessInfo";
// import OthersServices from "../pages/Dashboard/GeneralSetting/OthersServices/OthersServices";

const SEO = lazy(() => import("../pages/Dashboard/SEO/SEO"));
// import SEO from "../pages/Dashboard/SEO/SEO";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/service/:id",
        element: <ServiceDetails />,
      },

      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:category",
        element: <Products />,
      },
      {
        path: "/products/:category/:subCategory",
        element: <Products />,
      },
      {
        path: "/products/product-details/:slug",
        element: <ProductDetails />,
      },
      {
        path: "/products/:category/:subCategory/:subSubCategory",
        element: <Products />,
      },

      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },

      // Checkout
      {
        path: "/order/checkout/:id",
        element: <OrderCheckout />,
      },
      {
        path: "/rent/checkout/:id",
        element: <RentCheckout />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/administrator/all-administrator",
        element: <Administrator />,
      },
      {
        path: "/admin/administrator/add-administrator",
        element: <AddAdministrator />,
      },

      //-----------------Services
      {
        path: "/admin/services",
        element: <AllServices />,
      },
      {
        path: "/admin/services/add-service",
        element: <AddService />,
      },
      {
        path: "/admin/services/edit-service/:id",
        element: <EditService />,
      },

      //-----------------Products
      {
        path: "/admin/products/all-products",
        element: <ProductsList />,
      },
      {
        path: "/admin/products/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/products/edit-product/:id",
        element: <EditProduct />,
      },

      //----------Orders
      {
        path: "/admin/orders",
        element: <Orders />,
      },

      //----------Rents
      {
        path: "/admin/rents",
        element: <Rents />,
      },

      {
        path: "/admin/categories/categories",
        element: <Categories />,
      },
      {
        path: "/admin/categories/add-category",
        element: <AddCategories />,
      },
      {
        path: "/admin/categories/edit-category/:id",
        element: <EditCategories />,
      },
      {
        path: "/admin/categories/sub-categories",
        element: <SubCategories />,
      },
      {
        path: "/admin/categories/add-sub-category",
        element: <AddSubCategories />,
      },
      {
        path: "/admin/categories/edit-sub-category/:id",
        element: <EditSubCategories />,
      },
      {
        path: "/admin/categories/sub-sub-categories",
        element: <SubSubCategories />,
      },
      {
        path: "/admin/categories/add-sub-sub-category",
        element: <AddSubSubCategory />,
      },
      {
        path: "/admin/categories/edit-sub-sub-category/:id",
        element: <EditSubSubCategory />,
      },

      {
        path: "/admin/about-us",
        element: <About />,
      },

      {
        path: "/admin/counter",
        element: <Counter />,
      },

      {
        path: "/admin/contact-us",
        element: <ContactUs />,
      },

      {
        path: "/admin/front-end/logo",
        element: <Logo />,
      },
      {
        path: "/admin/front-end/favicon",
        element: <Favicon />,
      },

      {
        path: "/admin/front-end/banner",
        element: <Banners />,
      },
      {
        path: "/admin/front-end/banner/add-banner",
        element: <AddBanner />,
      },
      {
        path: "/admin/front-end/themes",
        element: <Themes />,
      },

      // -------------general setting
      {
        path: "/admin/general-setting/business-info",
        element: <BusinessInfo />,
      },
      {
        path: "/admin/general-setting/other-services",
        element: <OthersServices />,
      },

      {
        path: "/admin/seo",
        element: <SEO />,
      },
    ],
  },
]);

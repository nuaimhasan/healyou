import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";

import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Products from "../pages/Products/Products";

import DashboardLayout from "../Layout/DashboardLAyout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

import About from "../pages/Dashboard/AboutUs/AboutUs";

import AddBanner from "../pages/Dashboard/Banner/AddBanner";
import Banners from "../pages/Dashboard/Banner/Banner";
import AddCategories from "../pages/Dashboard/Categories/AddCategories";
import Categories from "../pages/Dashboard/Categories/Categories";
import EditCategories from "../pages/Dashboard/Categories/EditCategories";

import ContactUs from "../pages/Dashboard/ContactUs/ContactUs";

import Logo from "../pages/Dashboard/Logo/Logo";

import AddSubCategories from "../pages/Dashboard/SubCategories/AddSubCategories";
import EditSubCategories from "../pages/Dashboard/SubCategories/EditSubCategories";
import SubCategories from "../pages/Dashboard/SubCategories/SubCategories";

import AddAdministrator from "../pages/Dashboard/Administrator/AddAdministrator";
import Administrator from "../pages/Dashboard/Administrator/Administrator";
import AddProduct from "../pages/Dashboard/Product/AddProduct";
import EditProduct from "../pages/Dashboard/Product/EditProduct";
import ProductsList from "../pages/Dashboard/Product/ProductsList";
import AddSubSubCategory from "../pages/Dashboard/SubSubCategories/AddSubSubCategory";
import EditSubSubCategory from "../pages/Dashboard/SubSubCategories/EditSubSubCategory";
import SubSubCategories from "../pages/Dashboard/SubSubCategories/SubSubCategories";

import ProductDetails from "../pages/Products/ProductDetails";
import Themes from "../pages/Dashboard/Theme/Themes";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Services from "../pages/Services/Services";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import Favicon from "../pages/Dashboard/Favicon/Favicon";
import AllServices from "../pages/Dashboard/Services/AllServices";
import AddService from "../pages/Dashboard/Services/AddService";
import EditService from "../pages/Dashboard/Services/EditService";
import OrderCheckout from "../pages/Checkout/OrderCheckout";
import RentCheckout from "../pages/Checkout/RentCheckout";
import Orders from "../pages/Dashboard/Orders/Orders";
import Rents from "../pages/Dashboard/Rents/Rents";
import SEO from "../pages/SEO/SEO";
import Counter from "../pages/Dashboard/Counter/Counter";
import BusinessInfo from "../pages/Dashboard/GeneralSetting/BusinessInfo/BusinessInfo";
import OthersServices from "../pages/Dashboard/GeneralSetting/OthersServices/OthersServices";

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

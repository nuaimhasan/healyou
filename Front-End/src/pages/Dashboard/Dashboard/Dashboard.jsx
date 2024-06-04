import { FaBoxOpen, FaUserShield, FaCartPlus } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

import { useGetServicesQuery } from "../../../Redux/service/service";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import { useGetSubCategoriesQuery } from "../../../Redux/subCategory/subCategoryApi";
import { useGetSubSubCategoriesQuery } from "../../../Redux/subSubCategory/subSubCategoryApi";
import { useGetAllProductsQuery } from "../../../Redux/product/productApi";
import { useGetAdminsQuery } from "../../../Redux/user/userApi";
import Orders from "../Orders/Orders";

export default function Dashboard() {
  const { data: services } = useGetServicesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: sub_categories } = useGetSubCategoriesQuery();
  const { data: sub_sub_categories } = useGetSubSubCategoriesQuery();
  const { data: products } = useGetAllProductsQuery();
  const { data: admins } = useGetAdminsQuery();
  return (
    <section>
      {/* card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Services</p>
            <h3 className="text-primary font-bold">{services?.data?.length}</h3>
          </div>
          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaBoxOpen className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Categories</p>
            <h3 className="text-red-600 font-bold">
              {categories?.data?.length}
            </h3>
          </div>

          <div className="bg-red-600 text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Sub Categories</p>
            <h3 className="text-green-600 font-bold">
              {sub_categories?.data?.length}
            </h3>
          </div>

          <div className="bg-green-600 text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">
              Total Sub Sub Categories
            </p>
            <h3 className="text-green-600 font-bold">
              {sub_sub_categories?.data?.length}
            </h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <MdOutlineCategory className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Products</p>
            <h3 className="text-green-600 font-bold">
              {products?.data?.length}
            </h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaCartPlus className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Admins</p>
            <h3 className="text-green-600 font-bold">{admins?.data?.length}</h3>
          </div>

          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaUserShield className="text-xl" />
          </div>
        </div>
      </div>

      <div className="mt-6 shadow-sm">
        <Orders />
      </div>
    </section>
  );
}

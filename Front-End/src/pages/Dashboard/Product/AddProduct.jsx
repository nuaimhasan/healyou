import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetCategoriesQuery,
  useGetCategoryQuery,
} from "../../../Redux/category/categoryApi";
import { useAddProductMutation } from "../../../Redux/product/productApi";
import { useGetSubCategoryQuery } from "../../../Redux/subCategory/subCategoryApi";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subSubCategoryId, setSubSubCategoryId] = useState("");

  const [rentA, setRentA] = useState(false);
  const [rentType, setRentType] = useState("monthly");
  const [rentDescription, setRentDescription] = useState("");

  const { data: categories } = useGetCategoriesQuery();
  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: subCategory } = useGetSubCategoryQuery(subCategoryId);
  const [addProduct, { isLoading }] = useAddProductMutation();

  const subCategories = category?.data?.subCategories;
  const subSubCategories = subCategory?.data?.subSubCategories;

  //------------------Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const price = e.target.price.value;
    const rent = {
      rent_type: rentType,
      rent_price: e.target?.rent_price?.value,
      rent_description: rentDescription,
    };

    if (image?.length <= 0) {
      return Swal.fire("", "Image is required", "warning");
    }

    if (description === "") {
      return Swal.fire("", "Details is required", "warning");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", categoryId);
    if (subCategoryId) formData.append("subCategory", subCategoryId);
    if (subSubCategoryId) formData.append("subSubCategory", subSubCategoryId);
    formData.append("image", image[0].file);
    if (rentA) formData.append("rent", JSON.stringify(rent));

    const res = await addProduct(formData).unwrap();

    if (res?.success === true) {
      Swal.fire("", res.message, "success");
      e.target.reset();
      setImage([]);
      setDescription("");
      navigate("/admin/products/all-products");
    } else {
      Swal.fire("", res.error, "error");
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Product</h3>
      </div>

      <form className="p-4" onSubmit={handleAddProduct}>
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" required />
            </div>

            <div>
              <p className="mb-1">Price</p>
              <input type="number" name="price" required />
            </div>

            {/* category */}
            <div>
              <p className="text-sm mb-1">Category *</p>
              <select
                name="category"
                required
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories?.data?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
            {/* sub category */}
            <div>
              <p className="text-sm mb-1">Sub Category</p>
              <select
                name="sub_category"
                onChange={(e) => setSubCategoryId(e.target.value)}
              >
                <option value="">Select Sub Category</option>
                {subCategories?.length > 0 &&
                  subCategories?.map((subCategory) => (
                    <option key={subCategory?._id} value={subCategory?._id}>
                      {subCategory?.name}
                    </option>
                  ))}
              </select>
            </div>
            {/* sub sub category */}
            <div>
              <p className="text-sm">Sub SubCategory</p>
              <select
                name="sub_subCategory"
                onChange={(e) => setSubSubCategoryId(e.target.value)}
              >
                <option value="">Select Sub SubCategory</option>
                {subSubCategories?.length > 0 &&
                  subSubCategories?.map((subSubCategory) => (
                    <option
                      key={subSubCategory?._id}
                      value={subSubCategory?._id}
                    >
                      {subSubCategory?.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <div>
                <p className="mb-1">Image</p>
                <div>
                  <ImageUploading
                    defaultValue={image}
                    onChange={(icn) => setImage(icn)}
                    dataURLKey="data_url"
                  >
                    {({ onImageUpload, onImageRemove, dragProps }) => (
                      <div
                        className="border rounded border-dashed p-4"
                        {...dragProps}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            onClick={onImageUpload}
                            className="w-max px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
                          >
                            Choose Image
                          </span>

                          <p className="text-neutral-content">or Drop here</p>
                        </div>

                        <div className={`${image?.length > 0 && "mt-4"} `}>
                          {image?.map((img, index) => (
                            <div key={index} className="image-item relative">
                              <img
                                src={img["data_url"]}
                                alt=""
                                className="w-24"
                              />
                              <div
                                onClick={() => onImageRemove(index)}
                                className="w-7 h-7 bg-primary rounded-full flex justify-center items-center text-base-100 absolute top-0 right-0 cursor-pointer"
                              >
                                <AiFillDelete />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 border rounded">
            <p className="border-b p-3">Product Description</p>

            <div className="p-4 about_details">
              <JoditEditor
                ref={editor}
                value={description}
                onBlur={(text) => setDescription(text)}
              />
            </div>
          </div>
        </div>

        {/* Rent */}
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <h2 className="font-medium">Rent Available?</h2>

            <div className="flex items-center">
              <input
                defaultChecked={!rentA && true}
                id="variant-1"
                type="radio"
                name="variant"
                className="cursor-pointer"
                onClick={() => setRentA(false)}
              />
              <label
                htmlFor="variant-1"
                className="pl-1 text-sm font-medium cursor-pointer"
              >
                No
              </label>
            </div>

            <div className="flex items-center">
              <input
                defaultChecked={rentA && true}
                id="variant-2"
                type="radio"
                name="variant"
                onClick={() => setRentA(true)}
                className="cursor-pointer"
              />
              <label
                htmlFor="variant-2"
                className="pl-1 text-sm font-medium cursor-pointer"
              >
                Yes
              </label>
            </div>
          </div>

          {rentA && (
            <div className="mt-2 border rounded p-4">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="mb-1">Rent Type</p>
                  <select onChange={(e) => setRentType(e.target.value)}>
                    <option defaultValue="daily">Daily</option>
                    <option defaultValue="monthly" selected>
                      Monthly
                    </option>
                    <option defaultValue="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <p className="mb-1">Rent Price ({rentType})</p>
                  <input type="number" name="rent_price" />
                </div>
              </div>

              <div className="mt-2 border rounded">
                <p className="border-b p-3">Rent Description</p>

                <div className="p-4 about_details">
                  <JoditEditor
                    ref={editor}
                    value={rentDescription}
                    onBlur={(text) => setRentDescription(text)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            disabled={isLoading && "disabled"}
            className="primary_light_btn"
          >
            {isLoading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;

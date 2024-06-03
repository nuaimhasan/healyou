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

  const { data: categories } = useGetCategoriesQuery();
  const { data: category } = useGetCategoryQuery(categoryId);
  const { data: subCategory } = useGetSubCategoryQuery(subCategoryId);
  const [addProduct, { isLoading }] = useAddProductMutation();

  const subCategories = category?.data?.subCategories;
  const subSubCategories = subCategory?.data?.subSubCategories;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const price = e.target.price.value;

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
            <p className="border-b p-3">Description</p>

            <div className="p-4 about_details">
              <JoditEditor
                ref={editor}
                value={description}
                onBlur={(text) => setDescription(text)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading && "disabled"} className="primary_btn">
            {isLoading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;

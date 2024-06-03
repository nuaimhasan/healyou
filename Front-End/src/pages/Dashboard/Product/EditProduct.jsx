import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../Redux/product/productApi";
import Spinner from "../../../components/Spinner/Spinner";

const EditProduct = () => {
  const editor = useRef(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: product, isLoading: getloading } = useGetProductByIdQuery(id);
  // console.log(product?.data);

  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  if (getloading) return <Spinner />;

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const price = e.target.price.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    if (description.length > 0) {
      formData.append("description", description);
    } else {
      formData.append("description", product?.data?.description);
    }
    if (image?.length > 0) {
      formData.append("image", image[0].file);
    }

    const res = await updateProduct({ id, formData }).unwrap();
    if (res?.success === true) {
      Swal.fire("", res?.message, "success");
      e.target.reset();
      setImage([]);
      setDescription("");
      navigate("/admin/products/all-products");
    } else {
      Swal.fire("", res?.error, "error");
    }
  };

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Edit Product</h3>
      </div>

      <form className="p-4" onSubmit={handleUpdateProduct}>
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                defaultValue={product?.data?.title}
                required
              />
            </div>

            <div>
              <p className="mb-1">Price</p>
              <input
                type="number"
                name="price"
                defaultValue={product?.data?.price}
                required
              />
            </div>

            {/* category */}
            <div>
              <p className="text-sm mb-1">Category *</p>
              <input
                type="text"
                name="category"
                disabled
                defaultValue={product?.data?.category?.name}
              />
            </div>
            {/* sub category */}
            <div>
              <p className="text-sm mb-1">Sub Category</p>
              <input
                type="text"
                name="sub-category"
                disabled
                defaultValue={product?.data?.subCategory?.name}
              />
            </div>
            {/* sub sub category */}
            <div>
              <p className="text-sm">Sub SubCategory</p>
              <input
                type="text"
                name="sub-sub-category"
                disabled
                defaultValue={product?.data?.subSubCategory?.name}
              />
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
                <div className="mt-4">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                      product?.data?.image
                    }`}
                    alt=""
                    className="w-32"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 border rounded">
            <p className="border-b p-3">Description</p>

            <div className="p-4 about_details">
              <JoditEditor
                ref={editor}
                value={
                  product?.data?.description
                    ? product?.data?.description
                    : description
                }
                onBlur={(text) => setDescription(text)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading && "disabled"} className="primary_btn">
            {isLoading ? "Loading..." : "Update Product"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditProduct;

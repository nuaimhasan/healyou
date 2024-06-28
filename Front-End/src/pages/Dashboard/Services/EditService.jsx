import { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import ReactImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useEditServiceMutation,
  useGetSingleServiceQuery,
} from "../../../Redux/service/service";
import Spinner from "../../../components/Spinner/Spinner";
import Swal from "sweetalert2";

export default function EditService() {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const { data, isLoading } = useGetSingleServiceQuery(id);
  const service = data?.data;

  const [editService, { isLoading: editLoading }] = useEditServiceMutation();

  const handleEditService = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const charge = e.target.charge.value;
    const short_description = e.target.short_description.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("charge", charge);
    formData.append("short_description", short_description);
    if (description.length > 0) {
      formData.append("description", description);
    } else {
      formData.append("description", service?.description);
    }
    if (images?.length > 0) {
      formData.append("image", images[0].file);
    }

    const res = await editService({ id, formData }).unwrap();
    if (res?.success) {
      Swal.fire("", res?.message, "success");
      e.target.reset();
      setImages([]);
      setDescription("");
      navigate("/admin/services");
    } else {
      Swal.fire("", res?.error, "error");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Add Service</h3>
      </div>

      <form onSubmit={handleEditService} className="p-4">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2 w-full flex flex-col gap-4">
            <div>
              <div>
                <p className="mb-1">Image</p>
                <ReactImageUploading
                  defaultValue={images}
                  onChange={(icn) => setImages(icn)}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="border rounded border-dashed p-4 md:flex items-center gap-10"
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

                      <div className={`${images?.length > 0 && "mt-4"} `}>
                        {images?.map((img, index) => (
                          <div key={index} className="image-item relative">
                            <img
                              src={img["data_url"]}
                              alt=""
                              className="w-32 h-20"
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
                </ReactImageUploading>
              </div>
              <div className="mt-4">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/services/${
                    service?.image
                  }`}
                  alt=""
                  className="w-40 h-20"
                />
              </div>
            </div>

            <div>
              <p className="mb-1">Title</p>
              <input type="text" name="title" defaultValue={service?.title} />
            </div>

            <div>
              <p className="mb-1">Service Charge</p>
              <input
                type="number"
                name="charge"
                defaultValue={service?.charge}
              />
            </div>

            <div>
              <p className="mb-1">Short Description</p>
              <textarea
                name="short_description"
                rows="5"
                defaultValue={service?.short_description}
              ></textarea>
            </div>
          </div>

          <div className="col-span-3 border rounded">
            <p className="border-b p-3">Description</p>

            <div className="p-4 about_details">
              <JoditEditor
                ref={editor}
                value={
                  service?.description ? service?.description : description
                }
                onBlur={(text) => setDescription(text)}
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2 items-center">
            <Link
              to="/admin/services"
              className="border bg-gray-600 px-6 py-2 rounded text-base-100"
            >
              Cancel
            </Link>
            <button
              disabled={editLoading && "disabled"}
              className="primary_light_btn"
            >
              {editLoading ? "Loading..." : "Edit Service"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

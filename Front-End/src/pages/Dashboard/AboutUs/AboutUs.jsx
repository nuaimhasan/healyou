import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useCreateAboutUsMutation,
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "../../../Redux/about/aboutApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function About() {
  const editor = useRef(null);

  const { data, isLoading } = useGetAboutUsQuery();
  const [updateAboutUs, { isLoading: updateLoading }] =
    useUpdateAboutUsMutation();
  const [createAboutUs, { isLoading: createLoading }] =
    useCreateAboutUsMutation();

  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (data && !isLoading) {
      const aboutUs = data?.data[0];
      setTitle(aboutUs?.title);
      setDescription(aboutUs?.description);
    }
  }, [data, isLoading]);

  if (isLoading) return <Spinner />;

  const id = data?.data[0]?._id;

  const updateAboutUsHandler = async (e) => {
    e.preventDefault();

    const img = image[0]?.file;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (img) formData.append("image", img);

    if (id) {
      try {
        const res = await updateAboutUs({ id, formData }).unwrap();
        if (res?.success) {
          setImage([]);
          Swal.fire("", "update success", "success");
        }
      } catch (error) {
        Swal.fire("", error?.data?.error, "error");
      }
    } else {
      try {
        const res = await createAboutUs(formData).unwrap();
        if (res?.success) {
          setImage([]);
          Swal.fire("", "About add success", "success");
        }
      } catch (error) {
        Swal.fire("", error?.data?.error, "error");
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">About Info</h3>
      </div>

      <form className="p-4">
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
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
                                className="w-20 h-20"
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

                  {data?.success && (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/aboutus/${
                        data?.data[0]?.image
                      }`}
                      alt=""
                      className="w-32 mt-4"
                    />
                  )}
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
                  data?.data[0]?.description?.length > 0
                    ? data?.data[0]?.description
                    : description
                }
                onBlur={(text) => setDescription(text)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={(updateLoading || createLoading) && "disabled"}
            className="primary_btn"
            onClick={updateAboutUsHandler}
          >
            {updateLoading || createLoading
              ? "Loading.."
              : id
              ? "Update"
              : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}

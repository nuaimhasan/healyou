import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import swal from "sweetalert2";
import {
  useAddContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from "../../../Redux/contact/contactApi";

const ContactUs = () => {
  const [banner, setBanner] = useState([]);
  const [images, setImages] = useState([]);

  const { data } = useGetContactsQuery();
  const contactUs = data?.data[0];
  const id = contactUs?._id;

  const [
    addContact,
    {
      isLoading: addIsLoading,
      isError: addIsError,
      error: addError,
      isSuccess: addIsSuccess,
    },
  ] = useAddContactMutation();

  const [
    updateContact,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateContactMutation();

  useEffect(() => {
    if (addIsError) {
      swal.fire(
        "",
        addError?.data?.error ? addError?.data?.error : "Something went wrong",
        "error"
      );
      return;
    }
    if (addIsSuccess && !id) {
      swal.fire("", "Contact Us Added Successfully", "success");
      setBanner([]);
      setImages([]);
      return;
    }
    if (updateIsError) {
      swal.fire(
        "",
        updateError?.data?.error
          ? updateError?.data?.error
          : "Something went wrong",
        "error"
      );
      return;
    }
    if (updateIsSuccess && id) {
      swal.fire("", "Contact Us Updated Successfully", "success");
      setBanner([]);
      setImages([]);
      return;
    }
  }, [
    addIsError,
    addIsSuccess,
    updateIsError,
    updateIsSuccess,
    addError,
    updateError,
    id,
  ]);

  const hanldeAddUpdate = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const messangerLink = e.target.messangerLink.value;
    const wpLink = e.target.wpLink.value;
    const facebookLink = e.target.facebookLink.value;
    const twitterLink = e.target.twitterLink.value;
    const linkedinLink = e.target.linkedinLink.value;

    const formData = new FormData();
    formData.append("image", images[0]?.file);
    formData.append("banner", banner[0]?.file);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("messangerLink", messangerLink);
    formData.append("wpLink", wpLink);
    formData.append("facebookLink", facebookLink);
    formData.append("twitterLink", twitterLink);
    formData.append("linkedinLink", linkedinLink);

    if (id) {
      await updateContact({ id, formData });
    } else {
      await addContact(formData);
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Contact Us</h3>
      </div>

      <form className="p-4" onSubmit={hanldeAddUpdate}>
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div>
            <p className="mb-1">Email</p>
            <input
              type="email"
              name="email"
              required
              defaultValue={contactUs?.email}
            />
          </div>
          <div>
            <p className="mb-1">Phone</p>
            <input
              type="tel"
              name="phone"
              required
              defaultValue={contactUs?.phone}
            />
          </div>

          <div>
            <p className="mb-1">Address</p>
            <textarea
              name="address"
              required
              defaultValue={contactUs?.address}
            ></textarea>
          </div>

          <div>
            <p className="mb-1">Messanger Link</p>
            <input
              type="text"
              name="messangerLink"
              defaultValue={contactUs?.messangerLink}
            />
          </div>

          <div>
            <p className="mb-1">Whatsapp Link</p>
            <input type="text" name="wpLink" defaultValue={contactUs?.wpLink} />
          </div>

          <div>
            <p className="mb-1">Facebook Link</p>
            <input
              type="text"
              name="facebookLink"
              defaultValue={contactUs?.facebookLink}
            />
          </div>
          <div>
            <p className="mb-1">Twitter Link</p>
            <input
              type="text"
              name="twitterLink"
              defaultValue={contactUs?.twitterLink}
            />
          </div>

          <div>
            <p className="mb-1">LinkedIn Link</p>
            <input
              type="text"
              name="linkedinLink"
              defaultValue={contactUs?.linkedinLink}
            />
          </div>
        </div>

        <div className="flex gap-5 md:flex-row flex-col mt-10">
          <div className="">
            <p className="mb-1">Banner</p>
            <div>
              <ImageUploading
                defaultValue={banner}
                onChange={(icn) => setBanner(icn)}
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
                        Choose Banner
                      </span>

                      <p className="text-neutral-content">or Drop here</p>
                    </div>

                    <div className={`${banner?.length > 0 && "mt-4"} `}>
                      {banner?.map((img, index) => (
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
              </ImageUploading>
            </div>
            <div>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/contactUs/${
                  contactUs?.banner
                }`}
                alt=""
                className="w-32"
              />
            </div>
          </div>

          <div className="">
            <p className="mb-1">Image</p>
            <div>
              <ImageUploading
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
              </ImageUploading>
            </div>
            <div>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/contactUs/${
                  contactUs?.image
                }`}
                alt=""
                className="w-32"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button
              disabled={addIsLoading || (updateIsLoading && "disabled")}
              className="primary_light_btn"
            >
              {addIsLoading || updateIsLoading
                ? "Loading..."
                : contactUs?._id
                ? "Update"
                : "Add"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ContactUs;

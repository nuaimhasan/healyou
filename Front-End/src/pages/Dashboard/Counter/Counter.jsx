import swal from "sweetalert2";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import {
  useAddCounterMutation,
  useGetCounterQuery,
  useUpdateCounterMutation,
} from "../../../Redux/counter/counterApi";

export default function Counter() {
  const [images, setImages] = useState([]);

  const { data } = useGetCounterQuery();
  const counter = data?.data[0];
  const id = counter?._id;

  const [addCounter, { isLoading: addIsLoading }] = useAddCounterMutation();
  const [updateCounter, { isLoading: updateIsLoading }] =
    useUpdateCounterMutation();

  const hanldeAddUpdate = async (e) => {
    e.preventDefault();

    const happyClient = e.target.happyClient.value;
    const sellEquepment = e.target.sellEquepment.value;
    const teamMember = e.target.teamMember.value;
    const award = e.target.award.value;

    const formData = new FormData();
    formData.append("bgImage", images[0]?.file);
    formData.append("happyClient", happyClient);
    formData.append("sellEquepment", sellEquepment);
    formData.append("teamMember", teamMember);
    formData.append("award", award);

    if (id) {
      const res = await updateCounter({ id, formData });
      if (res?.data?.success) {
        swal.fire("", "Counter update Success", "success");
      } else {
        swal.fire("", "something went wrong!", "error");
      }
    } else {
      const res = await addCounter(formData);
      if (res?.data?.success) {
        swal.fire("", "Counter Add Success", "success");
      } else {
        swal.fire("", "something went wrong!", "error");
      }
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Counter</h3>
      </div>

      <form className="p-4" onSubmit={hanldeAddUpdate}>
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div>
            <p className="mb-1">Happy Clients</p>
            <input
              type="text"
              name="happyClient"
              required
              defaultValue={counter?.happyClient}
            />
          </div>
          <div>
            <p className="mb-1">Sell Equepment</p>
            <input
              type="text"
              name="sellEquepment"
              required
              defaultValue={counter?.sellEquepment}
            />
          </div>

          <div>
            <p className="mb-1">Team Members</p>
            <input
              type="text"
              name="teamMember"
              required
              defaultValue={counter?.teamMember}
            />
          </div>

          <div>
            <p className="mb-1">Award</p>
            <input
              type="text"
              name="award"
              required
              defaultValue={counter?.award}
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-1">Background Image</p>
          <div className="grid sm:grid-cols-2 gap-4">
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
                src={`${import.meta.env.VITE_BACKEND_URL}/counter/${
                  counter?.bgImage
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
                : id
                ? "Update"
                : "Add"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

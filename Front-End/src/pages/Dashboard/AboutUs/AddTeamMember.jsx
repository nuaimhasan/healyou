import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCreateOurTeamMutation } from "../../../Redux/team/teamApi";

const AddTeamMember = () => {
  const navigate = useNavigate();

  const [createOurMission, { isLoading: createLoading }] =
    useCreateOurTeamMutation();

  const [image, setImage] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");

  const updateAboutUsHandler = async (e) => {
    e.preventDefault();

    const img = image[0]?.file;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);

    if (img) formData.append("image", img);

    try {
      const res = await createOurMission(formData).unwrap();
      if (res?.success) {
        setImage([]);
        setName("");
        setDesignation("");
        Swal.fire("", "Member add success", "success");
        navigate("/admin/about-us/our-team");
      }
    } catch (error) {
      Swal.fire("", error?.data?.error, "error");
    }
  };

  return (
    <section className="bg-base-100 rounded shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium text-neutral">Our Team</h3>
      </div>

      <form className="p-4">
        <div className="text-neutral-content grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-start">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Full Name</p>
              <input
                type="text"
                name="title"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1">Designation</p>
              <input
                type="text"
                name="designation"
                onChange={(e) => setDesignation(e.target.value)}
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={createLoading && "disabled"}
            className="primary_btn"
            onClick={updateAboutUsHandler}
          >
            {createLoading ? "Loading" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTeamMember;

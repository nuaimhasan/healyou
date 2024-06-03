import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteTeamMemberMutation,
  useGetOurTeamsQuery,
} from "../../../Redux/team/teamApi";
import Spinner from "../../../components/Spinner/Spinner";

const OurTeamSetting = () => {
  const { data, isLoading, isError, isSuccess } = useGetOurTeamsQuery();
  const [deleteClient] = useDeleteTeamMemberMutation();

  if (isLoading) return <Spinner />;

  const teamMembers = data?.data;

  const deleteMemberHandler = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this client?");
    if (isConfirm) {
      try {
        const res = await deleteClient(id).unwrap();
        if (res?.success) {
          Swal.fire({
            title: "",
            text: "Member Deleted Successfully",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "",
          text: "Something went wrong",
          icon: "error",
        });
      }
    }
  };

  let content = null;

  if (isError) {
    content = (
      <p className="text-red-500 mt-5">Something went wrong to get data!</p>
    );
  }

  if (!isError && isSuccess) {
    content = (
      <tbody>
        {teamMembers?.map((member) => (
          <tr key={member?._id}>
            <td>{member?.name}</td>
            <td>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/ourTeam/${
                  member?.image
                }`}
                alt={member?.image}
                className="w-28"
              />
            </td>
            <td>{member?.designation}</td>
            <td>
              <div className="flex gap-3 items-center">
                <Link to={`/admin/about-us/edit-member/${member?._id}`}>
                  <AiOutlineEdit className="text-lg hover:text-red-500" />
                </Link>
                <button onClick={() => deleteMemberHandler(member?._id)}>
                  <AiOutlineDelete className="text-lg hover:text-red-500" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-neutral">Our Teams</h1>
          <Link to="/admin/about-us/add-member" className="secondary_btn">
            Add New Member
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto mt-2">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
};

export default OurTeamSetting;

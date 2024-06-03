import { useGetOurTeamsQuery } from "../../Redux/team/teamApi";
import Spinner from "../../components/Spinner/Spinner";

export default function OurTeam() {
  window.scroll(0, 0);
  const { data, isLoading } = useGetOurTeamsQuery();
  const ourTeams = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-2xl font-semibold text-center text-neutral">
          Our Team
        </h2>

        <div className="mt-8 grid grid-cols-4 gap-6">
          {ourTeams?.map((team) => (
            <div className="shadow rounded bg-base-100" key={team._id}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/ourTeam/${
                  team?.image
                }`}
                alt=""
                className="w-full h-40 rounded-t"
              />
              <div className="px-3 pb-6 pt-2">
                <h2 className="text-neutral text-lg font-medium">
                  {team?.name}
                </h2>
                <p className="text-neutral-content">{team?.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

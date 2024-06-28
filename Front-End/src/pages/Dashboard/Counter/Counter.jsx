import swal from "sweetalert2";

import {
  useAddCounterMutation,
  useGetCounterQuery,
  useUpdateCounterMutation,
} from "../../../Redux/counter/counterApi";

export default function Counter() {
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

    const counterInfo = {
      happyClient,
      sellEquepment,
      teamMember,
      award,
    };

    if (id) {
      const res = await updateCounter({ id, counterInfo });
      if (res?.data?.success) {
        swal.fire("", "Counter update Success", "success");
      } else {
        swal.fire("", "something went wrong!", "error");
      }
    } else {
      const res = await addCounter(counterInfo);
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

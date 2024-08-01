import { useGetCounterQuery } from "../../../Redux/counter/counterApi";
import "./CounterArea.css";

export default function CounterArea() {
  const { data } = useGetCounterQuery();
  const counter = data?.data[0];
  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/counter/${
    counter?.bgImage
  }`;

  return (
    <section
      className="counter_wrap"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className="bg-[#1b5b62c2] py-16 md:py-28 text-base-100">
        <div className="container">
          <div className="md:mx-28 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl sm:text-5xl font-bold">
                {counter?.happyClient}
              </h2>
              <p className="text-sm">Happy Clients</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl sm:text-5xl font-bold">
                {counter?.sellEquepment}
              </h2>
              <p className="text-sm">Sell Equepment</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl sm:text-5xl font-bold">
                {counter?.teamMember}
              </h2>
              <p className="text-sm">Team Members</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl sm:text-5xl font-bold">
                {counter?.award}
              </h2>
              <p className="text-sm">Award</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

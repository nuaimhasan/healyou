export default function EmergencyServices() {
  return (
    <section>
      <div className="relative">
        <img
          src="https://sunshinecares.in/images/nch.jpg"
          alt=""
          className="w-full h-28 md:h-96"
        />
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col gap-4 justify-center items-center"
          style={{ backgroundColor: "#06b3d38f" }}
        >
          <h2 className=" text-3xl text-neutral font-semibold">
            WE ARE HERE FOR YOU 24/7
          </h2>
          <img src="/images/One-Call.png" alt="" className="w-40" />

          <h3 className="text-2xl text-neutral font-semibold">
            Call: 01000-000000
          </h3>
        </div>
      </div>
    </section>
  );
}

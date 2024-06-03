import ServicesCom from "../../components/HomeComponents/ServicesCom/ServicesCom";

export default function Services() {
  window.scroll(0, 0);

  return (
    <section>
      <div className="relative">
        <img
          src="https://sunshinecares.in/images/nch.jpg"
          alt=""
          className="w-full h-28 md:h-60"
        />
        <div className="container">
          <h2 className="absolute top-1/2 -translate-y-1/2 text-3xl text-neutral font-semibold">
            Healyou Services
          </h2>
        </div>
      </div>

      <ServicesCom />
    </section>
  );
}

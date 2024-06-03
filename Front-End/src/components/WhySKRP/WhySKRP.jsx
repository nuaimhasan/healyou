export default function Whybusiness() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="text-3xl text-center w-max mx-auto border-b-2 border-primary text-priamry pb-2 font-semibold text-neutral">
          Why business
        </h2>

        <div className="grid grid-cols-3 gap-6 mt-10">
          <div>
            <img
              src="/images/why-business/Broad-portfolio.png"
              alt=""
              className="w-14 h-14 rounded-full mx-auto"
            />
            <p className="text-neutral-content text-sm text-center mt-3">
              Project Execution Certainty with seamless experience with quality
              and expertise in design, construction, timeliness and costs
            </p>
          </div>

          <div>
            <img
              src="/images/why-business/One-stop-solutions.png"
              alt=""
              className="w-14 h-14 rounded-full mx-auto"
            />
            <p className="text-neutral-content text-sm text-center mt-3">
              Focused O&M by the most dedicated maintenance and operations team
              to ensure maximum generation and plant up on time
            </p>
          </div>

          <div>
            <img
              src="/images/why-business/Focused-OnM.png"
              alt=""
              className="w-14 h-14 rounded-full mx-auto"
            />
            <p className="text-neutral-content text-sm text-center mt-3">
              One stop solutions with strong capabilities across the chain; with
              precision in Designing, Engineering, Construction, O&M and
              Financing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

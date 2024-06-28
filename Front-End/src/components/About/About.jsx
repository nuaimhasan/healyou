import { Link } from "react-router-dom";
import { useGetAboutUsQuery } from "../../Redux/about/aboutApi";
import percer from "html-react-parser";
import Spinner from "../Spinner/Spinner";

export default function About() {
  const { data, isLoading } = useGetAboutUsQuery();
  const aboutUs = data?.data[0];

  if (isLoading) {
    return <Spinner />;
  }

  const percerDescription =
    aboutUs?.description && percer(aboutUs?.description);

  return (
    <section className="secondary_bg py-7 sm:py-16">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-4xl font-semibold">
              {aboutUs?.title}
            </h2>

            <div className="text-[15px] mt-3 flex flex-col gap-2">
              {percerDescription}

              <Link to="/about-us" className="primary_btn w-max mt-2">
                See More
              </Link>
            </div>
          </div>
          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/aboutus/${
                aboutUs?.image
              }`}
              alt=""
              className="w-full sm:h-80 rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

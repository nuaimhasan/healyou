import { useGetAboutUsQuery } from "../../Redux/about/aboutApi";
import percer from "html-react-parser";
import Spinner from "../../components/Spinner/Spinner";

export default function AboutUs() {
  window.scroll(0, 0);

  const { data,isLoading } = useGetAboutUsQuery();
  const aboutUs = data?.data[0];

  if (isLoading) {
    return <Spinner />;
  }

  const percerDescription = percer(aboutUs?.description);
  return (
    <section className="py-10">
      <div className="container">
        <div>
          <div className="sm:w-max border-b-2 border-primary">
            <h2 className="text-3xl font-semibold text-neutral">
              {aboutUs?.title}
            </h2>
          </div>

          <div className="mt-4 text-neutral-content text-[15px]">
            {percerDescription}
          </div>
        </div>
      </div>
    </section>
  );
}

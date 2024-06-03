import { Link } from "react-router-dom";
import { useGetCompanyProfilesQuery } from "../../Redux/companyProfile/companyProfileApi";
import Spinner from "../../components/Spinner/Spinner";
import perser from "html-react-parser";

export default function CompanyProfile() {
  window.scroll(0, 0);
  const { data, isLoading } = useGetCompanyProfilesQuery();
  const companyProfile = data?.data[0];

  if (isLoading) return <Spinner />;

  const perserDescription =
    companyProfile?.description && perser(companyProfile?.description);

  return (
    <section>
      <div>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/companyProfile/${
            companyProfile?.image
          }`}
          alt=""
          className="w-full h-36 md:h-60"
        />
      </div>
      <div className="container py-5 sm:py-10">
        <div className="grid md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-neutral mb-3">
              {companyProfile?.title}
            </h2>

            <div className="text-neutral-content text-[15px]">
              <p>{perserDescription}</p>
            </div>

            <div className="mt-6">
              <Link to="/contact-us" className="secondary_btn text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

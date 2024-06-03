import { BsTelephone } from "react-icons/bs";
import { MdOutlineLocationOn, MdOutlineMailOutline } from "react-icons/md";
import { useGetContactsQuery } from "../../Redux/contact/contactApi";
import Spinner from "../../components/Spinner/Spinner";

export default function Contact() {
  window.scroll(0, 0);
  const { data: contactData, isLoading } = useGetContactsQuery();
  const contact = contactData?.data[0];
  if (isLoading) return <Spinner />;

  return (
    <section>
      <div>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/contactus/${
            contact?.banner
          }`}
          alt=""
          className="w-full h-60"
        />
      </div>

      <div className="container py-10">
        <div className="grid lg:grid-cols-2 gap-4 items-center">
          <div className="lg:w-[80%] mx-auto">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/contactus/${
                contact?.image
              }`}
              alt=""
              className="md:w-[75%] mx-auto"
            />
          </div>
          <div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="shadow text-center rounded pb-8">
                <div className="-mt-6 w-14 h-14 mx-auto rounded-full shadow flex justify-center items-center bg-base-100">
                  <BsTelephone className="text-3xl text-secondary" />
                </div>

                <h2 className="text-xl font-semibold mt-4 text-neutral">
                  Phone
                </h2>
                <div className="mt-3 text-neutral-content">
                  <p>{contact?.phone}</p>
                </div>
              </div>

              <div className="shadow text-center rounded pb-8 mt-8 sm:mt-0">
                <div className="-mt-6 w-14 h-14 mx-auto rounded-full shadow flex justify-center items-center bg-base-100">
                  <MdOutlineLocationOn className="text-3xl text-secondary" />
                </div>

                <h2 className="text-xl font-semibold mt-4 text-neutral">
                  Address
                </h2>
                <div className="mt-3 text-neutral-content">
                  <p>{contact?.address}</p>
                </div>
              </div>

              <div className="shadow text-center rounded pb-8 mt-8">
                <div className="-mt-6 w-14 h-14 mx-auto rounded-full shadow flex justify-center items-center bg-base-100">
                  <MdOutlineMailOutline className="text-3xl text-secondary" />
                </div>

                <h2 className="text-xl font-semibold mt-4 text-neutral">
                  Email
                </h2>
                <div className="mt-3 text-neutral-content">
                  <p>{contact?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

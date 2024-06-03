import { Link } from "react-router-dom";
import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail, MdOutlineLocationOn } from "react-icons/md";
import { useGetLogosQuery } from "../../Redux/logo/logoApi";
import { useGetContactsQuery } from "../../Redux/contact/contactApi";
import { useGetServicesQuery } from "../../Redux/service/service";

export default function Footer() {
  const { data: logos } = useGetLogosQuery();
  const logo = logos?.data[0];
  const { data: contactData } = useGetContactsQuery();
  const contact = contactData?.data[0];
  const { data: services } = useGetServicesQuery();

  return (
    <footer className="bg-accent pt-10 pb-5">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 pb-14">
          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/logo/${logo?.logo}`}
              alt=""
              className="w-60"
            />
          </div>

          <div>
            <h2 className="text-gray-300 text-xl font-medium">Quick Link</h2>
            <ul className="text-gray-400 font-light mt-2 flex flex-col gap-1.5 text-[15px]">
              <li>
                <Link to="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-gray-300 text-xl font-medium">Services</h2>
            <ul className="text-gray-400 font-light mt-2 flex flex-col gap-1.5 text-[15px]">
              {services?.data?.map((service) => (
                <li key={service?._id}>
                  <Link
                    to={`/service/${service?._id}`}
                    className="hover:underline"
                  >
                    {service?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-gray-300 text-xl font-medium">Contact</h2>
            <ul className="text-gray-400 font-light pl-2 mt-2 flex flex-col gap-1.5 text-[15px]">
              <li>
                <p className="flex items-center gap-1.5">
                  <BsTelephone />
                  {contact?.phone}
                </p>
              </li>
              <li>
                <p className="flex items-center gap-1.5">
                  <MdOutlineMail />
                  {contact?.email}
                </p>
              </li>
              <li>
                <div className="flex gap-1">
                  <p className="text-lg">
                    <MdOutlineLocationOn />
                  </p>
                  <p>{contact?.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-5">
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm font-light">
              Copyright © 2020 healyou. All rights reserved. Powered by{" "}
              <Link
                to="https://emanagerit.com"
                target="_blank"
                className="underline"
              >
                eManager
              </Link>
            </p>

            <div className="flex gap-3 items-center">
              <Link
                to={contact?.facebookLink}
                target="_blank"
                className="w-7 h-7 rounded-full bg-primary/50 flex justify-center items-center text-base-100 hover:-mt-1 duration-200"
              >
                <BiLogoFacebook className="text-xl" />
              </Link>
              <Link
                to={contact?.linkedinLink}
                target="_blank"
                className="w-7 h-7 rounded-full bg-primary/50 flex justify-center items-center text-base-100 hover:-mt-1 duration-200"
              >
                <BiLogoLinkedin className="text-xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

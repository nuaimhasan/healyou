import { useGetContactsQuery } from "../../../Redux/contact/contactApi";
import "./EmergencyServices.css";

export default function EmergencyServices() {
  const { data: contactData } = useGetContactsQuery();
  const contact = contactData?.data[0];

  return (
    <section className="emergencyServices_wrap">
      <h2 className=" text-3xl font-semibold">WE ARE HERE FOR YOU 24/7</h2>
      <img src="/images/One-Call.png" alt="" className="w-40" />

      <h3 className="text-2xl font-semibold">Call: {contact?.phone}</h3>
    </section>
  );
}

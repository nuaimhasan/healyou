import { BsTelephone } from "react-icons/bs";
import { MdOutlineLocationOn, MdOutlineMailOutline } from "react-icons/md";

export default function ContactCom() {
  return (
    <div className="container pt-10">
      <div className="grid sm:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral">
            Contact Us
          </h2>
          <p className="text-sm text-neutral-content">
            Thank you for interest in our service. Please fil up the form below
            or email us.
          </p>
        </div>

        <div className="sm:col-span-2 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="h-40 shadow text-center rounded">
            <div className="-mt-6 w-14 h-14 mx-auto rounded-full shadow flex justify-center items-center bg-base-100">
              <BsTelephone className="text-2xl text-primary" />
            </div>

            <h2 className="text-xl font-semibold mt-4 text-neutral">Phone</h2>
            <div className="mt-3 text-neutral-content text-sm">
              <p>+8801906-198021</p>
            </div>
          </div>

          <div className="h-40 shadow text-center rounded">
            <div className="-mt-6 w-14 h-14 mx-auto rounded-full shadow flex justify-center items-center bg-base-100">
              <MdOutlineMailOutline className="text-2xl text-primary" />
            </div>

            <h2 className="text-xl font-semibold mt-4 text-neutral">Email</h2>
            <div className="mt-3 text-neutral-content text-sm">
              <p>emanagerit@gmail.com</p>
            </div>
          </div>

          <div className="h-40 shadow text-center rounded">
            <div className="-mt-6 w-14 h-14 mx-auto rounded-full shadow flex justify-center items-center bg-base-100">
              <MdOutlineLocationOn className="text-2xl text-primary" />
            </div>

            <h2 className="text-xl font-semibold mt-4 text-neutral">Address</h2>
            <div className="mt-3 text-neutral-content text-sm">
              <p>80, Shahjalal Complex Circular Road, Malibagh, Dhaka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

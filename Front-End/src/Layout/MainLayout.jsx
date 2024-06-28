import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TopHeader from "../components/TopHeader/TopHeader";
import Messanger from "../components/LiveContact/Messanger/Messanger";
import Whatsapp from "../components/LiveContact/Whatsapp/Whatsapp";
import Tawk from "../components/LiveContact/Tawk/Tawk";
import { Suspense } from "react";
import Spinner from "../components/Spinner/Spinner";

export default function MainLayout() {
  return (
    <>
      <TopHeader />
      <Header />
      <div className="min-h-[70vh]">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />

      {/* Live Contact Btn */}
      <Messanger />
      <Whatsapp />
      <Tawk />
    </>
  );
}

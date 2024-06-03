import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TopHeader from "../components/TopHeader/TopHeader";

export default function MainLayout() {
  return (
    <>
      <TopHeader />
      <Header />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

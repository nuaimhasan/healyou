import About from "../../components/About/About";
import Banner from "../../components/HomeComponents/Banner/Banner";
import EmergencyServices from "../../components/HomeComponents/EmergencyServices/EmergencyServices";
import ServicesCom from "../../components/HomeComponents/ServicesCom/ServicesCom";
import ProductsComp from "../../components/Product/ProductsComp";

export default function Home() {
  window.scroll(0, 0);

  return (
    <>
      <Banner />
      <About />
      <ServicesCom />
      <EmergencyServices />
      <ProductsComp />
    </>
  );
}

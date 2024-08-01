import { Suspense, lazy } from "react";

import Banner from "../../components/HomeComponents/Banner/Banner";
import Spinner from "../../components/Spinner/Spinner";
import BlogsCom from "../../components/HomeComponents/BlogsCom/BlogsCom";

const About = lazy(() => import("../../components/About/About"));
const CounterArea = lazy(() =>
  import("../../components/HomeComponents/CounterArea/CounterArea")
);
const EmergencyServices = lazy(() =>
  import("../../components/HomeComponents/EmergencyServices/EmergencyServices")
);
const ServicesCom = lazy(() =>
  import("../../components/HomeComponents/ServicesCom/ServicesCom")
);
const ProductsComp = lazy(() =>
  import("../../components/Product/ProductsComp")
);

export default function Home() {
  window.scroll(0, 0);

  return (
    <>
      <Banner />
      <Suspense fallback={<Spinner />}>
        <About />
        <CounterArea />
        <ServicesCom />
        <EmergencyServices />
        <ProductsComp />
        <BlogsCom />
      </Suspense>
    </>
  );
}

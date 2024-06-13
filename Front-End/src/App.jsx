import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./Hook/useAuthCheck";
import { useGetThemesQuery } from "./Redux/theme/themeApi";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useGetfaviconQuery } from "./Redux/favicon/faviconApi";
import Spinner from "./components/Spinner/Spinner";
import { useGetSEOQuery } from "./Redux/seo/seoapi";

export default function App() {
  const authChecked = useAuthCheck();
  const { data } = useGetThemesQuery();
  const colors = data?.data[0];

  const { data: favicon } = useGetfaviconQuery();
  const icon = favicon?.data[0]?.icon;

  const { data: seoData } = useGetSEOQuery();
  const seo = seoData?.data[0];

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", colors?.primary);
    document.documentElement.style.setProperty(
      "--secondary",
      colors?.secondary
    );
  }, [colors]);

  if (!authChecked) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>{seo?.title}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
        />
        <meta name="description" content={seo?.description} />
        <meta name="keywords" content={seo?.keywords} />
        <meta name="author" content={seo?.author} />
        <meta name="sitemap_link" content={seo?.sitemap_link} />
      </Helmet>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

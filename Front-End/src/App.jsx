import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./Hook/useAuthCheck";
import { useGetThemesQuery } from "./Redux/theme/themeApi";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useGetfaviconQuery } from "./Redux/favicon/faviconApi";

export default function App() {
  const authChecked = useAuthCheck();
  const { data } = useGetThemesQuery();
  const colors = data?.data[0];

  const { data: favicon } = useGetfaviconQuery();
  const icon = favicon?.data[0]?.icon;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      colors?.primary
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      colors?.secondary
    );
  }, [colors]);

  if (!authChecked) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.VITE_BACKEND_URL}/favicon/${icon}`}
        />
      </Helmet>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

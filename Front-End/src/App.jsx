import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes";
import useAuthCheck from "./Hook/useAuthCheck";
import { useGetThemesQuery } from "./Redux/theme/themeApi";
import { useEffect } from "react";

export default function App() {
  const authChecked = useAuthCheck();
  const { data } = useGetThemesQuery();
  const colors = data?.data[0];

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

  return <RouterProvider router={routes}></RouterProvider>;
}

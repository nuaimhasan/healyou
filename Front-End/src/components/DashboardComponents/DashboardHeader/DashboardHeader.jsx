import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../../../Redux/user/userSlice";
import { TbWorldWww } from "react-icons/tb";

export default function DashboardHeader({ setSidebar }) {
  const [dropdown, setDropdown] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".d_btn")) {
        setDropdown(false);
      }
    });
  }, []);

  const dispatch = useDispatch();

  return (
    <header className="py-3 px-6 bg-base-100 text-neutral shadow">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(true)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>

          <div title="Visit Front-End">
            <Link to="/" target="_blank">
              <TbWorldWww className="text-2xl" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <button className="d_btn flex items-center gap-2">
            <img
              src="/images/demo.jpg"
              alt=""
              className="w-8 h-8 rounded-full "
              onClick={() => setDropdown(!dropdown)}
            />
          </button>

          {dropdown && (
            <div className="absolute top-[140%] right-0 w-40 bg-base-100 rounded shadow p-2">
              <button
                onClick={() => dispatch(userLogout())}
                className="hover:bg-gray-100 text-red-500 w-full text-start px-2 py-1 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

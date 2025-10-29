import { AiOutlineHome } from "react-icons/ai";
import { BiSearch, BiSolidSearch } from "react-icons/bi";
import { BsChatSquareDots, BsChatSquareDotsFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useAuth } from "../hooks/useAuth";
import { GiExitDoor } from "react-icons/gi";

const DashboardLayout = () => {
  const { currUser, logout } = useAuth();
  console.log("currUser", currUser)
  
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const menuArray = [
    {
      name: "Home",
      notActiveIcon: <AiOutlineHome size={25} />,
      activeIcon: <HiHome size={25} />,
      link: "#"
    },
    {
      name: "Chats",
      notActiveIcon: <BsChatSquareDots size={22} />,
      activeIcon: <BsChatSquareDotsFill size={22} />,
      link: "/dashboard/chats"
    },
    {
      name: "Search",
      notActiveIcon: <BiSearch size={25} />,
      activeIcon: <BiSolidSearch size={25} />,
      link: "#"
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="">
      <div className="hidden fixed top-0 bottom-0 left-0 border-r border-slate-200 w-0 md:w-20 bg-white shadow-md md:flex flex-col items-center justify-between gap-10 p-5">
        <div>
          <Avatar name={currUser?.displayName} />

          <div className="mt-10 flex flex-col gap-5">
            {menuArray.map((menu, index) => (
              <Link
                key={index}
                to={menu.link}
                className={`hover:bg-primary/5 hover:text-primary p-2 rounded-md cursor-pointer ${pathname === menu.link ? "text-primary" : "text-slate-600"}`}
              >
                {pathname === menu.link ? menu.activeIcon : menu.notActiveIcon}
              </Link>
            ))}
          </div>
        </div>

        <button
          className={`hover:bg-primary/5 hover:text-primary p-2 rounded-md cursor-pointer`}
          onClick={handleLogout}
        >
          <GiExitDoor size={25} className="text-red-500" />
        </button>
      </div>

      <div className="pl-0 md:pl-20 w-full min-h-screen bg-slate-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
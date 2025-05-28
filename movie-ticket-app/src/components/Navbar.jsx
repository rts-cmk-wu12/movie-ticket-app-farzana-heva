import { Link, useLocation } from "react-router-dom";

import HomeIcon from "../icons/HomeIcon";
import ExploreIcon from "../icons/ExploreIcon";
import ArchiveIcon from "../icons/ArchiveIcon";
import UserIcon from "../icons/UserIcon";

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: HomeIcon, path: "/" },
    { icon: ExploreIcon, path: "/explore" },
    { icon: ArchiveIcon, path: "/savedplans" },
    { icon: UserIcon, path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1B1E25] flex justify-around items-center text-white py-3 rounded-t-xl z-10 max-w-[23rem] mx-auto">
      {navItems.map(({ icon: Icon, path }, index) => {
        const isActive = currentPath === path || currentPath.startsWith(path + "/");

        return (
          <Link
            key={index}
            to={path}
            className={`flex flex-col items-center justify-center h-10 text-sm transition-colors duration-200 ${
              isActive ? "text-[#54A8E5]" : "text-white hover:text-[#54A8E5]"
            }`}
          >
            <Icon className="w-6 h-6" />
          </Link>
        );
      })}
    </nav>
  );
}

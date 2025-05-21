import { Link, useLocation } from "react-router-dom";

// ✅ لاحظ تطابق الأحرف مع أسماء الملفات بالضبط
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
    { icon: UserIcon, path: "/Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1B1E25] border-t border-blue-500 flex justify-around items-center text-white py-3 rounded-t-2xl max-w-sm mx-auto z-50">
      {navItems.map(({ icon: Icon, path }, index) => {
        const isActive = currentPath === path;

        return (
          <Link
            key={index}
            to={path}
            className={`flex flex-col items-center transition-colors ${
              isActive ? "text-[#54A8E5]" : "text-white"
            }`}
          >
            <Icon className="w-6 h-6" />
          </Link>
        );
      })}
    </nav>
  );
}

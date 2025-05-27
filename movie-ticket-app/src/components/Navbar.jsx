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

    { icon: UserIcon, path: "/Settings" },

  ];
 
  return (
<nav

      style={{

        position: "fixed",

        bottom: 0,

        left: 0,

        right: 0,

        background: "#1B1E25",

        display: "flex",

        justifyContent: "space-around",

        alignItems: "center",

        color: "#fff",

        paddingTop: "12px",    // 12px top padding (min 7px as requested)

        paddingBottom: "12px", // 12px bottom padding (min 7px as requested)

        borderTop: "none",

        borderRadius: "1rem 1rem 0 0",

        maxWidth: "23rem",

        margin: "0 auto",

        zIndex: 10,

      }}
>

      {navItems.map(({ icon: Icon, path }, index) => {

        const isActive = currentPath === path;

        return (
<Link

            key={index}

            to={path}

            style={{

              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              justifyContent: "center",

              color: isActive ? "#54A8E5" : "#fff",

              transition: "color 0.2s",

              textDecoration: "none",

              height: "40px", // Ensures icons are vertically centered in the nav

            }}
>
<Icon className="w-6 h-6" />
</Link>

        );

      })}
</nav>

  );

}
 
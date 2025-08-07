import React from "react";
import { NavLink } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import {
  FaHouse,
  FaBookOpen,
  FaArrowRightArrowLeft,
  FaUsers,
  FaChartColumn,
  FaUserGear,
  FaTag,
} from "react-icons/fa6";
const navItems = [
  {
    to: "/dashboard",
    icon: <FaHouse className="mr-2" />,
    label: "Dashboard",
    roles: ["admin", "librarian"],
  },
  {
    to: "/books",
    icon: <FaBookOpen className="mr-2" />,
    label: "Books",
    roles: ["admin", "librarian"],
  },
  {
    to: "/borrow-return",
    icon: <FaArrowRightArrowLeft className="mr-2" />,
    label: "Borrow/Return",
    roles: ["admin", "librarian"],
  },
  {
    to: "/members",
    icon: <FaUsers className="mr-2" />,
    label: "Members",
    roles: ["admin"],
  },
  {
    to: "/staff",
    icon: <FaUserGear className="mr-2" />,
    label: "Staff",
    roles: ["admin"],
  },
  {
    to: "/reports",
    icon: <FaChartColumn className="mr-2" />,
    label: "Reports",
    roles: ["admin"],
  },
  {
    to: "/genres",
    icon: <FaTag className="mr-2" />,
    label: "Genres",
    roles: ["admin"],
  },
];

const Sidebar = () => {
  const user = useUserStore((state) => state.user);
  const role = user?.role || "librarian";
  return (
    <aside className="w-70 bg-white border-r  border-gray-200 h-full flex flex-col py-6 px-4">
      <div className="text-2xl font-bold mb-8 pl-2">Library Manager</div>
      <nav className="flex flex-col gap-2 font-semibold text-gray-700 ">
        {navItems
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700 ${
                  isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

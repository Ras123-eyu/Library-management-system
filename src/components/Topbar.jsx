import React, { useState, useRef, useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
const Topbar = () => {
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full h-18 py-3 bg-white border-b  border-gray-200 flex items-center justify-end gap-5 px-8">
      <div>
        <div className="text-gray-700 text-md font-sm ">
          Welcome, {user?.role || "User"}
        </div>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full text-md focus:outline-none"
          onClick={() => setOpen((o) => !o)}
        >
          {user?.role ? user.role[0].toUpperCase() : "A"}
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg ">
            <div className="py-3 px-3 0 float-left">
              <div className="font-semibold text-gray-800">{user?.role}</div>
              <div className="text-xs text-gray-500">{user?.role}</div>
            </div>
            <button
              className="flex items-center w-full border-t border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm gap-2"
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
            >
              {" "}
              <FaUser />
              Profile
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm gap-2 border-t  border-gray-200"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;

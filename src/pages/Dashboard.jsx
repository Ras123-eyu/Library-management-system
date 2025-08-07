import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import { Link } from "react-router-dom";
import {
  fetchBooks,
  getMembers,
  getBorrows,
  getOverdueBooks,
} from "../store/book";
import {
  FaShield,
  FaGear,
  FaArrowRightArrowLeft,
  FaPlus,
  FaChartColumn,
} from "react-icons/fa6";

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const role = user?.role || "librarian"; // default to librarian for demo
  const isAdmin = role === "admin";

  const [stats, setStats] = useState({
    books: 0,
    members: 0,
    borrows: 0,
    overdue: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setStats((s) => ({ ...s, loading: true, error: null }));
      try {
        const [books, members, borrows, overdueBooks] = await Promise.all([
          fetchBooks(),
          getMembers(),
          getBorrows(),
          getOverdueBooks(),
        ]);
        setStats({
          books: Array.isArray(books) ? books.length : 0,
          members: Array.isArray(members) ? members.length : 0,
          borrows: Array.isArray(borrows) ? borrows.length : 0,
          overdue: Array.isArray(overdueBooks) ? overdueBooks.length : 0,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStats((s) => ({
          ...s,
          loading: false,
          error: "Failed to load stats",
        }));
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      key: "books",
      label: "Total Books",
      icon: <span className="text-2xl text-gray-400 absolute top-4 right-4" />,
      valueClass: "text-black",
      desc: "All books in system",
    },
    {
      key: "members",
      label: "Total Members",
      icon: <span className="text-2xl text-gray-400 absolute top-4 right-4" />,
      valueClass: "text-black",
      desc: "",
    },
    {
      key: "borrows",
      label: "Active Borrows",
      icon: <span className="text-2xl text-gray-400 absolute top-4 right-4" />,
      valueClass: "text-black",
      desc: "",
    },
    {
      key: "overdue",
      label: "Overdue Books",
      icon: <span className="text-2xl text-red-400 absolute top-4 right-4" />,
      valueClass: "text-red-600",
      desc: "",
    },
  ];

  const adminActions = [
    {
      label: "Borrow Book",
      color: "bg-black text-white",
      icon: <FaArrowRightArrowLeft />,
      link: "/borrow-return",
    },
    {
      label: "Return Book",
      color: "bg-white border",
      icon: <FaArrowRightArrowLeft />,
      link: "/borrow-return",
    },
    {
      label: "Add Member",
      color: "bg-white border",
      icon: <FaPlus />,
      link: "/members",
    },
    {
      label: "Add Book",
      color: "bg-white border",
      icon: <FaPlus />,
      link: "/books",
    },
    {
      label: "Manage Genres",
      color: "bg-red-100 text-red-700",
      icon: <FaGear />,
      link: "/genres",
    },
    {
      label: "Admin Reports",
      color: "bg-red-100 text-red-700",
      icon: <FaChartColumn />,
    },
  ];

  const librarianActions = [
    {
      label: "Borrow Book",
      color: "bg-black text-white",
      icon: <FaArrowRightArrowLeft />,
      link: "/borrow",
    },
    {
      label: "Return Book",
      color: "bg-white border",
      icon: <FaArrowRightArrowLeft />,
      link: "/return",
    },
    {
      label: "Add Member",
      color: "bg-white border",
      icon: "+",
      link: "/members",
    },
    {
      label: "Add Book",
      color: "bg-white border",
      icon: "+",
      link: "/reports",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mt-2 mb-1">
        <h1 className="text-3xl font-bold">
          {isAdmin ? "Admin Dashboard" : "Librarian Dashboard"}
        </h1>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-2xl ${
            isAdmin ? "bg-red-500 text-white" : "bg-black text-white"
          }`}
        >
          {isAdmin ? "ADMINISTRATOR" : "LIBRARIAN"}
        </span>
      </div>
      <div className="text-gray-600 mb-4 flex justify-items-start text-md">
        {isAdmin
          ? "Full system access - Manage all library operations"
          : "Standard library operations - Books, members, and borrowing"}
      </div>

      {isAdmin ? (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 flex items-center  gap-3 mb-6 text-lg">
          <span className="text-2xl">
            <FaShield />
          </span>
          <div>
            <div className="font-bold flex  ">Administrator Access</div>
            <div className="text-md">
              You have full system privileges including delete operations, genre
              management, and staff administration.
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 flex items-center gap-3 mb-6 text-lg">
          <span className="text-2xl">&#128100;</span>
          <div>
            <div className="font-bold flex">Librarian Access</div>
            <div className="text-sm">
              You can manage books and members, handle borrowing operations, and
              view reports. Contact admin for advanced operations.
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="relative rounded-xl bg-white shadow p-5 min-h-[100px] flex flex-col justify-between"
          >
            <div>
              <span className="font-medium text-gray-800 text-md flex">
                {card.label}
              </span>
              <span
                className={`block mt-2 text-3xl font-bold ${card.valueClass} flex`}
              >
                {stats[card.key]}
              </span>
              <span className="block mt-1 text-gray-400 text-sm flex">
                {card.desc}
              </span>
            </div>
            {card.icon}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 p-6  mb-8">
        <div className="text-2xl font-semibold   mb-1 flex">Quick Actions</div>
        <div className="text-gray-500 text-md mb-4 flex">
          {isAdmin
            ? "Administrative and library operations"
            : "Common library operations"}
        </div>
        <div
          className={`grid ${
            isAdmin
              ? "grid-cols-3 md:grid-cols-4"
              : "grid-cols-2 md:grid-cols-4"
          } gap-4 `}
        >
          {(isAdmin ? adminActions : librarianActions).map((action) => (
            <Link
              to={action.link || "#"}
              key={action.label}
              className={`flex flex-col items-center justify-center  rounded-lg h-25 text-base font-sm border border-gray-300 ${action.color} transition hover:scale-105`}
            >
              <span className=" mb-1">{action.icon}</span>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

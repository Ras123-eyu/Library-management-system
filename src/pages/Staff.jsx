import React, { useEffect, useState } from "react";
import { FaShieldAlt, FaEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";

function StaffModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial || {
      username: "",
      email: "",
      role: "librarian",
      phone: "",
      password: "",
      confirmPassword: "",
      status: "active",
    }
  );
  useEffect(() => {
    setForm(
      initial || {
        username: "",
        email: "",
        role: "librarian",
        password: "",
        confirmPassword: "",
        status: "active",
      }
    );
  }, [initial, open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ,">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        <div className="p-8">
          <h2 className="flex text-xl font-semibold mb-1">
            {initial ? "Edit Staff Member" : "Add New Staff Member"}
          </h2>
          <div className="text-gray-500 flex mb-6">
            {initial
              ? "Update the staff member information below."
              : "Enter the details for the new staff member."}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(form);
            }}
            className="space-y-4"
          >
            <div>
              <label
                className=" text-md font-medium mb-2 flex"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) =>
                  setForm((f) => ({ ...f, username: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className=" text-md font-medium mb-2 flex" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter Email Address"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className=" text-md font-medium mb-2 flex" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-md font-medium mb-2 flex" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value }))
                }
                required
              >
                <option value="admin">Admin</option>
                <option value="librarian">Librarian</option>
              </select>
            </div>
            <div>
              <label
                className="text-md font-medium mb-2 flex"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter Password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label
                className="text-md font-medium mb-2 flex"
                htmlFor="confirmPass"
              >
                Confirm Password
              </label>
              <input
                id="confirmPass"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter Password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, confirmPassword: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-gray-300 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-black text-white font-medium hover:bg-neutral-900"
              >
                Create Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ open, onClose, onConfirm, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <div className="mb-4">{message}</div>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function StaffCard({ staff, onView, onEdit, onDelete }) {
  const isAdmin = staff.role === "admin";
  const isActive = staff.status === "active";
  return (
    <div className="rounded-xl bg-white shadow p-5 flex flex-col border border-gray-200 min-w-[320px]">
      <div className="flex ju gap-2 mb-2">
        <div></div>
        <span className="text-2xl justify-end">
          {isAdmin ? <FaShieldAlt /> : "👤"}
        </span>
        <span className="text-lg font-bold">{staff.username}</span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isAdmin ? "bg-red-400 text-white" : "bg-black text-white"
          }`}
        >
          {staff.role.toUpperCase()}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isActive ? "bg-black text-white" : "bg-neutral-200 text-black"
          }`}
        >
          {isActive ? "ACTIVE" : "INACTIVE"}
        </span>
      </div>
      <div className=" text-sm mb-1 flex">{staff.email}</div>
      <div className="text-gray-700 text-sm mb-1 flex">
        Phone: {staff.phone || "-"}
      </div>
      <div className="text-gray-700 text-sm mb-1 flex">
        Created: {staff.createdAt ? staff.createdAt.split("T")[0] : "-"}
      </div>
      <div className="text-gray-700 text-sm mb-4 flex">
        Role: {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
      </div>
      <div className="flex justify-end gap-2 mt-auto">
        <button
          onClick={() => onView(staff)}
          className="text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
          title="View"
        >
          <FaEye />
        </button>
        <button
          onClick={() => onEdit(staff)}
          className="text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(staff)}
          className="text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default function Staff() {
  // Pre-populated staff data for demonstration
  const [staff, setStaff] = useState([
    {
      id: 1,
      username: "admin",
      email: "admin@library.com",
      phone: "(555) 123-4567",
      createdAt: "2024-01-01T00:00:00Z",
      role: "admin",
      status: "active",
    },
    {
      id: 2,
      username: "librarian",
      email: "librarian@library.com",
      phone: "(555) 987-6543",
      createdAt: "2024-01-15T00:00:00Z",
      role: "librarian",
      status: "active",
    },
    {
      id: 3,
      username: "sarah_lib",
      email: "sarah@library.com",
      phone: "(555) 456-7890",
      createdAt: "2024-02-01T00:00:00Z",
      role: "librarian",
      status: "active",
    },
    {
      id: 4,
      username: "mike_admin",
      email: "mike@library.com",
      phone: "(555) 321-0987",
      createdAt: "2024-01-20T00:00:00Z",
      role: "admin",
      status: "inactive",
    },
  ]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [deleteStaff, setDeleteStaff] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Remove fetchStaff and useEffect for demo data

  function openAdd() {
    setEditStaff(null);
    setModalOpen(true);
  }
  function openEdit(staff) {
    setEditStaff(staff);
    setModalOpen(true);
  }
  function openDelete(staff) {
    setDeleteStaff(staff);
    setConfirmOpen(true);
  }

  async function handleSave(staffData) {
    try {
      if (editStaff) {
        setStaff((prev) =>
          prev.map((s) => (s.id === editStaff.id ? { ...s, ...staffData } : s))
        );
      } else {
        setStaff((prev) => [
          ...prev,
          {
            ...staffData,
            id: prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
      setModalOpen(false);
    } catch {
      alert("Error saving staff");
    }
  }

  async function handleDelete() {
    try {
      setStaff((prev) => prev.filter((s) => s.id !== deleteStaff.id));
      setConfirmOpen(false);
    } catch {
      alert("Error deleting staff");
    }
  }

  const filteredStaff = staff.filter(
    (s) =>
      s.username.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-1 ">
      <div className="mb-6 flex items-center gap-4">
        <div className="">
          <h1 className="flex text-3xl font-bold">Staff Management</h1>
          <div className="text-gray-600 mb-4 text-lg">
            Manage library staff and administrators (Admin Only)
          </div>
        </div>
        <button
          onClick={openAdd}
          className="bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-900 text-md ml-auto"
        >
          <span className="text-lg font-bold">+</span> Add Staff
        </button>
      </div>
      <form className="mb-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <div className="flex  w-full">
          <input
            type="text"
            placeholder="Search staff by username, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 w-full text-md h-12 bg-white"
          />
        </div>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : filteredStaff.length === 0 ? (
        <div>No staff found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStaff.map((s) => (
            <StaffCard
              key={s.id}
              staff={s}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </div>
      )}
      <StaffModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editStaff}
      />
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Delete staff "${deleteStaff?.username}"?`}
      />
    </div>
  );
}

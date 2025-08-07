import React, { useEffect, useState } from "react";

import { FaEye, FaHistory, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import {
  getMembers,
  addMembers,
  updateMembers,
  deleteMembers,
} from "../store/members";
function MemberModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      email: "",
      phone: "",
      join_date: new Date().toISOString().split("T")[0],
    },
    [initial, open]
  );

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-1 flex">
          {initial ? "Edit Member" : "Add New Member"}
        </h2>
        <div className="text-gray-500 mb-6 flex">
          {initial
            ? "Update the member information below."
            : "Enter the details for the new member."}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="space-y-4"
        >
          <div>
            <label className=" text-md font-medium mb-2 flex" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className=" text-md font-medium mb-2 flex" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter email address"
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
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
            />
          </div>
          <div className="flex gap-2 justify-end mt-6">
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
              {initial ? "Save Changes" : "Create Member"}
            </button>
          </div>
        </form>
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

export default function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [deleteMember, setDeleteMember] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    setMembers(await getMembers());
    setLoading(false);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }
  function handleSearchSubmit(e) {
    e.preventDefault();
    fetchMembers();
  }

  function openAdd() {
    setEditMember(null);
    setModalOpen(true);
  }
  function openEdit(member) {
    setEditMember(member);
    setModalOpen(true);
  }
  function openDelete(member) {
    setDeleteMember(member);
    setConfirmOpen(true);
  }
  function openHistory(member) {
    setHistoryMember(member);
  }

  async function handleSave(member) {
    try {
      const payload = {
        name: member.name,
        email: member.email,
        phone: member.phone,
        join_date: new Date().toISOString().split("T")[0],
      };
      const payloads = {
        name: member.name,
        email: member.email,
        phone: member.phone,
      };
      if (editMember) {
        await updateMembers(editMember.id, payloads);
      } else {
        await addMembers(payload);
      }
      setModalOpen(false);
      fetchMembers();
    } catch (e) {
      alert("Error saving member");
    }
  }

  async function handleDelete() {
    try {
      await deleteMembers(deleteMember.id);
      setConfirmOpen(false);
      fetchMembers();
    } catch (e) {
      alert("Error deleting member");
    }
  }

  return (
    <div className="p-1 ">
      <div className="mb-6 flex items-center gap-4">
        <div className="">
          <h1 className="text-3xl font-bold flex">Members</h1>
          <div className="text-gray-600 mb-4 text-lg">
            Manage library members{" "}
          </div>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-900 text-md ml-auto"
        >
          <span className="text-lg font-bold">+</span> Add Member
        </button>
      </div>
      <form
        onSubmit={handleSearchSubmit}
        className="mb-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center"
      >
        <div className="flex  w-full">
          <input
            type="text"
            placeholder="Search members by name, email, or phone..."
            value={search}
            onChange={handleSearch}
            className="border border-gray-200 rounded px-3 py-2 w-full text-md h-12 bg-white"
          />
        </div>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : members.length === 0 ? (
        <div>No members found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((member) => {
            const activeBorrows = member.activeBorrows ?? 0;
            return (
              <div
                key={member.id}
                className="relative rounded-xl bg-white shadow p-5 flex flex-col min-h-[240px]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-xl font-semibold leading-tight">
                      {member.name}
                    </div>
                    <div className="text-gray-500 text-md mb-1">
                      {member.email}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black text-white flex items-center gap-1">
                    {activeBorrows} <span className="ml-1">active</span>
                  </span>
                </div>
                <div className="flex text-gray-700 text-md mb-1 font-medium">
                  Phone:{" "}
                  <span className="font-normal pl-1">
                    {member.phone || "-"}
                  </span>
                </div>
                <div className="flex text-gray-700 text-md mb-1 font-medium">
                  Joined:{" "}
                  <span className="font-normal pl-1">
                    {member.join_date || "-"}
                  </span>
                </div>
                <div className="flex text-gray-700 text-md mb-1 font-medium">
                  Active Borrows:{" "}
                  <span className="font-normal pl-1">{activeBorrows}</span>
                </div>
                <div className="flex justify-end gap-2 mt-auto">
                  <button
                    onClick={() => openHistory(member)}
                    className="text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
                    title="History"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
                    title="History"
                  >
                    <FaHistory />
                  </button>
                  <button
                    onClick={() => openEdit(member)}
                    className="text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openDelete(member)}
                    className="text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
                    title="Delete"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <MemberModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editMember}
      />
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Delete member "${deleteMember?.name}"?`}
      />
    </div>
  );
}

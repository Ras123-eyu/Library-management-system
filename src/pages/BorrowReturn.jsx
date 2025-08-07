import React, { useEffect, useState } from "react";
import {
  fetchBorrows,
  markAsReturned,
  borrowBook,
  fetchBooks,
} from "../store/book";
import { getMembers } from "../store/members";
import { FaRegCalendar, FaRegUser, FaBookOpen } from "react-icons/fa6";

const STATUS_STYLES = {
  ACTIVE: "bg-black text-white",
  RETURNED: "bg-neutral-200 text-black",
  OVERDUE: "bg-red-500 text-white",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        STATUS_STYLES[status] || "bg-gray-200 text-black"
      }`}
    >
      {status}
    </span>
  );
}

export default function Borrow() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [form, setForm] = useState({
    book_id: "",
    member_id: "",
    due_date: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);

  useEffect(() => {
    getBorrows();
  }, []);

  async function getBorrows() {
    setLoading(true);
    const data = await fetchBorrows();
    setBorrows(data);
    setLoading(false);
  }

  async function handleMarkAsReturned(id) {
    await markAsReturned(id);
    getBorrows();
  }

  async function handleBorrowBook(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await borrowBook(form);
      setShowBorrowForm(false);
      setForm({ book_id: "", member_id: "", due_date: "" });
      getBorrows();
    } catch (err) {
      alert("Failed to borrow book. Please try again.");
    }
    setSubmitting(false);
  }

  async function openBorrowModal() {
    setBorrowModalOpen(true);
    setSubmitting(false);
    setForm({ book_id: "", member_id: "", due_date: "" });

    const [booksData, membersData] = await Promise.all([
      fetchBooks(),
      getMembers(),
    ]);
    setBooks(booksData || []);
    setMembers(membersData || []);
  }

  function closeBorrowModal() {
    setBorrowModalOpen(false);
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex">Borrow & Return</h1>
          <div className="text-gray-600 text-sm">
            Manage book borrowing and return operations
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded bg-black text-white font-medium hover:bg-neutral-900"
            onClick={openBorrowModal}
          >
            <span className="text-lg">&#8644;</span> Borrow Book
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded bg-white border font-medium hover:bg-neutral-100">
            <span className="text-lg">&#8634;</span> Return Book
          </button>
        </div>
      </div>
      {borrowModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
            <button
              onClick={closeBorrowModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-1 flex">Borrow Book</h2>
            <div className="text-gray-500 mb-6 flex">
              Select a book and member to create a new borrow record.
            </div>
            <form onSubmit={handleBorrowBook}>
              <div className="mb-4">
                <label className="flex font-medium mb-1">Select Book</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  value={form.book_id}
                  onChange={(e) =>
                    setForm({ ...form, book_id: e.target.value })
                  }
                  required
                >
                  <option value="">Choose a book to borrow</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="flex font-medium mb-1">Select Member</label>
                <select
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  value={form.member_id}
                  onChange={(e) =>
                    setForm({ ...form, member_id: e.target.value })
                  }
                  required
                >
                  <option value="">Choose a member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
              <hr className="my-6 text-gray-300" />
              <div className="flex gap-8 mb-6">
                <div>
                  <div className="text-gray-500 text-sm mb-1">Borrow Date</div>
                  <div className="flex items-center gap-2">
                    <FaRegCalendar />
                    {new Date().toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 text-sm mb-1">Due Date</div>
                  <div className="flex items-center gap-2">
                    <FaRegCalendar />
                    <input
                      type="date"
                      className="border border-gray-300 rounded px-2 py-1"
                      value={form.due_date}
                      onChange={(e) =>
                        setForm({ ...form, due_date: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border border-gray-300 font-medium hover:bg-gray-100"
                  onClick={closeBorrowModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-black text-white font-medium hover:bg-neutral-900"
                  disabled={submitting}
                >
                  {submitting ? "Borrowing..." : "Borrow Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : borrows.length === 0 ? (
        <div>No borrow records found.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {borrows.map((borrow) => {
            let rawStatus =
              borrow.status ||
              borrow.borrow_status ||
              (borrow.book && borrow.book.status) ||
              "UNKNOWN";
            let status = String(rawStatus).toUpperCase();
            if (["IN_PROGRESS", "BORROWED"].includes(status)) status = "ACTIVE";
            if (["DONE", "COMPLETED"].includes(status)) status = "RETURNED";
            if (["LATE", "EXPIRED"].includes(status)) status = "OVERDUE";

            const bookTitle =
              borrow.bookTitle ||
              borrow.book_title ||
              (borrow.book && borrow.book.title) ||
              "Unknown Title";
            const author =
              borrow.author ||
              borrow.book_author ||
              (borrow.book && borrow.book.author) ||
              "Unknown Author";
            const memberName =
              borrow.memberName ||
              borrow.member_name ||
              (borrow.member && borrow.member.name) ||
              "-";
            const borrowedDate =
              borrow.borrowed ||
              borrow.borrowed_date ||
              borrow.borrow_date ||
              borrow.created_at ||
              "-";
            const dueDate = borrow.due_date || borrow.due || "-";
            const returnedDate =
              borrow.returned ||
              borrow.returned_date ||
              borrow.return_date ||
              null;

            return (
              <div
                key={borrow.id}
                className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-2xl font-semibold leading-tight flex items-center gap-2">
                      <FaBookOpen />
                      {bookTitle}
                    </div>
                    <div className="text-gray-500 text-sm mb-1 flex items-center gap-1">
                      <FaRegUser />
                      {author}
                    </div>
                  </div>
                  <StatusBadge status={status} />
                </div>
                <div className="flex flex-wrap gap-8 text-sm text-gray-700 mb-2">
                  <div className="flex items-center gap-1">
                    <FaRegCalendar />
                    <span>Borrowed:</span>{" "}
                    <span className="font-medium">{borrowedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaRegCalendar />
                    <span>Due:</span>{" "}
                    <span className="font-medium">{dueDate}</span>
                  </div>
                  {returnedDate && (
                    <div className="flex items-center gap-1">
                      <FaRegCalendar />
                      <span>Returned:</span>{" "}
                      <span className="font-medium">{returnedDate}</span>
                    </div>
                  )}
                </div>
                {status === "ACTIVE" && (
                  <button
                    onClick={() => handleMarkAsReturned(borrow.id)}
                    className="px-4 py-2 rounded bg-black text-white font-medium w-max hover:bg-neutral-900"
                  >
                    Mark as Returned
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

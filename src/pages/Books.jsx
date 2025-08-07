import React, { useEffect, useState } from "react";

import { FaEye, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import {
  fetchBooks as fetchBooksApi,
  createBook,
  updateBook,
  deleteBook as deleteBookApi,
  fetchGenres,
} from "../store/book";
function BookModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(
    initial || {
      title: "",
      author: "",
      genre_id: "",
      published_year: "",
      available_copies: 1,
    }
  );
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    setForm(
      initial || {
        title: "",
        author: "",
        genre_id: "",
        published_year: new Date().getFullYear(),
        available_copies: 1,
      }
    );
  }, [initial, open]);
  useEffect(() => {
    async function loadGenres() {
      setGenres(await fetchGenres());
    }
    if (open) loadGenres();
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        <div className="p-8 ">
          <h2 className="text-xl font-bold mb-1 flex">
            {initial ? "Edit Book" : "Add New Book"}
          </h2>
          <div className="text-gray-500 mb-6 flex">
            {initial
              ? "   Update the book information below."
              : "Enter the details for the new book."}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave(form);
            }}
            className="space-y-4 "
          >
            <div>
              <label className=" text-md font-medium mb-2 flex" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-md font-medium mb-2 flex"
                htmlFor="author"
              >
                Author
              </label>
              <input
                id="author"
                className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                value={form.author}
                onChange={(e) =>
                  setForm((f) => ({ ...f, author: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-md font-medium mb-2 flex"
                htmlFor="publishedYear"
              >
                Published Year
              </label>
              <input
                id="publishedYear"
                type="number"
                className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                value={form.published_year}
                onChange={(e) =>
                  setForm((f) => ({ ...f, published_year: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-md font-medium mb-2 flex"
                htmlFor="copies"
              >
                Available Copies
              </label>
              <input
                id="copies"
                type="number"
                min="1"
                className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                value={form.available_copies}
                onChange={(e) =>
                  setForm((f) => ({ ...f, available_copies: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label
                className="block text-md font-medium mb-2 flex"
                htmlFor="genre"
              >
                Genre
              </label>
              <select
                id="genre"
                className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                value={form.genre_id}
                onChange={(e) =>
                  setForm((f) => ({ ...f, genre_id: e.target.value }))
                }
                required
              >
                <option value="">Select a genre</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className=" border border-gray-300 px-4 py-2 rounded-lg font-medium  hover:bg-gray-100 "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-3 rounded-lg bg-black text-white font-medium hover:bg-neutral-900"
              >
                {initial ? "Save Changes" : "Create Book"}
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
function BookDetailsModal({ book, onClose }) {
  if (!book) return null;
  const available = (book.available_copies ?? book.copies ?? 0) > 0;
  return (
    <div className="fixed inset-0 bg-black  flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-1 flex">{book.title}</h2>
          <div className="text-gray-400 mb-6 text-md flex">Book Details</div>
          <div className="space-y-4">
            <div className="flex gap-40">
              <span className="font-medium">Author:</span>
              <span>{book.author}</span>
            </div>
            <div className="flex gap-40">
              <span className="font-medium">Genre:</span>
              <span>
                <span className="bg-neutral-100 px-3 py-1 rounded-full text-xs font-semibold">
                  {book.genre?.name || book.genreId || "-"}
                </span>
              </span>
            </div>
            <div className="flex gap-36">
              <span className="font-medium">Published:</span>
              <span>{book.published_year || "-"}</span>
            </div>
            <div className="flex gap-34">
              <span className="font-medium">Available:</span>
              <span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    available
                      ? "bg-black text-white"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {available
                    ? `${book.available_copies ?? book.copies ?? 0} copies`
                    : "Out of Stock"}
                </span>
              </span>
            </div>
            <div className="flex gap-39">
              <span className="font-medium">Status:</span>
              <span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    available
                      ? "bg-black text-white"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {available ? "Available" : "Out of Stock"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [viewBook, setViewBook] = useState(null);
  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    setLoading(true);
    setBooks(await fetchBooksApi());
    setLoading(false);
  }

  function openAdd() {
    setEditBook(null);
    setModalOpen(true);
  }
  function openEdit(book) {
    setEditBook(book);
    setModalOpen(true);
  }
  function openDelete(book) {
    setDeleteBook(book);
    setConfirmOpen(true);
  }
  async function handleSave(book) {
    try {
      const payload = {
        title: book.title,
        author: book.author,
        published_year: Number(book.published_year),
        available_copies: Number(book.available_copies),
        genre_id: Number(book.genre_id),
      };
      if (editBook) {
        await updateBook(editBook.id, payload);
      } else {
        await createBook(payload);
      }
      setModalOpen(false);
      fetchBooks();
    } catch (e) {
      alert("Error saving book");
    }
  }

  async function handleDelete() {
    try {
      await deleteBookApi(deleteBook.id);
      setConfirmOpen(false);
      fetchBooks();
    } catch (e) {
      alert("Error deleting book");
    }
  }
  const filteredBook = books.filter((g) =>
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-1 ">
      <div className="mb-6 flex items-center gap-4">
        <div className="">
          <h1 className="text-3xl font-bold flex">Books</h1>
          <div className="text-gray-600 mb-4 text-lg">
            Manage your library's book collection
          </div>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-900 text-md ml-auto"
        >
          <span className="text-md font-bold">+</span> Add Book
        </button>
      </div>

      <form className="mb-6 w-full">
        <div className="flex  w-full  ">
          <input
            type="text"
            placeholder="Search books by title, author, or genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 w-full text-md h-12 bg-white"
          />
        </div>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : filteredBook.length === 0 ? (
        <div>No books found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
          {books.map((book) => {
            const available =
              (book.availableCopies ?? book.available_copies ?? 0) > 0;
            return (
              <div
                key={book.id}
                className={`relative rounded-xl bg-white shadow p-5 flex flex-col min-h-[240px] border ${
                  available ? "border-gray-200" : "border-red-200"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-2xl font-semibold leading-tight">
                      {book.title}
                    </div>
                    <div className="text-gray-500 text-md mb-1">
                      by {book.author}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      available
                        ? "bg-black text-white"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {available ? "Available" : "Out of Stock"}
                  </span>
                </div>
                <div className=" flex font-medium text-gray-700 text-sm mb-1 ">
                  Genre:{" "}
                  <span className="font-normal">
                    {book.genre?.name || book.genre_id || "-"}
                  </span>
                </div>
                <div className="flex font-medium text-gray-700 text-sm mb-1">
                  Published:{" "}
                  <span className="font-normal">
                    {book.published_year || "-"}
                  </span>
                </div>
                <div className="flex font-medium text-gray-700 text-sm mb-4">
                  Available Copies:{" "}
                  <span className="font-normal">
                    {book.availableCopies ?? book.available_copies ?? 0}
                  </span>
                </div>
                <div className="flex justify-end gap-2 mt-auto">
                  <button
                    onClick={() => setViewBook(book)}
                    className=" text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => openEdit(book)}
                    className=" text-gray-500 hover:bg-neutral-200  border border-gray-300  rounded p-2"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openDelete(book)}
                    className="text-gray-600 hover:bg-neutral-200 rounded border border-gray-300  p-2"
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
      <BookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editBook}
      />
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Delete book "${deleteBook?.title}"?`}
      />
      <BookDetailsModal book={viewBook} onClose={() => setViewBook(null)} />
    </div>
  );
}

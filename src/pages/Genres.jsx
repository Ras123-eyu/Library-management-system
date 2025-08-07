import { useEffect, useState } from "react";
import {
  fetchGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../store/genre";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

function GenreModal({ open, onClose, onSave, initial }) {
  const [name, setName] = useState(initial?.name || "");
  useEffect(() => {
    setName(initial?.name || "");
  }, [initial, open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        <div className="p-8">
          <h2 className="flex text-xl font-semibold mb-1">
            {initial ? "Edit Genre" : "Add New Genre"}
          </h2>
          <div className="text-gray-500 flex mb-6">
            {initial
              ? "Update the genre name below."
              : "Enter the name for the new genre."}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave({ name });
            }}
            className="space-y-4"
          >
            <div>
              <label
                className=" text-md font-medium mb-1 flex"
                htmlFor="genreName "
              >
                Genre Name
              </label>
              <input
                id="genreName"
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Genre name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded  border border-gray-300 "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-black text-white font-medium hover:bg-neutral-900"
              >
                {initial ? "Save Changes" : "Create Genre"}
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

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editGenre, setEditGenre] = useState(null);
  const [deleteGenreObj, setDeleteGenreObj] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    fetchAllGenres();
  }, []);

  async function fetchAllGenres() {
    setLoading(true);
    setGenres(await fetchGenres());
    setLoading(false);
  }

  function openAdd() {
    setEditGenre(null);
    setModalOpen(true);
  }
  function openEdit(genre) {
    setEditGenre(genre);
    setModalOpen(true);
  }
  function openDelete(genre) {
    setDeleteGenreObj(genre);
    setConfirmOpen(true);
  }

  async function handleSave(genre) {
    try {
      if (editGenre) {
        await updateGenre(editGenre.id, genre);
      } else {
        await createGenre(genre);
      }
      setModalOpen(false);
      fetchAllGenres();
    } catch (e) {
      alert("Error saving genre");
    }
  }

  async function handleDelete() {
    try {
      await deleteGenre(deleteGenreObj.id);
      setConfirmOpen(false);
      fetchAllGenres();
    } catch (e) {
      alert("Error deleting genre");
    }
  }

  const filteredGenres = genres.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-1 ">
      <div className="mb-6 flex items-center gap-4">
        <div className="">
          <h1 className=" flex text-3xl font-bold">Genres</h1>
          <div className="text-gray-600 mb-4 text-lg">
            Manage book genres (Admin Only)
          </div>
        </div>
        <button
          onClick={openAdd}
          className="bg-black text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-900 text-md ml-auto"
        >
          <span className="text-lg font-bold">+</span> Add Genre
        </button>
      </div>
      <form className="mb-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <div className="flex  w-full">
          <input
            type="text"
            placeholder="Search genres..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 w-full text-md h-12 bg-white"
          />
        </div>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : filteredGenres.length === 0 ? (
        <div>No genres found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGenres.map((genre) => (
            <div
              key={genre.id}
              className="rounded-xl bg-white shadow p-5 flex flex-col border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-lg font-bold mb-2">{genre.name}</div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => openEdit(genre)}
                    className="text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openDelete(genre)}
                    className="text-gray-500 hover:bg-neutral-200  rounded border border-gray-300 p-2"
                    title="Delete"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>

              <div className="text-gray-500 text-md mb-4 flex ">
                Genre ID: {genre.id}
              </div>
            </div>
          ))}
        </div>
      )}
      <GenreModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initial={editGenre}
      />
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message={`Delete genre "${deleteGenreObj?.name}"?`}
      />
    </div>
  );
}

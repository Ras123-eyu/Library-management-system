import api from "../services/api";
export const fetchBooks = async () => {
  try {
    const response = await api.get("/books");

    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const createBook = async (book) => {
  try {
    const response = await api.post("/books", book);
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const getBook = async (id) => {
  try {
    const response = await api.put(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};
export const updateBook = async (id, book) => {
  try {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/books/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export const getMembers = async () => {
  try {
    const response = await api.get("/members");

    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};

export const getBorrows = async () => {
  try {
    const response = await api.get("/members");

    return response.data;
  } catch (error) {
    console.error("Error fetching borrows:", error);
    throw error;
  }
};

export const getOverdueBooks = async () => {
  try {
    const response = await api.get("/borrow-records/reports/overdue");
    return response.data;
  } catch (error) {
    console.error("Error fetching overdue books:", error);
    throw error;
  }
};

export async function fetchGenres() {
  try {
    const res = await api.get("/genres");
    return res.data || [];
  } catch (error) {
    return [];
  }
}

export async function fetchBorrows() {
  try {
    const res = await api.get("/borrow-records");
    return res.data || [];
  } catch (error) {
    console.error("Error fetching borrows:", error);
    return [];
  }
}

export async function markAsReturned(id) {
  try {
    const res = await api.post(`/borrows/${id}/return`);
    return res.data;
  } catch (error) {
    console.error("Error marking as returned:", error);
    throw error;
  }
}

export async function borrowBook({ book_id, member_id, due_date }) {
  try {
    const res = await api.post("/borrow-records/borrow", {
      book_id,
      member_id,
      due_date,
    });
    return res.data;
  } catch (error) {
    console.error("Error borrowing book:", error);
    throw error;
  }
}

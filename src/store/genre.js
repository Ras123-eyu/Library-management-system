import api from "../services/api";
export const fetchGenres = async () => {
  try {
    const response = await api.get("/genres");

    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

export const createGenre = async (genres) => {
  try {
    const response = await api.post("/genres", genres);
    return response.data;
  } catch (error) {
    console.error("Error adding genres:", error);
    throw error;
  }
};

export const updateGenre = async (id, genres) => {
  try {
    const response = await api.put(`/genres/${id}`, genres);
    return response.data;
  } catch (error) {
    console.error("Error updating genres:", error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  try {
    const response = await api.delete(`/genres/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting genres:", error);
    throw error;
  }
};

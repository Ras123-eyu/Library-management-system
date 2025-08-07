import api from "../services/api";
export const fetchStaffs = async () => {
  try {
    const response = await api.get("/Staff");

    return response.data;
  } catch (error) {
    console.error("Error fetching Staff:", error);
    throw error;
  }
};

export const createStaff = async (Staff) => {
  try {
    const response = await api.post("/Staff", Staff);
    return response.data;
  } catch (error) {
    console.error("Error adding Staff:", error);
    throw error;
  }
};

export const updateStaff = async (id, Staff) => {
  try {
    const response = await api.put(`/Staff/${id}`, Staff);
    return response.data;
  } catch (error) {
    console.error("Error updating Staff:", error);
    throw error;
  }
};

export const deleteStaff = async (id) => {
  try {
    const response = await api.delete(`/Staff/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting Staff:", error);
    throw error;
  }
};

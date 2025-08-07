import api from "../services/api";
export const getMembers = async () => {
  try {
    const response = await api.get("/members");

    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};

export const addMembers = async (members) => {
  try {
    const response = await api.post("/members", members);
    return response.data;
  } catch (error) {
    console.error("Error adding members:", error);
    throw error;
  }
};

export const updateMembers = async (id, members) => {
  try {
    const response = await api.put(`/members/${id}`, members);
    return response.data;
  } catch (error) {
    console.error("Error updating members:", error);
    throw error;
  }
};

export const deleteMembers = async (id) => {
  try {
    const response = await api.delete(`/members/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting members:", error);
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

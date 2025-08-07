import { create } from "zustand";
import { loginUser, signupUser } from "../services/api";

const getInitialUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
const getInitialToken = () => localStorage.getItem("token") || null;

export const useUserStore = create((set) => ({
  user: getInitialUser(),
  token: getInitialToken(),
  login: async ({ email, password }) => {
    try {
      const result = await loginUser({ email, password });
      if (result && result.access_token && result.user) {
        set({ user: result.user, token: result.access_token });
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        return { user: result.user, token: result.access_token };
      }
      return null;
    } catch {
      return null;
    }
  },
  signup: async ({ username, email, password, role }) => {
    try {
      const response = await signupUser({
        username,
        email,
        password,
        role,
      });
      if (
        response &&
        response.data &&
        response.data.access_token &&
        response.data.user
      ) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("role", response.data.user.role);
        set({ user: response.data.user, role: response.data.user.role });
        return { token: response.data.access_token, user: response.data.user };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
}));

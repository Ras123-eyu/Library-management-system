import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import BorrowReturn from "./pages/BorrowReturn";
import Members from "./pages/Members";
import Staff from "./pages/Staff";
import Reports from "./pages/Reports";
import Genres from "./pages/Genres";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./auth/login";
import Signup from "./auth/signup";
import { useUserStore } from "./store/userStore";

function AppLayout({ children }) {
  const token = useUserStore((state) => state.token);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <div className="flex h-screen bg-gray-50">
      {!isLoginPage && token && <Sidebar />}
      <div className="flex flex-col flex-1">
        {!isLoginPage && token && <Topbar />}
        <main className="flex-1 p-6 ">{children}</main>
      </div>
    </div>
  );
}

function App() {
  const token = useUserStore((state) => state.token);
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/borrow-return" element={<BorrowReturn />} />
            <Route path="/members" element={<Members />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/genres" element={<Genres />} />
          </Route>
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;

import Logo from "../assets/react.svg";
import { useState } from "react";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userStore = useUserStore((state) => state);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await userStore.login({
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);
    if (result && result.token) {
      if (result.user.role === "admin") {
        navigate("/dashboard");
      } else if (result.user.role === "librarian") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="rounded-lg   bg-white shadow-sm shadow-gray-400 w-full max-w-md ">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="flex justify-center">
            <img src={Logo} alt="logo" className="w-20 h-20" />
          </div>
          <div className="text-3xl font-bold">
            <h1>Library Manager System</h1>
          </div>
          <div className="text-gray-500">
            <p>Sign in to your account to continue</p>
          </div>
        </div>
        <div className="p-6 pt-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-md mb-1 font-medium block text-left"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 my-2 "
                placeholder="Enter your email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-md mb-1 font-medium block text-left"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="flex h-10 w-full rounded-md border  border-gray-300 px-3 py-2 my-2  placeholder:text-muted-foreground "
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 cursor-pointer  rounded-md text-sm font-medium bg-black text-white hover:bg-primary/90 h-10 px-4 py-2 w-full hover:bg-neutral-900 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
        <div className=" pt-2  border-t border-gray-200 text-xs">
          <p className="text-center mb-2 text-gray-500">Test Credentials:</p>
          <div className="text-gray-600 px-6 pb-5">
            <div className="flex justify-between">
              <span>Admin:</span>
              <span>test123@gmail.com / 12345678</span>
            </div>
            <div className="flex justify-between">
              <span>Librarian:</span>
              <span>test2@gmail.com / 12345678</span>
            </div>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-200 text-center pb-3 ">
          <span>Don't have an account? </span>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

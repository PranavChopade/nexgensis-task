import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true)
    try {
      const data = await login(formData);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/products")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">P</span>
            </div>

            <span className="text-white text-lg font-semibold">
              Product Admin
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage your products.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full rounded-lg border border-slate-700 bg-[#0b1120] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-700 bg-[#0b1120] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>


            <p className="text-sm text-red-400">
              {error}
            </p>


            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Logging In" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
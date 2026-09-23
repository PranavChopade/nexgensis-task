import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="h-16 border-b border-slate-800 bg-[#111827]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-sm font-semibold text-white">P</span>
          </div>

          <span className="text-base font-semibold text-white">
            Product Admin
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-slate-700 px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
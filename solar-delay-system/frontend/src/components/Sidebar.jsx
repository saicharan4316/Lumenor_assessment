import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

  const { logout } = useAuth();

  const role =
    localStorage.getItem("role");

  return (
    <div className="w-64 bg-black border-r border-zinc-800 min-h-screen text-white flex flex-col p-6">

      {/* LOGO */}

      <h1 className="text-5xl font-bold mb-14">
        SolarX
      </h1>

      {/* MENU */}

      <nav className="flex flex-col gap-6">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-lg hover:text-orange-400"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="flex items-center gap-3 text-lg hover:text-orange-400"
        >
          <FolderKanban size={22} />
          Projects
        </Link>

        {/* ALERTS ONLY FOR ADMIN + MANAGER */}

        {role !== "installer" && (

          <Link
            to="/alerts"
            className="flex items-center gap-3 text-lg hover:text-orange-400"
          >
            <Bell size={22} />
            Alerts
          </Link>

        )}

      </nav>

      {/* LOGOUT */}

      <button
        onClick={logout}
        className="flex items-center gap-3 text-lg text-red-400 hover:text-red-300 mt-auto"
      >
        <LogOut size={22} />
        Logout
      </button>

    </div>
  );
};

export default Sidebar;
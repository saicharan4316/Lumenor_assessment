import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between">
      <h1 className="text-2xl font-bold text-white">
        Solar Delay System
      </h1>

      <div className="flex gap-6 text-white">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/alerts">
          Alerts
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
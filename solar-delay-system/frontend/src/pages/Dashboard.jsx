import { useEffect, useState } from "react";
import API from "../services/api";
import ProjectCard from "../components/ProjectCard";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {

  const [projects, setProjects] =
    useState([]);
const [showForm, setShowForm] =
  useState(false);

const [formData, setFormData] =
  useState({
    customer_name: '',
    location: '',
    start_date: '',
    expected_end_date: '',
    manager_id: '',
    installer_id: '',
  });
  const role =
    localStorage.getItem("role");
const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]:
      e.target.value,
  });
};

const handleCreateProject =
  async (e) => {

    e.preventDefault();

    try {

      await API.post(
        '/projects',
        formData
      );

      setShowForm(false);

      fetchProjects();

    } catch (err) {

      console.log(err);
    }
};
  const fetchProjects =
    async () => {
      try {
        const res =
  await API.get(
    "/projects"
  );

        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    fetchProjects();
  }, []);

  const totalProjects =
    projects.length;

  const highRisk =
    projects.filter(
      (p) => p.risk_score >= 70
    ).length;

  const completed =
    projects.filter(
      (p) =>
        p.status === "completed"
    ).length;

  return (
    <div className="flex bg-black min-h-screen">
  <Sidebar />
    <div className="flex-1 p-10 bg-black min-h-screen text-white">

      {/* TITLE */}

      <h1 className="text-5xl font-bold mb-10">

        {role === "admin" &&
          "Admin Dashboard"}

        {role === "manager" &&
          "FlowX Dashboard"}

        {role === "installer" &&
          "FixX Installer Panel"}

      </h1>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">
            Total Projects
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {totalProjects}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">
            High Risk
          </p>

          <h2 className="text-5xl font-bold mt-4 text-red-500">
            {highRisk}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">
            Completed
          </p>

          <h2 className="text-5xl font-bold mt-4 text-green-500">
            {completed}
          </h2>
        </div>

      </div>

      {/* CREATE PROJECT BUTTON */}

      {role !== "installer" && (
       <button
  onClick={() =>
    setShowForm(!showForm)
  }
  className="
    bg-orange-500
    hover:bg-orange-600
    px-6
    py-3
    rounded-xl
    font-semibold
    mb-10
  "
>
  Create Project
</button>
      )}
      {
  showForm && (

    <form
      onSubmit={
        handleCreateProject
      }
      className="
        bg-zinc-900
        border
        border-zinc-800
        p-6
        rounded-2xl
        mb-10
        grid
        grid-cols-2
        gap-4
      "
    >

      <input
        type="text"
        name="customer_name"
        placeholder="Customer Name"
        onChange={handleChange}
        className="bg-black p-4 rounded-xl text-white"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="bg-black p-4 rounded-xl text-white"
      />

      <input
        type="date"
        name="start_date"
        onChange={handleChange}
        className="bg-black p-4 rounded-xl text-white"
      />

      <input
        type="date"
        name="expected_end_date"
        onChange={handleChange}
        className="bg-black p-4 rounded-xl text-white"
      />

      <input
        type="number"
        name="manager_id"
        placeholder="Manager ID"
        onChange={handleChange}
        className="bg-black p-4 rounded-xl text-white"
      />

      <input
        type="number"
        name="installer_id"
        placeholder="Installer ID"
        onChange={handleChange}
        className="bg-black p-4 rounded-xl text-white"
      />

      <button
        type="submit"
        className="
          bg-green-500
          hover:bg-green-600
          px-6
          py-3
          rounded-xl
          font-semibold
          col-span-2
        "
      >
        Submit Project
      </button>

    </form>
  )
}

      {/* PROJECTS */}

      <h2 className="text-3xl font-bold mb-6">
        Active Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}

      </div>
    </div>
    </div>
  );
};

export default Dashboard;
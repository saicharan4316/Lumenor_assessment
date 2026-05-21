import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import API from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    customer_name: '',
    location: '',
    start_date: '',
    expected_end_date: '',
    manager_id: 1,
    installer_id: 1,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');

      setProjects(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        '/projects',
        formData
      );

      fetchProjects();

      setFormData({
        customer_name: '',
        location: '',
        start_date: '',
        expected_end_date: '',
        manager_id: 1,
        installer_id: 1,
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        Projects
      </h1>

      <form
        onSubmit={createProject}
        className="bg-zinc-900 p-6 rounded-2xl mb-8"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={formData.customer_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                customer_name: e.target.value,
              })
            }
            className="p-3 bg-zinc-800 rounded-lg"
          />

          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
              })
            }
            className="p-3 bg-zinc-800 rounded-lg"
          />

          <input
            type="date"
            value={formData.start_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                start_date: e.target.value,
              })
            }
            className="p-3 bg-zinc-800 rounded-lg"
          />

          <input
            type="date"
            value={formData.expected_end_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                expected_end_date: e.target.value,
              })
            }
            className="p-3 bg-zinc-800 rounded-lg"
          />
        </div>

        <button className="bg-orange-500 px-6 py-3 rounded-lg mt-6">
          Create Project
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
          >
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold">
                {project.customer_name}
              </h2>

              <p className="mt-2">
                {project.location}
              </p>

              <p className="mt-2">
                Risk:
                {' '}
                {project.risk_score}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
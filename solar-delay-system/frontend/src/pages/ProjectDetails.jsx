import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import API from '../services/api';

import Sidebar from '../components/Sidebar';

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  const [milestones, setMilestones] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProject();
    fetchMilestones();
  }, []);

  const fetchProject = async () => {
    try {
      const res =
        await API.get(`/projects/${id}`);

      setProject(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchMilestones = async () => {
    try {
      const res = await API.get(
        `/milestones/project/${id}`
      );

      setMilestones(res.data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

const updateMilestoneStatus = async (
  milestoneId,
  status
) => {

  try {

    await API.put(
      `/milestones/${milestoneId}`,
      { status }
    );

    fetchMilestones();

  } catch (err) {

    console.log(err);
  }
};
  if (loading) {
    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {project && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-white">
              {project.customer_name}
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mt-6 text-zinc-300">
              <p>
                Location:
                {' '}
                {project.location}
              </p>

              <p>
                Status:
                {' '}
                {project.status}
              </p>

              <p>
                Risk Score:
                {' '}
                {project.risk_score}%
              </p>

              <p>
                Installer ID:
                {' '}
                {project.installer_id}
              </p>
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-white mb-6">
          Milestones
        </h2>

        <div className="space-y-4">
          {milestones.map(
            (milestone) => (
              <div
                key={milestone.id}
                className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {
                        milestone.title
                      }
                    </h3>

                    <p className="text-zinc-400 mt-2">
                      Status:
                      {' '}
                      {
                        milestone.status
                      }
                    </p>

                    <p className="text-zinc-400">
                      Deadline:
                      {' '}
                      {
                        milestone.deadline
                      }
                    </p>
                  </div>
<div className="flex gap-3">

  <button
    onClick={() =>
      updateMilestoneStatus(
        milestone.id,
        "in-progress"
      )
    }
    className="
      bg-yellow-500
      hover:bg-yellow-600
      text-white
      px-5
      py-3
      rounded-xl
      font-semibold
      transition-all
      duration-200
      shadow-lg
    "
  >
    Start
  </button>

  <button
    onClick={() =>
      updateMilestoneStatus(
        milestone.id,
        "completed"
      )
    }
    className="
      bg-green-500
      hover:bg-green-600
      text-white
      px-5
      py-3
      rounded-xl
      font-semibold
      transition-all
      duration-200
      shadow-lg
    "
  >
    Complete
  </button>

</div>

                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
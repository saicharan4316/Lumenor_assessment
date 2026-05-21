import { Link } from 'react-router-dom';

const ProjectCard = ({
  project,
}) => {
  const getRiskColor = () => {
    if (project.risk_score >= 70)
      return 'bg-red-500';

    if (project.risk_score >= 40)
      return 'bg-yellow-500';

    return 'bg-green-500';
  };

  return (
    <Link
      to={`/projects/${project.id}`}
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500 transition-all">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {project.customer_name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {project.location}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm text-white ${getRiskColor()}`}
          >
            {project.risk_score}%
          </span>
        </div>

        <div className="mt-6">
          <div className="w-full bg-zinc-700 h-3 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full"
              style={{
                width: `${project.risk_score}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <span className="text-zinc-400">
            Status:
            {' '}
            {project.status}
          </span>

          <span className="text-zinc-400">
            Installer:
            {' '}
            {project.installer_id}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
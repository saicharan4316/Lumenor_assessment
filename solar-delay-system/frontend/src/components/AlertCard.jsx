const AlertCard = ({
  alert,
}) => {
  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'HIGH':
        return 'border-red-500 bg-red-500/10';

      case 'MEDIUM':
        return 'border-yellow-500 bg-yellow-500/10';

      default:
        return 'border-green-500 bg-green-500/10';
    }
  };

  return (
    <div
      className={`border rounded-2xl p-6 ${getSeverityColor()}`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          {alert.severity}
        </h2>

        <span className="text-zinc-400 text-sm">
          Project #
          {alert.project_id}
        </span>
      </div>

      <p className="text-zinc-300 mt-4">
        {alert.message}
      </p>
    </div>
  );
};

export default AlertCard;
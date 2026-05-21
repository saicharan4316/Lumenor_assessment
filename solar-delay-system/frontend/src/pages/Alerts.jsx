import { useEffect, useState } from 'react';

import API from '../services/api';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await API.get('/alerts');

      setAlerts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        Alerts
      </h1>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-red-500/20 border border-red-500 p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold">
              {alert.severity}
            </h2>

            <p className="mt-2">
              {alert.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
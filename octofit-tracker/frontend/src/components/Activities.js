import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespace = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespace
      ? `https://${codespace}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        setLoading(false);
        console.log('Activities data:', data);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching activities:', err);
      });
  }, []);

  if (loading) return <div>Loading activities...</div>;

  // Get all unique keys for table headers
  const allKeys = Array.from(
    activities.reduce((keys, item) => {
      Object.keys(item).forEach(k => keys.add(k));
      return keys;
    }, new Set())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6 text-primary">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              {allKeys.map(key => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                {allKeys.map(key => (
                  <td key={key}>{String(activity[key] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;

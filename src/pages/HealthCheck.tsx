
import { useEffect } from 'react';

export default function HealthCheck() {
  useEffect(() => {
    // Set JSON content type
    document.title = 'Health Check';
  }, []);

  const healthData = {
    status: 'ok',
    env: import.meta.env.MODE || 'production',
    appUrl: import.meta.env.VITE_APP_URL || window.location.origin,
    timestamp: new Date().toISOString()
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '20px' }}>
      <pre>{JSON.stringify(healthData, null, 2)}</pre>
    </div>
  );
}

// src/components/AlertList.js
import React, { useEffect, useState } from 'react';

function AlertList({ alerts }) {
  const [notificationPermission, setNotificationPermission] = useState(null);
  const [notifiedAlertIds, setNotifiedAlertIds] = useState(new Set());

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  const sendNotification = (alert) => {
    if (
      notificationPermission === 'granted' &&
      !notifiedAlertIds.has(alert.id)
    ) {
      new Notification('Disaster Alert', {
        body: `Alert: ${alert.type} in ${alert.location.name || alert.location} (Severity: ${alert.severity})`,
      });
      setNotifiedAlertIds((prev) => new Set(prev).add(alert.id));
    }
  };

  // Send notification for new alerts
  useEffect(() => {
    alerts.forEach((alert) => sendNotification(alert));
  }, [alerts, notificationPermission]); // include permission as dependency

  if (!alerts.length) return <p>No disaster alerts to show.</p>;

  return (
    <section>
      <h2>Alert List</h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id}>
            <strong>{alert.type.toUpperCase()}</strong> in{' '}
            {alert.location.name || alert.location} — Severity: {alert.severity}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AlertList;

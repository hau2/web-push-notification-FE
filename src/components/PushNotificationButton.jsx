import React from 'react';
import { registerServiceWorker } from '../services/swRegistration';
import { subscribeUserToPush, sendTestNotification } from '../services/pushService';

const PushNotificationButton = () => {
  const handleSubscribe = async () => {
    const registration = await registerServiceWorker();
    if (registration) {
      await subscribeUserToPush(registration);
    }
  };

  const handleSendNotification = () => {
    const payload = {
      title: 'Hello from Push!',
      body: 'This is a sample notification.',
      url: 'https://your-site123.com'
    };

    sendTestNotification(payload);
  };

  return (
    <div>
      <button onClick={handleSubscribe}>Subscribe to Notifications</button>
      <button onClick={handleSendNotification}>Send Test Notification</button>
    </div>
  );
};

export default PushNotificationButton;

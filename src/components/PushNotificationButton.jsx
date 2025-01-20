import React, { useState } from 'react';
import { registerServiceWorker } from '../services/swRegistration';
import { subscribeUserToPush, sendTestNotification, unSubcribe } from '../services/pushService';

const PushNotificationButton = () => {
  const askPermission = async () => {
    const currentPermission = Notification.permission;
    console.log(`Current notification permission: ${currentPermission}`);

    if (currentPermission === 'granted') {
      console.log('Notifications already granted.');
      await handleSubscribe();
    } else if (currentPermission === 'denied') {
      alert('Notifications are blocked for this site. Please enable them in your browser settings.');
      console.warn('Notifications are blocked. User needs to enable them in site settings.');
    } else if (currentPermission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          await handleSubscribe();
        } else {
          console.log('Notification permission not granted:', permission);
        }
      } catch (err) {
        console.error('Error requesting notification permission:', err);
      }
    }
  };

  const handleSubscribe = async () => {
    const registration = await registerServiceWorker();
    if (registration) {
      await subscribeUserToPush(registration);
    }
  };

  const handleSendNotification = () => {
    const payload = {
      title: 'Hello from ESMS Dev Team!',
      body: 'This is a sample notification.',
      url: 'https://your-site123.com',
    };

    sendTestNotification(payload);
  };

  const handleUnSubcribe = async () => {
    const subscription = await navigator.serviceWorker.ready.then((reg) =>
      reg.pushManager.getSubscription()
    );

    if (subscription) {
      const endpoint = subscription.endpoint;
      console.log('Enpoint: ', endpoint);

      await unSubcribe({ endpoint });
    }
  };

  return (
    <div>
      <button onClick={askPermission}>Enable Notifications</button>
      <button onClick={handleSendNotification}>Send Test Notification</button>
      <button onClick={handleUnSubcribe}>Unsubcribe</button>
    </div>
  );
};

export default PushNotificationButton;

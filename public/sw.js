/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
self.addEventListener('push', (event) => {
  try {
    const data = event.data.json(); // Parse the payload
    const { title, body, url, image } = data;

    const options = {
      body: body || 'No content provided.', // Default value if content is missing
      icon: image || '/favicon.png',
      data: { url }, // URL to open when the notification is clicked
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (error) {
    console.error('Error parsing push event data:', error);
  }
});


self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const { url } = event.notification.data;

  if (url) {
    event.waitUntil(clients.openWindow(url));
  }
});

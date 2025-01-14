/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
self.addEventListener('push', (event) => {
    const data = event.data.json();
    const { title, content, url, image } = data;
  
    const options = {
      body: content,
      icon: image || '/favicon.png',
      data: { url },
      // actions: [
      //   { action: 'open', title: 'View' },
      // ],
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const { url } = event.notification.data;
  
    if (url) {
      event.waitUntil(clients.openWindow(url));
    }
  });
  
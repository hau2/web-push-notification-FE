/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/favicon.ico', // Biểu tượng thông báo
    });
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://yourwebsite.com') // Đường dẫn bạn muốn mở khi click
    );
});

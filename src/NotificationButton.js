import React from 'react';

const NotificationButton = () => {
    const publicVapidKey = 'BO5-bgJqcpF87kkwGV34NLuezchy4bQOIf3-T2eT5Hh9V4rSNyWczVB6SrD84ZwoEwi971m1ZtecIAjlmrZOg1U'; // Thay bằng Public Key từ Backend.

    // Chuyển đổi base64 VAPID Key sang Uint8Array
    const base64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    };

    // Yêu cầu quyền thông báo
    const askPermission = async () => {
        const currentPermission = Notification.permission;
        console.log(`Current notification permission: ${currentPermission}`);

        if (currentPermission === 'granted') {
            console.log('Notifications already granted.');
            await subscribeUser();
        } else if (currentPermission === 'denied') {
            alert('Notifications are blocked for this site. Please enable them in your browser settings.');
            console.warn('Notifications are blocked. User needs to enable them in site settings.');
        } else if (currentPermission === 'default') {
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                    await subscribeUser();
                } else {
                    console.log('Notification permission not granted:', permission);
                }
            } catch (err) {
                console.error('Error requesting notification permission:', err);
            }
        }
    };


    // Đăng ký subscription
    const subscribeUser = async () => {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: base64ToUint8Array(publicVapidKey),
            });

            console.log('Subscription:', subscription);

            // Gửi subscription đến backend
            await fetch('http://localhost:5129/api/notification/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription),
            });

            console.log('Subscription sent to server.');
        } else {
            console.error('Service Worker not supported in this browser.');
        }
    };

    return (
        <button onClick={askPermission}>Enable Notifications</button>
    );
};

export default NotificationButton;

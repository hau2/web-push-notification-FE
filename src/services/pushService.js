export const subscribeUserToPush = async (registration) => {
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
    });

    console.log('Push Subscription:', subscription);

    // Gửi thông tin subscription lên backend để lưu
    await fetch('https://www.testapi.leconghau.id.vn/api/notification/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });
  } catch (error) {
    console.error('Push Subscription failed:', error);
  }
};

export const sendTestNotification = async (payload) => {
  try {
    await fetch('https://www.testapi.leconghau.id.vn/api/notification/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
};

export const unSubcribe = async (payload) => {
  try {
    await fetch('https://www.testapi.leconghau.id.vn/api/notification/remove-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
};

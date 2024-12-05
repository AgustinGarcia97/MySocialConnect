import messaging from '@react-native-firebase/messaging';

async function getFCMToken() {
    // Pide permiso para recibir notificaciones (iOS)
    await messaging().requestPermission();

    // Obtiene el token de FCM
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);
    return fcmToken;
}

export default getFCMToken;

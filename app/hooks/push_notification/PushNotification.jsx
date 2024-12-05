import {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export const usePushNotifications = () => {
    const [notification, setNotification] = useState(null);
    const [token, setToken] = useState(null);




    const getPushNotificationToken = async () => {
        const currentToken = await messaging().getToken();
        setToken(currentToken);  // Guardar el token
        console.log('Token de notificación push de Firebase:', currentToken);

    };


    const handleNotificationInForeground = (remoteMessage) => {
        console.log('Notificación recibida en primer plano:', remoteMessage);
        setNotification(remoteMessage.notification);
    };


    useEffect(() => {




        return messaging().onMessage(handleNotificationInForeground);
    }, []);

    return {
        notification,
        token,
        getPushNotificationToken,
    };
};

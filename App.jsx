import 'react-native-gesture-handler';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Alert, StatusBar} from "react-native";
import {PaperProvider, Snackbar} from "react-native-paper";
import {Navigation} from "./app/navigation/Navigation";
import {Provider, useDispatch, useSelector} from "react-redux";
import {persistor, store} from "./app/redux/store";
import {NavigationContainer} from "@react-navigation/native";
import {PersistGate} from "redux-persist/integration/react";
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from "react";
import { API_BASE_URL } from '@env';
import {fetch_notifications} from "./app/api/fetch_user_data";
import {Notification} from "./app/components/notification_component/Notification";
import {SearchbarModal} from "./app/components/navbar/searchbar/SearchbarModal";
import PushNotification from 'react-native-push-notification';

function App() {
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [id,setId] = useState(null);

    const linking = {
        prefixes: ['myapp://'],
        config: {
            screens: {
                Register: 'register',
                Login: 'login',
                Feed: 'feed',
            },
        },
    };



    useEffect(() => {
        if(id) {
            PushNotification.configure({
                onNotification: function (notification) {
                    console.log('Notificación:', notification);
                },
                onRegister: function (token) {
                    console.log('Token de registro:', token);
                },
                requestPermissions: false,
            });


            PushNotification.createChannel(
                {
                    channelId: 'default-channel',
                    channelName: 'Default Channel',
                    channelDescription: 'Canal para notificaciones generales',
                    soundName: 'default',
                    importance: 4,
                },
                (created) => {
                    if (created) {
                        console.log('Canal creado correctamente');
                    } else {
                        console.log('El canal ya existe');
                    }
                }
            );

            const requestUserPermission = async () => {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (enabled) {
                    console.log('Permiso concedido');

                }
            };


            requestUserPermission();








            const unsubscribeToken = messaging().onTokenRefresh(async (newToken) => {
                console.log('Nuevo token detectado:', newToken);

                await fetch(`${process.env.API_BASE_URL}/api/update-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firebaseToken: newToken }),
                });
            });


            const onForegroundNotification = messaging().onMessage(async remoteMessage => {
                console.log('Notificación recibida en primer plano:', remoteMessage);
                const title = 'Notificación Recibida';
                const origin = remoteMessage.data.origin;
                if(origin === id){
                    return
                }
                const message = remoteMessage.data.message || 'Tienes una nueva notificación';
                setSnackbarMessage(`${title}: ${message}`);


                setVisible(true);

            });


            const unsubscribeOpened = messaging().onNotificationOpenedApp(remoteMessage => {
                console.log('Notificación abierta desde segundo plano:', remoteMessage);
                const title = 'Notificación Recibida';
                const origin = remoteMessage.data.origin;
                const message = remoteMessage.data.message || 'Tienes una nueva notificación';

                Alert.alert('Notificación Abierta', remoteMessage.notification.body);

                PushNotification.localNotification({
                    channelId: 'default-channel',
                    title: title,
                    message: message,
                    priority: 'high',
                });



                setSnackbarMessage(`${title}: ${message}`);




            });


            messaging()
                .getInitialNotification()
                .then(remoteMessage => {
                    if (remoteMessage) {
                        console.log('Notificación inicial:', remoteMessage);
                        Alert.alert('Notificación Inicial', remoteMessage.notification.body);
                    }
                });


            return () => {
                unsubscribeToken();
                onForegroundNotification();
                unsubscribeOpened();
            };
        }






    }, [id]);

    const onDismissSnackBar = () => setVisible(false);




    return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
             <PaperProvider>
                 <GestureHandlerRootView style={{ flex: 1 }}>
                     <StatusBar barStyle="light-content" />
                     <NavigationContainer linking={linking}>
                         <Navigation setId={setId} id={id}></Navigation>
                         <Snackbar
                             visible={visible}
                             onDismiss={onDismissSnackBar}
                             duration={5000}
                         >
                             {snackbarMessage}
                         </Snackbar>
                         <Notification/>
                         <SearchbarModal/>
                     </NavigationContainer>
                 </GestureHandlerRootView>
             </PaperProvider>
          </PersistGate>
      </Provider>

  );
}


export default App;

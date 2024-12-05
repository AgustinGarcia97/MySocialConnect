import {StyleSheet, Text, View} from "react-native";
import {FlatList} from "react-native-gesture-handler";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeNotificationModal, openNotificationModal} from "../../redux/slices/modalSlice";
import {fetch_notifications} from "../../api/fetch_user_data";

export const Notification = () => {


    const userId = useSelector(state => state.user?.userId);
    const dispatch  = useDispatch();
    const notificationsR = useSelector(state => state.user.notifications);
    const [notifications,setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(notificationsR);
        console.log("notif user:",JSON.stringify(notificationsR));
    },[notificationsR]);


    const renderNotification = ({ item }) => (
        <View style={styles.notificationItem}>

            <Text style={styles.notificationText}>{item.message}</Text>
        </View>
    );
    const bottomSheetModalRef = useRef(null);



    const isNotificationOpen = useSelector((state) => state.modal.openNotificationModal);


    const snapPoints = useMemo(() => ["25%", "70%"], []);


    const handleSheetChanges = useCallback((index) => {
        console.log("Estado del BottomSheet cambió a:", index);
    }, []);


    useEffect(() => {
        if (bottomSheetModalRef.current) {
            if (isNotificationOpen) {
                bottomSheetModalRef.current.present();
                dispatch(closeNotificationModal());
            } else {
                bottomSheetModalRef.current.dismiss();
                dispatch(closeNotificationModal());
            }
        }
    }, [isNotificationOpen]);


    const toggleModal = () => {
        dispatch(openNotificationModal());
    };


    return(
        <BottomSheetModalProvider>
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enableDismissOnClose={true}
            enablePanDownToClose={true}
        >
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notificaciones</Text>
            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
            />
        </View>
        </BottomSheetModal>

    </BottomSheetModalProvider>


        )

}

const styles = StyleSheet.create({
    notificationButton: {
        backgroundColor: '#fff',
        width: 'auto',
        padding: 9,
        borderRadius: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width:'100%',

    },
    modalContent: {
        width: '100%',

        borderRadius: 10,

        alignItems: 'center',

        marginTop:10,


    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    notificationItem: {
        paddingTop: 15,
        paddingBottom:15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',


    },
    notificationText: {
        fontSize: 16,
        textAlign:'center'
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#dc3545',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

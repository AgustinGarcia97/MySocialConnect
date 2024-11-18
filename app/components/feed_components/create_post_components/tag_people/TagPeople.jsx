import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeTagPeopleModal} from "../../../../redux/slices/modalSlice";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {TextInput} from "react-native-paper";
import {FlatList} from "react-native-gesture-handler";
import debounce from "debounce";
import {searchUsers} from "../../../../api/fetch_post";
import {addTag} from "../../../../redux/slices/postSlice";
import {Avatar} from "react-native-paper";

export const TagPeople = () => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => [ '70%','100%'], []);
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const open = useSelector((state) => state.modal.openTagPeopleModal);

    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            dispatch(closeTagPeopleModal());
        }
    }, [dispatch]);

    useEffect(() => {
        if (open) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [open]);

    const debouncedSearch = useCallback(
        debounce(async (query) => {
            try {
                if (query) {
                    const results = await searchUsers({ username: query });
                    setUsers(results);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                console.error("Error en la búsqueda:", error);
            }
        }, 300),
        []
    );

    const handleChange = async (text) => {
        setUsername(text);
        await debouncedSearch(text);
    };

    const handleSearch = (userId, user) => {
        if (!selectedUsers.some(u => u.userId === userId)) {
            setSelectedUsers(prev => [...prev, user]);
        } else {
            setSelectedUsers(prev => prev.filter(u => u.userId !== userId));
        }
        dispatch(addTag(userId));
    };

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{backgroundColor:'#475A7E'}}
                style={{flex:1}}
            >
                <View style={{backgroundColor:'#D9D7CE', width:'100%', height:'100%'}}>
                    <View style={{height:50, width:'100%', justifyContent:'center', alignItems:'flex-end'}}>
                        <Text style={{fontSize:18, fontWeight:'bold', marginRight:20}}>ETIQUETAR</Text>
                    </View>
                    <View style={{backgroundColor: '#D9D7CE', width: '100%', height: '100%'}}>
                        <View style={{height:80, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0.3)', marginBottom:20}}>
                            <Text style={{fontSize:20, fontWeight:'bold'}}>BUSCAR USUARIOS</Text>
                        </View>
                        <View style={{ flex:2,}}>
                            <TextInput
                                style={styles.input}
                                placeholder="Buscar usuario"
                                value={username}
                                onChangeText={handleChange}
                            />
                            <FlatList
                                data={users}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <UserItem item={item} handleSearch={handleSearch} />
                                )}
                            />
                        </View>
                        <View style={styles.selectedUsersContainer}>

                            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Usuarios seleccionados:</Text>

                            <FlatList
                                data={selectedUsers}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                renderItem={({ item }) => (
                                    <View style={{...styles.userItem, ...styles.pressedBorder,height:70, marginHorizontal:10,width:200}}>
                                        <Text style={{fontSize: 16,textAlign:'center'}}>{item.name + " " + item.lastname}</Text>
                                        <Text style={{textAlign:'center'}}>@{item.username}</Text>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const UserItem = ({ item, handleSearch }) => {
    const [isPressed, setIsPressed] = useState(false);

    const togglePress = () => {
        setIsPressed(!isPressed);
        handleSearch(item.userId, item);
    };

    return (
        <TouchableOpacity
            onPress={togglePress}
            style={[styles.userItem]}
        >
            <View style={{flexDirection:'row', alignItems:'center', gap:20}}>
                <Avatar.Image
                    size={40}
                    source={{uri: item.profilePic ? item.profilePic.photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} />
                <View>
                    <Text style={{fontSize:16}}>{item.name + " " + item.lastname}</Text>
                    <Text>@{item.username}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        marginBottom: 16,
        backgroundColor:'#fff'
    },
    userItem: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",

    },
    pressedBorder: {
        borderWidth: 2,
        borderColor: 'rgba(37,0,123,0.28)',
        borderRadius: 50,
    },
    selectedUsersContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f5f5f5',
        flex:1,
    },
});

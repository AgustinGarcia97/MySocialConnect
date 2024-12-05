import React, { useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {View, Text,StyleSheet, ImageBackground, Button, TouchableOpacity} from "react-native";

import 'react-native-get-random-values';

import {closeSearchBarModal} from "../../../redux/slices/modalSlice";
import {Avatar, TextInput} from "react-native-paper";
import debounce from "debounce";
import {searchUsers} from "../../../api/fetch_post";
import {FlatList} from "react-native-gesture-handler";
import {useNavigation} from "@react-navigation/native";
import {setSearched} from "../../../redux/slices/searchedSlice";




export const SearchbarModal = () => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['60%', '95%'], []);
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

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
        }, 100),
        []);


    const handleChange = async (text) => {
        setUsername(text);
        await debouncedSearch(text);
    };




    const open = useSelector((state) => state.modal.openSearchBarModal);




    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            dispatch(closeSearchBarModal());
        }
    }, [dispatch]);

    useEffect(() => {
        if (open) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [open]);


    const handleSearch = (navigate,user) => {
        dispatch(setSearched(user));
        setUsername("");
        dispatch(closeSearchBarModal());
        navigate("SearchedProfile", {user})
    }


    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{ backgroundColor: '#475A7E' }}
                style={{ flex: 1 }}
            >
                {/*#D9D7CE*/}
                <View style={{ backgroundColor: '#D9D7CE', width: '100%', height: '100%' }}>
                    <View style={{
                        height:80,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'rgba(255,255,255,0.3)',
                        marginBottom:20,
                    }}>
                        <Text style={{fontSize:20, fontWeight:'bold',}}>BUSCAR USUARIOS</Text>
                    </View>
                    <View>

                        <TextInput
                            style={styles.input}
                            placeholder="Buscar usuario"
                            value={username}
                            onChangeText={handleChange}
                        />

                        <FlatList
                            data={users}
                            keyExtractor={(item,index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={()=>{handleSearch(navigation.navigate,item)}}>
                                    <View style={{   borderBottomWidth: 1,
                                        borderBottomColor: "#eee", flexDirection:'row', padding: 5, gap:10}}>
                                        <View style={{width:'auto', justifyContent:'center',alignItems:'center'}}>
                                            <Avatar.Image
                                                size={55}
                                                source={{ uri:item.profilePicture?.photoUrl? item?.profilePicture.photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                                                style={{justifyContent:'center',backgroundColor:'transparent'}} />
                                        </View>
                                        <View style={{width:'60%',justifyContent:'center',gap:5}}>
                                            <Text style={{...styles.userItem,fontWeight:'bold',fontSize:15}}>{item.name+" "+item.lastname}</Text>
                                            <Text style={styles.userItem}>{"@"+item.nickname}</Text>
                                        </View>

                                    </View>

                                </TouchableOpacity>

                            )}
                        />

                    </View>



                    </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        marginBottom: 16,
        backgroundColor: '#fff',

    },
    userItem: {


    },
});


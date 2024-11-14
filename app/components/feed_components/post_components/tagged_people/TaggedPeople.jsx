import {  Text, View } from "react-native";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BlurView } from "@react-native-community/blur";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTaggedPeopleModal } from "../../../../redux/slices/modalSlice";
import {FlatList} from 'react-native-gesture-handler';
import {Avatar} from "react-native-paper";
export const TaggedPeople = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.openTaggedPeopleModal);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ["30%", "60%"], []);
    const users = [1, 2, 3, 4, 5, 6,7,8,9,10];

    const [tagged,setTagged] = useState([]);
    const post = useSelector((state) => state.posts.actualPost);
    const tags = post?.tagged || [];


    useEffect(() => {
        setTagged(tags);
        console.log("Updated tagged post:", post);
    }, [post]);

    useEffect(() => {
        if (bottomSheetModalRef.current) {
            if (open) {
                bottomSheetModalRef.current.present();
            } else {
                bottomSheetModalRef.current.dismiss();
            }
        }
    }, [open]);

    const handleSheetChanges = useCallback(
        (index) => {
            if (index === -1) {
                dispatch(closeTaggedPeopleModal());
                setTagged([])
            }
        },
        [dispatch]
    );


    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{ backgroundColor: "transparent" }}
            >
                <BlurView
                    blurType="light"
                    blurAmount={10}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                />

                <View style={{ flex: 1,  }}>
                    <View
                        style={{
                            height: 80,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "bold",backgroundColor:'rgba(0,0,0,0.05)',width:'100%',textAlign:'center',padding:20}}>
                            Etiquetados en este post
                        </Text>
                    </View>

                    <FlatList
                        data={tagged}
                        renderItem={({ item }) => <Tagged item={item} />}
                        keyExtractor={(item) => item.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const Tagged = ({ item }) => {

    return (
        <View
            style={{
                height: 70,
                marginHorizontal: 40,
                marginVertical: 5,
                backgroundColor: "rgba(255,255,255,0.11)",
                flexDirection:'row',
                alignItems:"center",
                borderRadius:50,

            }}
        >
            <Avatar.Image
                size={45}
                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                style={{marginLeft:20}}
            />


            <View>
                <Text style={{fontSize:18, color:'rgba(0,0,0,0.7)', marginLeft:20,
                    fontWeight: "bold",}}> {item.user.name+" "+item.user.lastname}
                </Text>
                <Text style={{fontSize:14, color:'rgba(0,0,0,0.7)', marginLeft:20,
                    fontWeight: "400",}}> {item.user.username}
                </Text>
            </View>

        </View>
    );
};

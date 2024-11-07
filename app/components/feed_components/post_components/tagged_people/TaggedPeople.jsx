import {  Text, View } from "react-native";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BlurView } from "@react-native-community/blur";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTaggedPeopleModal } from "../../../../redux/slices/modalSlice";
import {FlatList} from 'react-native-gesture-handler';
export const TaggedPeople = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.openTaggedPeopleModal);
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ["30%", "60%"], []);
    const users = [1, 2, 3, 4, 5, 6,7,8,9,10];

    const handleSheetChanges = useCallback(
        (index) => {
            if (index === -1) {
                dispatch(closeTaggedPeopleModal());
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if (open) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [open]);

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
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Etiquetados en este post
                        </Text>
                    </View>

                    <FlatList
                        data={users}
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
                height: 40,
                justifyContent: "center",
                alignItems: "start",
                marginHorizontal: 40,
                marginVertical: 5,
                backgroundColor: "rgba(255,255,255,0.11)",

            }}
        >
            <Text style={{fontSize:20, color:'rgba(0,0,0,0.5)', marginLeft:20,
                fontWeight: "bold",}}>User {item}</Text>
        </View>
    );
};

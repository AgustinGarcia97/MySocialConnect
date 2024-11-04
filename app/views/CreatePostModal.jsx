import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {CommentsModalChildren} from "../components/feed_components/post_components/comments_modal/CommentsModalChildren";
import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {closeCommentModal, closePostModal} from "../redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import SelectPhoto from "../components/feed_components/create_post_components/components/SelectPhoto";
import {UserData} from "../components/feed_components/create_post_components/components/UserData";
import {TextComponent} from "../components/feed_components/create_post_components/components/TextComponent";
import {Options} from "../components/feed_components/create_post_components/components/Options";
export const  CreatePostModal =  props => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => [ '75%','100%'], []);
    const dispatch = useDispatch();

    const open = useSelector((state) => state.modal.openPostModal);
    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            dispatch(closePostModal());
        }
    }, [dispatch]);

    useEffect(() => {
        if (open) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [open]);



    return(
        <BottomSheetModalProvider >
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{backgroundColor:'#475A7E'}}
            >
                <View style={{backgroundColor:'#D9D7CE',width:'100%'}}>
                    <UserData/>
                    <TextComponent/>
                    <SelectPhoto></SelectPhoto>
                    <Options></Options>
                    <View
                        style={{
                            height:60,
                            alignItems:"center",
                            marginVertical:19,
                            width:'100%',

                        }}
                    >
                        <TouchableOpacity style={{
                            width:'90%',
                            backgroundColor:'#475a7e',
                            height:50,
                            justifyContent:'center',
                            alignItems: 'center'
                        }}>
                            <View style={{}}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>PUBLICAR</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>




            </BottomSheetModal>
        </BottomSheetModalProvider>

    )
}

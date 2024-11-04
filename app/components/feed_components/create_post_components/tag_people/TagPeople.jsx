import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closePostModal, closeTagPeopleModal} from "../../../../redux/slices/modalSlice";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {Text, TouchableOpacity, View} from "react-native";
import {UserData} from "../components/UserData";
import {TextComponent} from "../components/TextComponent";
import SelectPhoto from "../components/SelectPhoto";
import {Options} from "../components/Options";
import {SearchPeople} from "./components/SearchPeople";
import {PeopleList} from "./components/PeopleList";

export const TagPeople = () => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => [ '50%','100%'], []);
    const dispatch = useDispatch();

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


    return(
        <BottomSheetModalProvider >
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{backgroundColor:'#475A7E'}}
                style={{flex:1}}
            >
                <View style={{backgroundColor:'#D9D7CE',width:'100%', height:'100%'}}>

                    <View style={{
                        height:50,

                        width:'100%',
                        justifyContent:'center',
                        alignItems:'flex-end',
                    }}>
                        <Text style={{
                            fontSize:18,
                            fontWeight:'bold',
                            marginRight:20,
                        }}>ETIQUETAR</Text>
                    </View>


                    <View style={{
                        height:50,
                        backgroundColor:'rgba(255,255,255,0.5)',
                        width:'100%',
                        justifyContent:'center',
                        alignItems:'center',
                        marginVertical:10,
                    }}>
                        <Text style={{
                            fontSize:23,
                            fontWeight:'bold',
                        }}>Buscar personas</Text>
                    </View>
                    <SearchPeople/>
                    <PeopleList />
                </View>




            </BottomSheetModal>
        </BottomSheetModalProvider>

    )
}
